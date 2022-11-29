import * as Dialog from "@radix-ui/react-dialog";
import { CloseIcon } from "../Icons";
import Tooltip from "../Radix/Tooltip";

export default function KeyboardShortcutsModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="h-full w-full px-4 py-2 text-sm hover:bg-black/10 focus:bg-black/10 dark:hover:bg-white/10"
        >
          Keyboard shortcuts
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[9999] bg-black/80" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-[9999] flex h-[85vh] max-h-[600px] w-[100vw] max-w-[550px] -translate-x-1/2 -translate-y-1/2 transform flex-col justify-between rounded-md border-black/20 bg-gray-50 pb-6 shadow-md focus:outline-none dark:border-white/30 dark:bg-gray-900">
          <Dialog.Title className="border-b p-4 text-xl font-medium">
            Keyboard shortcuts
          </Dialog.Title>
          <Dialog.Description className="overflow-y-auto p-4">
            <form action="" onSubmit={(e) => e.preventDefault()}>
              {/* Navigation */}
              <h3 className="mb-2 mt-3 text-sm font-semibold">Navigation</h3>
              <div className="flex items-center justify-between gap-2 border-b border-black/30 py-[6px] dark:border-white/30">
                <p className="text-sm text-black/60 dark:text-white/60">
                  Navigate to next/previous note
                </p>
                <div className="flex w-40 items-center">
                  <kbd className="rounded bg-gray-200 px-2 py-1 text-sm font-bold dark:bg-black">
                    j / k
                  </kbd>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-black/30 py-[6px] dark:border-white/30">
                <p className="text-sm text-black/60 dark:text-white/60">
                  Move note to next/previous position
                </p>
                <div className="flex w-40 items-center">
                  <kbd className="rounded bg-gray-200 px-2 py-1 text-sm font-bold dark:bg-black">
                    Shift + j / k
                  </kbd>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-black/30 py-[6px] dark:border-white/30">
                <p className="text-sm text-black/60 dark:text-white/60">
                  Navigate to next/previous list item
                </p>
                <div className="flex w-40 items-center">
                  <kbd className="rounded bg-gray-200 px-2 py-1 text-sm font-bold dark:bg-black">
                    n / p
                  </kbd>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-black/30 py-[6px] dark:border-white/30">
                <p className="text-sm text-black/60 dark:text-white/60">
                  Move list item to next/previous position
                </p>
                <div className="flex w-40 items-center">
                  <kbd className="rounded bg-gray-200 px-2 py-1 text-sm font-bold dark:bg-black">
                    Shift + n / p
                  </kbd>
                </div>
              </div>
              {/* Application  */}
              <h3 className="mb-2 mt-8 text-sm font-semibold">Application</h3>
              <div className="flex items-center justify-between gap-2 border-b border-black/30 py-[6px] dark:border-white/30">
                <p className="text-sm text-black/60 dark:text-white/60">
                  Compose a new note
                </p>
                <div className="flex w-40 items-center">
                  <kbd className="rounded bg-gray-200 px-2 py-1 text-sm font-bold dark:bg-black">
                    c
                  </kbd>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-black/30 py-[6px] dark:border-white/30">
                <p className="text-sm text-black/60 dark:text-white/60">
                  Compose a new list
                </p>
                <div className="flex w-40 items-center">
                  <kbd className="rounded bg-gray-200 px-2 py-1 text-sm font-bold dark:bg-black">
                    l
                  </kbd>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-black/30 py-[6px] dark:border-white/30">
                <p className="text-sm text-black/60 dark:text-white/60">
                  Search notes
                </p>
                <div className="flex w-40 items-center">
                  <kbd className="rounded bg-gray-200 px-2 py-1 text-sm font-bold dark:bg-black">
                    /
                  </kbd>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-black/30 py-[6px] dark:border-white/30">
                <p className="text-sm text-black/60 dark:text-white/60">
                  Select all notes
                </p>
                <div className="flex w-40 items-center">
                  <kbd className="rounded bg-gray-200 px-2 py-1 text-sm font-bold dark:bg-black">
                    Ctrl + a
                  </kbd>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-black/30 py-[6px] dark:border-white/30">
                <p className="text-sm text-black/60 dark:text-white/60">
                  Open keyboard shortcut help
                </p>
                <div className="flex w-40 items-center">
                  <kbd className="rounded bg-gray-200 px-2 py-1 text-sm font-bold dark:bg-black">
                    ?, Ctrl + /
                  </kbd>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-black/30 py-[6px] dark:border-white/30">
                <p className="text-sm text-black/60 dark:text-white/60">
                  Send feedback
                </p>
                <div className="flex w-40 items-center">
                  <kbd className="rounded bg-gray-200 px-2 py-1 text-sm font-bold dark:bg-black">
                    @
                  </kbd>
                </div>
              </div>
              {/* Actions */}
              <h3 className="mb-2 mt-8 text-sm font-semibold">Actions</h3>
              <div className="flex items-center justify-between gap-2 border-b border-black/30 py-[6px] dark:border-white/30">
                <p className="text-sm text-black/60 dark:text-white/60">
                  Archive note
                </p>
                <div className="flex w-40 items-center">
                  <kbd className="rounded bg-gray-200 px-2 py-1 text-sm font-bold dark:bg-black">
                    e
                  </kbd>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-black/30 py-[6px] dark:border-white/30">
                <p className="text-sm text-black/60 dark:text-white/60">
                  Trash note
                </p>
                <div className="flex w-40 items-center">
                  <kbd className="rounded bg-gray-200 px-2 py-1 text-sm font-bold dark:bg-black">
                    #
                  </kbd>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-black/30 py-[6px] dark:border-white/30">
                <p className="text-sm text-black/60 dark:text-white/60">
                  Pin or unpin notes
                </p>
                <div className="flex w-40 items-center">
                  <kbd className="rounded bg-gray-200 px-2 py-1 text-sm font-bold dark:bg-black">
                    f
                  </kbd>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-black/30 py-[6px] dark:border-white/30">
                <p className="text-sm text-black/60 dark:text-white/60">
                  Select note
                </p>
                <div className="flex w-40 items-center">
                  <kbd className="rounded bg-gray-200 px-2 py-1 text-sm font-bold dark:bg-black">
                    x
                  </kbd>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-black/30 py-[6px] dark:border-white/30">
                <p className="text-sm text-black/60 dark:text-white/60">
                  Toggle between list and grid view
                </p>
                <div className="flex w-40 items-center">
                  <kbd className="rounded bg-gray-200 px-2 py-1 text-sm font-bold dark:bg-black">
                    Ctrl + g
                  </kbd>
                </div>
              </div>
              {/* Editor */}
              <h3 className="mb-2 mt-8 text-sm font-semibold">Editor</h3>
              <div className="flex items-center justify-between gap-2 border-b border-black/30 py-[6px] dark:border-white/30">
                <p className="text-sm text-black/60 dark:text-white/60">
                  Finish editing
                </p>
                <div className="flex w-40 items-center">
                  <kbd className="rounded bg-gray-200 px-2 py-1 text-sm font-bold dark:bg-black">
                    Esc
                  </kbd>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-black/30 py-[6px] dark:border-white/30">
                <p className="text-sm text-black/60 dark:text-white/60">
                  Finish editing
                </p>
                <div className="flex w-40 items-center">
                  <kbd className="rounded bg-gray-200 px-2 py-1 text-sm font-bold dark:bg-black">
                    Ctrl + Enter
                  </kbd>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-black/30 py-[6px] dark:border-white/30">
                <p className="text-sm text-black/60 dark:text-white/60">
                  Toggle checkboxes
                </p>
                <div className="flex w-40 items-center">
                  <kbd className="rounded bg-gray-200 px-2 py-1 text-sm font-bold dark:bg-black">
                    Ctrl + Shift + 8
                  </kbd>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-black/30 py-[6px] dark:border-white/30">
                <p className="text-sm text-black/60 dark:text-white/60">
                  Indent/dedent list item
                </p>
                <div className="flex w-40 items-center">
                  <kbd className="rounded bg-gray-200 px-2 py-1 text-sm font-bold dark:bg-black">
                    {"Ctrl + ] / ["}
                  </kbd>
                </div>
              </div>
            </form>
          </Dialog.Description>
          <Tooltip text="Close">
            <Dialog.Close asChild>
              <button
                className="absolute top-3 right-3 inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-black/10 focus:bg-black/10 dark:hover:bg-white/20 dark:focus:bg-white/20"
                aria-label="Close"
              >
                <CloseIcon />
              </button>
            </Dialog.Close>
          </Tooltip>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
