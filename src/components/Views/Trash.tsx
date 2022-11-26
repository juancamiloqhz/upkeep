import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";
import * as Dialog from "@radix-ui/react-dialog";
import { trpc } from "../../utils/trpc";
import { ListNote } from "../Note";

export default function TrashView() {
  const utils = trpc.useContext();
  const allTrashedNotes = trpc.note.allTrashed.useQuery(undefined, {
    staleTime: 3000,
    refetchOnWindowFocus: false,
  });
  const emptyTrash = trpc.note.deleteMany.useMutation({
    async onMutate() {
      await utils.note.allTrashed.cancel();
      utils.note.allTrashed.setData(undefined, () => []);
    },
  });
  return (
    <LayoutGroup>
      {allTrashedNotes.data?.length ? (
        <>
          <p className="mt-6 text-center italic">
            Notes in Trash are deleted after 7 days.{" "}
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className="ml-2 h-9 rounded-md px-6 text-sm font-semibold not-italic text-blue-500 hover:bg-black/10 dark:text-blue-400 dark:hover:bg-white/10">
                  Empty Trash
                </button>
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-[9999] bg-black/80" />
                <Dialog.Content className="fixed top-1/2 left-1/2 z-[9999] flex max-h-[85vh] min-h-[120px] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 transform flex-col justify-between rounded-md border-black/20 bg-gray-50 p-6 pb-4 shadow-md focus:outline-none dark:border-white/30 dark:bg-gray-900">
                  <Dialog.Title className="text-sm ">
                    Empty trash? All notes in Trash will be permanently deleted.
                  </Dialog.Title>
                  <div className="flex justify-end gap-2">
                    <Dialog.Close asChild>
                      <button
                        className="h-9 rounded-md px-6 text-sm font-medium hover:bg-black/10 focus:bg-black/10 focus:outline-none dark:hover:bg-white/10 dark:focus:bg-white/10"
                        type="button"
                      >
                        Cancel
                      </button>
                    </Dialog.Close>
                    <Dialog.Close asChild>
                      <button
                        className="h-9 rounded-md px-6 text-sm font-medium text-blue-500 hover:bg-black/10 focus:bg-black/10 focus:outline-none dark:text-blue-400 dark:hover:bg-white/10 dark:focus:bg-white/10"
                        onClick={() =>
                          emptyTrash.mutate({
                            ids: allTrashedNotes.data.map((note) => note.id),
                          })
                        }
                        type="button"
                      >
                        Delete
                      </button>
                    </Dialog.Close>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </p>
          <motion.ul
            layout
            transition={{ bounce: 0 }}
            className="mt-6 columns-1 gap-4 pb-16 sm:columns-[240px]"
          >
            <AnimatePresence>
              {allTrashedNotes.data?.map((note) => (
                <ListNote key={note.id} note={note} />
              ))}
            </AnimatePresence>
          </motion.ul>
        </>
      ) : null}
      {!allTrashedNotes.data?.length && !allTrashedNotes.isLoading ? (
        <div className="absolute top-1/3 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center">
          <FiTrash2
            size={130}
            className="stroke-black/30 dark:stroke-white/30"
          />
          <p className="mt-5 text-center text-2xl text-black/30">
            No notes in trash
          </p>
        </div>
      ) : null}
    </LayoutGroup>
  );
}
