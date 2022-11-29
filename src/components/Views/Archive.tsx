import React from "react";
import { trpc } from "../../utils/trpc";
import { ArchiveIcon } from "../Icons";
import { ListNote } from "../Note";

export default function ArchiveView() {
  const allArchivedNotes = trpc.note.allArchived.useQuery(undefined, {
    staleTime: 3000,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  React.useEffect(() => {
    allArchivedNotes.refetch();
  }, []);
  return (
    <>
      {allArchivedNotes.data?.length ? (
        <ul className="mt-6 columns-1 gap-4 pb-16 sm:columns-[240px]">
          {allArchivedNotes.data?.map((note) => (
            <ListNote key={note.id} note={note} />
          ))}
        </ul>
      ) : null}
      {!allArchivedNotes.data?.length && !allArchivedNotes.isLoading ? (
        <div className="absolute top-1/3 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center">
          <ArchiveIcon
            size={130}
            className="fill-black/30 dark:fill-white/30"
          />
          <p className="mt-5 text-center text-2xl text-black/30 dark:text-white/30">
            Archived notes appear here
          </p>
        </div>
      ) : null}
    </>
  );
}
