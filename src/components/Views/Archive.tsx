import { BiArchiveIn } from "react-icons/bi";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { trpc } from "../../utils/trpc";
import { ListNote } from "../Note";

export default function ArchiveView() {
  const allArchivedNotes = trpc.note.allArchived.useQuery(undefined, {
    staleTime: 3000,
    refetchOnWindowFocus: false,
  });
  return (
    <LayoutGroup>
      {allArchivedNotes.data?.length ? (
        <motion.ul
          layout
          transition={{ bounce: 0 }}
          className="mt-6 columns-1 gap-4 pb-16 sm:columns-[240px]"
        >
          <AnimatePresence>
            {allArchivedNotes.data?.map((note) => (
              <ListNote key={note.id} note={note} />
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : null}
      {!allArchivedNotes.data?.length && !allArchivedNotes.isLoading ? (
        <div className="absolute top-1/3 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center">
          <BiArchiveIn
            size={130}
            className="fill-black/30 dark:fill-white/30"
          />
          <p className="mt-5 text-center text-2xl text-black/30 dark:text-white/30">
            Archived notes appear here
          </p>
        </div>
      ) : null}
    </LayoutGroup>
  );
}
