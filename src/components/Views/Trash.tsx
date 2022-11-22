import { trpc } from "../../utils/trpc";
import ListNote from "../Note/ListNote";
import { FiTrash2 } from "react-icons/fi";

export default function TrashView() {
  const allTrashedNotes = trpc.note.allTrashed.useQuery(undefined, {
    staleTime: 3000,
  });
  return (
    <>
      {allTrashedNotes.data?.length ? (
        <ul className="mb-16 flex w-full gap-2 sm:gap-4">
          {allTrashedNotes.data?.map((note) => (
            <ListNote key={note.id} note={note} />
          ))}
        </ul>
      ) : (
        <div className="absolute top-1/3 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center">
          <FiTrash2 size={130} className="stroke-black/30" />
          <p className="mt-5 text-center text-2xl text-black/30">
            No notes in trash
          </p>
        </div>
      )}
    </>
  );
}
