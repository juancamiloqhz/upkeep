import { type UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { env } from "../env/server.mjs";

cloudinary.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.API_KEY,
  api_secret: env.API_SECRET,
});

export function uploadImage(imagePath: string): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      imagePath,
      { width: 400, height: 300, crop: "fill", folder: "upkeep" },
      (err, res) => {
        if (err) reject(err);
        if (res) resolve(res);
      }
    );
  });
}

export function deleteImages(publicIds: string[]): Promise<any> {
  return new Promise((resolve, reject) => {
    cloudinary.api.delete_resources(publicIds, (err, res) => {
      if (err) reject(err);
      if (res) resolve(res);
    });
  });
}
