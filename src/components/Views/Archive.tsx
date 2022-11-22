import { BiArchiveIn } from "react-icons/bi";
import { trpc } from "../../utils/trpc";
import ListNote from "../Note/ListNote";

export default function ArchiveView() {
  const allArchivedNotes = trpc.note.allArchived.useQuery(undefined, {
    staleTime: 3000,
  });
  return (
    <>
      {allArchivedNotes.data?.length ? (
        <ul className="mb-16 flex w-full gap-2 sm:gap-4">
          {allArchivedNotes.data?.map((note) => (
            <ListNote key={note.id} note={note} />
          ))}
        </ul>
      ) : (
        <div className="absolute top-1/3 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center">
          <BiArchiveIn size={130} className="fill-black/30" />
          <p className="mt-5 text-center text-2xl text-black/30">
            Archived notes appear here
          </p>
        </div>
      )}
    </>
  );
}
