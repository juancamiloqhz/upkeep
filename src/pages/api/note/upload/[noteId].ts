import { type NextApiRequest, type NextApiResponse } from "next";
import { type Fields, IncomingForm, type Files, type File } from "formidable";
import * as z from "zod";
import { getServerAuthSession } from "../../../../server/common/get-server-auth-session";
import { uploadImage } from "../../../../utils/cloudinary";
import { prisma } from "../../../../server/db/client";
import { type Image } from "@prisma/client";

export async function getImage(
  formData: NextApiRequest
): Promise<{ files: Files; fields: Fields }> {
  return new Promise(function (resolve, reject) {
    const form = new IncomingForm({ keepExtensions: true });
    form.parse(formData, function (err, fields, files) {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; image?: Image }>
) => {
  if (req.method === "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }
  if (req.method === "POST") {
    const session = await getServerAuthSession({ req, res });
    if (!session) {
      res
        .status(401)
        .json({ message: "You must be signed in to upload an image." });
    }
    const { noteId } = req.query;
    const validateId = z.string().cuid().safeParse(noteId);
    if (!validateId.success) {
      res.status(400).json({ message: "Invalid note id" });
    }
    // Check if note exists and belongs to user
    try {
      const note = await prisma.note.findFirst({
        where: { id: String(noteId), author: { id: session?.user?.id } },
        select: { id: true },
      });
      if (!note) {
        res.status(404).json({ message: "Note not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
    try {
      const { fields, files } = await getImage(req);
      // console.log({ files });
      const image = files.image as File;
      const imageUploaded = await uploadImage(image.filepath);
      // console.log({ imageUploaded });

      const noteWithImage = await prisma.image.create({
        data: {
          public_id: imageUploaded.public_id,
          url: imageUploaded.secure_url,
          format: imageUploaded.format,
          version: imageUploaded.version.toString(),
          order: 0,
          note: { connect: { id: String(noteId) } },
        },
      });
      res.status(200).json({ message: "Image uploaded", image: noteWithImage });
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  }
};

export default handle;
