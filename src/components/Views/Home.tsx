import React from "react";
// import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { trpc } from "../../utils/trpc";
import { ListNote } from "../Note";
// import { AnimatedNote } from "../Note/AnimatedNote";

export default function HomeView() {
  const allActiveNotes = trpc.note.allActive.useQuery(undefined, {
    staleTime: 3000,
    refetchOnWindowFocus: false,
    enabled: false,
    // onSuccess: (data) => {
    //   console.log("allActiveNotes", data);
    // },
  });
  const allPinnedNotes = trpc.note.allPinned.useQuery(undefined, {
    staleTime: 3000,
    refetchOnWindowFocus: false,
    enabled: false,
    // onSuccess: (data) => {
    //   console.log("pinned notes", data);
    // },
  });
  React.useEffect(() => {
    allActiveNotes.refetch();
    allPinnedNotes.refetch();
  }, []);
  return (
    <>
      {allPinnedNotes.data?.length ? (
        <>
          <h1 className="mb-2 px-3 text-xs font-light uppercase">Pinned</h1>
          <ul className="mb-16 columns-1 gap-4 sm:columns-[240px]">
            {allPinnedNotes.data?.map((note) => (
              <ListNote key={note.id} note={note} />
            ))}
          </ul>
        </>
      ) : null}
      {allActiveNotes.data?.length ? (
        <>
          <h1 className="mb-2 px-3 text-xs font-light uppercase">Other</h1>
          <ul className="columns-1 gap-4 pb-16 sm:columns-[240px]">
            {allActiveNotes.data?.map((note) => (
              // <AnimatedNote
              //   key={note.id}
              //   isSelected={router.query.noteId === note.id}
              //   note={note}
              // />
              <ListNote key={note.id} note={note} />
            ))}
          </ul>
        </>
      ) : null}
    </>
    // <LayoutGroup>
    //   {allPinnedNotes.data?.length ? (
    //     <>
    //       <h1 className="mb-2 px-3 text-xs font-light uppercase">Pinned</h1>
    //       <motion.ul
    //         layout
    //         transition={{ bounce: 0 }}
    //         className="mb-16 columns-1 gap-4 sm:columns-[240px]"
    //       >
    //         <AnimatePresence>
    //           {allPinnedNotes.data?.map((note) => (
    //             <ListNote key={note.id} note={note} />
    //           ))}
    //         </AnimatePresence>
    //       </motion.ul>
    //     </>
    //   ) : null}
    //   {allActiveNotes.data?.length ? (
    //     <>
    //       <h1 className="mb-2 px-3 text-xs font-light uppercase">Other</h1>
    //       <motion.ul
    //         layout
    //         transition={{ bounce: 0 }}
    //         className="columns-1 gap-4 pb-16 sm:columns-[240px]"
    //       >
    //         <AnimatePresence>
    //           {allActiveNotes.data?.map((note) => (
    //             <ListNote key={note.id} note={note} />
    //           ))}
    //         </AnimatePresence>
    //       </motion.ul>
    //     </>
    //   ) : null}
    // </LayoutGroup>
  );
}
