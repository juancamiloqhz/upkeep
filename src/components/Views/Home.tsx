import { trpc } from "../../utils/trpc";
import ListNote from "../Note/ListNote";

export default function HomeView() {
  const allActiveNotes = trpc.note.allActive.useQuery(undefined, {
    staleTime: 3000,
  });
  const allPinnedNotes = trpc.note.allPinned.useQuery(undefined, {
    staleTime: 3000,
  });
  return (
    <>
      {allPinnedNotes.data?.length ? (
        <>
          <h1 className="mb-2 px-3 text-xs font-light uppercase">Pinned</h1>
          <ul className="mb-16 flex flex-wrap gap-2 sm:gap-4">
            {allPinnedNotes.data?.map((note) => (
              <ListNote key={note.id} note={note} />
            ))}
          </ul>
        </>
      ) : null}
      {allActiveNotes.data?.length ? (
        <>
          <h1 className="mb-2 px-3 text-xs font-light uppercase">Other</h1>
          <ul className="mb-16 flex flex-wrap gap-2 sm:gap-4">
            {allActiveNotes.data?.map((note) => (
              <ListNote key={note.id} note={note} />
            ))}
          </ul>
        </>
      ) : null}
    </>
  );
}
