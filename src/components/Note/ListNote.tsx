import React from "react";
import * as Popover from "@radix-ui/react-popover";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as RadixLabel from "@radix-ui/react-label";
import { trpc } from "../../utils/trpc";
import Tooltip from "../Radix/Tooltip";
import { useClickOutside } from "../../utils/helpers";
import Image from "next/image";
import { bgList, colorList } from "../../utils/constants";
import { useRouter } from "next/router";
import { type Note, type Label } from "@prisma/client";
import {
  ArchiveIcon,
  BellPlusIcon,
  CheckIcon,
  ChevronRightIcon,
  CloseIcon,
  DropletOffIcon,
  ImageAddIcon,
  LocationFillIcon,
  MoreVerticalIcon,
  OutlineClockIcon,
  OutlineColorPaletteIcon,
  OutlineDeleteForeverIcon,
  OutlineDoneIcon,
  OutlineHideImageIcon,
  OutlineRestoreFromTrashIcon,
  OutlineUserPlusIcon,
  PinIcon,
  PinOutlineIcon,
  SearchIcon,
  UnarchiveIcon,
} from "../Icons";

const ListNote: React.FC<{ note: Note & { labels: Label[] } }> = ({ note }) => {
  const ref = React.useRef<HTMLLIElement>(null);
  const [btnFocused, setBtnFocused] = React.useState(false);
  const router = useRouter();
  const utils = trpc.useContext();
  const trashNote = trpc.note.trash.useMutation({
    onError(error) {
      console.log(error);
    },
    async onMutate() {
      const allActiveNotes = utils.note.allActive.getData();
      const allTrashedNotes = utils.note.allTrashed.getData();
      const allPinnedNotes = utils.note.allPinned.getData();
      const allArchivedNotes = utils.note.allArchived.getData();
      const newStatus: Note["status"] = "TRASH";
      const noteToTrash = { ...note, status: newStatus, updatedAt: new Date() };
      switch (note.status) {
        case "ACTIVE":
          utils.note.allActive.setData(
            undefined,
            allActiveNotes?.filter((n) => n.id !== note.id)
          );
          break;
        case "PINNED":
          utils.note.allPinned.setData(
            undefined,
            allPinnedNotes?.filter((n) => n.id !== note.id)
          );
          break;
        case "ARCHIVED":
          utils.note.allArchived.setData(
            undefined,
            allArchivedNotes?.filter((n) => n.id !== note.id)
          );
          break;
        default:
          break;
      }
      utils.note.allTrashed.setData(
        undefined,
        allTrashedNotes ? [noteToTrash, ...allTrashedNotes] : [noteToTrash]
      );
    },
  });
  const pinNote = trpc.note.pin.useMutation({
    async onMutate() {
      await utils.note.allActive.cancel();
      await utils.note.allPinned.cancel();
      await utils.note.allArchived.cancel();
      const allActiveNotes = utils.note.allActive.getData();
      const allPinnedNotes = utils.note.allPinned.getData();
      const allArchivedNotes = utils.note.allArchived.getData();
      const newStatus: Note["status"] = "PINNED";
      const noteToPin = { ...note, status: newStatus, updatedAt: new Date() };
      switch (note.status) {
        case "ACTIVE":
          utils.note.allActive.setData(
            undefined,
            allActiveNotes?.filter((n) => n.id !== note.id)
          );
          break;
        case "ARCHIVED":
          utils.note.allArchived.setData(
            undefined,
            allArchivedNotes?.filter((n) => n.id !== note.id)
          );
          break;
        default:
          break;
      }
      utils.note.allPinned.setData(
        undefined,
        allPinnedNotes ? [noteToPin, ...allPinnedNotes] : [noteToPin]
      );
    },
  });
  const unPinNote = trpc.note.restore.useMutation({
    async onMutate() {
      await utils.note.allActive.cancel();
      await utils.note.allPinned.cancel();
      const allActiveNotes = utils.note.allActive.getData();
      const allPinnedNotes = utils.note.allPinned.getData();
      const newStatus: Note["status"] = "ACTIVE";
      const noteToUnPin = {
        ...note,
        status: newStatus,
        updatedAt: new Date(),
      };
      if (allPinnedNotes) {
        utils.note.allPinned.setData(
          undefined,
          allPinnedNotes.filter((t) => t.id != note.id)
        );
      }
      utils.note.allActive.setData(
        undefined,
        allActiveNotes ? [noteToUnPin, ...allActiveNotes] : [noteToUnPin]
      );
    },
  });
  const deleteNote = trpc.note.deleteOne.useMutation({
    async onMutate() {
      await utils.note.allTrashed.cancel();
      const allTrashedNotes = utils.note.allTrashed.getData();
      if (allTrashedNotes) {
        utils.note.allTrashed.setData(
          undefined,
          allTrashedNotes.filter((t) => t.id != note.id)
        );
      }
    },
  });
  const restoreNote = trpc.note.restore.useMutation({
    async onMutate() {
      await utils.note.allActive.cancel();
      await utils.note.allTrashed.cancel();
      const allActiveNotes = utils.note.allActive.getData();
      const allTrashedNotes = utils.note.allTrashed.getData();
      const newStatus: Note["status"] = "ACTIVE";
      const noteToRestore = {
        ...note,
        status: newStatus,
        updatedAt: new Date(),
      };
      if (allTrashedNotes) {
        utils.note.allTrashed.setData(
          undefined,
          allTrashedNotes.filter((t) => t.id != note.id)
        );
      }
      utils.note.allActive.setData(
        undefined,
        allActiveNotes ? [noteToRestore, ...allActiveNotes] : [noteToRestore]
      );
    },
  });
  const archiveNote = trpc.note.archive.useMutation({
    async onMutate() {
      await utils.note.allActive.cancel();
      await utils.note.allArchived.cancel();
      await utils.note.allPinned.cancel();
      const allActiveNotes = utils.note.allActive.getData();
      const allArchivedNotes = utils.note.allArchived.getData();
      const allPinnedNotes = utils.note.allPinned.getData();
      const newStatus: Note["status"] = "ARCHIVED";
      const noteToArchive = {
        ...note,
        status: newStatus,
        updatedAt: new Date(),
      };
      switch (note.status) {
        case "ACTIVE":
          utils.note.allActive.setData(
            undefined,
            allActiveNotes?.filter((n) => n.id !== note.id)
          );
          break;
        case "PINNED":
          utils.note.allPinned.setData(
            undefined,
            allPinnedNotes?.filter((n) => n.id !== note.id)
          );
          break;
        default:
          break;
      }
      utils.note.allArchived.setData(
        undefined,
        allArchivedNotes
          ? [noteToArchive, ...allArchivedNotes]
          : [noteToArchive]
      );
    },
  });
  const unarchiveNote = trpc.note.restore.useMutation({
    async onMutate() {
      await utils.note.allActive.cancel();
      await utils.note.allArchived.cancel();
      const allActiveNotes = utils.note.allActive.getData();
      const allArchivedNotes = utils.note.allArchived.getData();
      const newStatus: Note["status"] = "ACTIVE";
      const noteToUnarchive = {
        ...note,
        status: newStatus,
        updatedAt: new Date(),
      };
      if (allArchivedNotes) {
        utils.note.allArchived.setData(
          undefined,
          allArchivedNotes.filter((t) => t.id != note.id)
        );
      }
      utils.note.allActive.setData(
        undefined,
        allActiveNotes
          ? [noteToUnarchive, ...allActiveNotes]
          : [noteToUnarchive]
      );
    },
  });
  const editNote = trpc.note.edit.useMutation({
    async onMutate({ title, content, status, background, color, updatedAt }) {
      await utils.note.allActive.cancel();
      await utils.note.allArchived.cancel();
      await utils.note.allPinned.cancel();
      await utils.note.allTrashed.cancel();
      const allActiveNotes = utils.note.allActive.getData();
      const allArchivedNotes = utils.note.allArchived.getData();
      const allPinnedNotes = utils.note.allPinned.getData();
      const allTrashedNotes = utils.note.allTrashed.getData();
      const newNote = {
        ...note,
        ...(title && { title }),
        ...(content && { content }),
        ...(status && { status }),
        ...(background && { background }),
        ...(color && { color }),
        ...(updatedAt && { updatedAt: new Date() }),
      };
      if (allActiveNotes) {
        utils.note.allActive.setData(
          undefined,
          allActiveNotes.map((t) =>
            t.id === note.id ? { ...t, ...newNote } : t
          )
        );
      }
      if (allPinnedNotes) {
        utils.note.allPinned.setData(
          undefined,
          allPinnedNotes.map((t) =>
            t.id === note.id ? { ...t, ...newNote } : t
          )
        );
      }
      if (allArchivedNotes) {
        utils.note.allArchived.setData(
          undefined,
          allArchivedNotes.map((t) =>
            t.id === note.id ? { ...t, ...newNote } : t
          )
        );
      }
      if (allTrashedNotes) {
        utils.note.allTrashed.setData(
          undefined,
          allTrashedNotes.map((t) =>
            t.id === note.id ? { ...t, ...newNote } : t
          )
        );
      }
    },
  });
  const copyNote = trpc.note.add.useMutation({
    async onMutate({ title, content, background, color }) {
      // console.log("onMutate", res);
      await utils.note.allActive.cancel();
      await utils.note.allArchived.cancel();
      await utils.note.allPinned.cancel();
      await utils.note.allTrashed.cancel();
      const allActiveNotes = utils.note.allActive.getData();
      const allArchivedNotes = utils.note.allArchived.getData();
      const allPinnedNotes = utils.note.allPinned.getData();
      const allTrashedNotes = utils.note.allTrashed.getData();
      const newNote = {
        id: `${Math.random()}`,
        title: title || note.title,
        content: content || note.content,
        background: background || note.background,
        color: color || note.color,
        status: note.status,
        authorId: note.authorId,
        createdAt: new Date(),
        updatedAt: new Date(),
        labels: note.labels,
      };
      switch (note.status) {
        case "ACTIVE":
          utils.note.allActive.setData(
            undefined,
            allActiveNotes ? [newNote, ...allActiveNotes] : [newNote]
          );
          break;
        case "PINNED":
          utils.note.allPinned.setData(
            undefined,
            allPinnedNotes ? [newNote, ...allPinnedNotes] : [newNote]
          );
          break;
        case "ARCHIVED":
          utils.note.allArchived.setData(
            undefined,
            allArchivedNotes ? [newNote, ...allArchivedNotes] : [newNote]
          );
          break;
        case "TRASH":
          utils.note.allTrashed.setData(
            undefined,
            allTrashedNotes ? [newNote, ...allTrashedNotes] : [newNote]
          );
          break;
        default:
          break;
      }
    },
  });

  useClickOutside({
    ref,
    enabled: true,
    callback() {
      setBtnFocused(false);
    },
  });
  const noteStyles = React.useMemo(
    () => ({
      ...(note.color && !note.background
        ? { backgroundColor: note.color }
        : {}),
      ...(note.background && !note.color
        ? {
            backgroundImage: `url(${note.background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }
        : {}),
      ...(note.color && note.background
        ? {
            backgroundColor: note.color,
            borderColor: note.color,
            backgroundImage: `url(${note.background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }
        : {}),
    }),
    [note.color, note.background]
  );

  const noteLabels = React.useMemo(() => {
    return utils.label.all.getData() || [];
  }, [utils.label.all]);

  const hasActiveTags = React.useMemo(() => {
    return noteLabels.some(
      (label) => label.id === note.labels.find((l) => l.id === label.id)?.id
    );
  }, [note.labels, noteLabels]);

  return (
    <li
      ref={ref}
      tab-index={1}
      key={note.id}
      style={noteStyles}
      className={`group/li relative mb-4 flex h-fit w-full break-inside-avoid flex-col rounded-lg border border-black/20 bg-gray-50 transition-all duration-200 ease-in-out hover:shadow-lg dark:border-white/20 dark:bg-gray-900 dark:hover:shadow-black sm:w-60${
        router.query.noteId === note.id ? " invisible" : ""
      }`}
    >
      {/* PIN / UNPIN */}
      {note.status !== "TRASH" ? (
        <Tooltip text={note.status === "PINNED" ? "Unpin note" : "Pin note"}>
          <button
            className={`group/btn invisible absolute top-1 right-1 flex items-center justify-center rounded-full p-[0.4rem] opacity-0 transition-all duration-300 ease-in hover:bg-black/10 ${
              router.query.noteId === note.id
                ? "duration-[0ms]"
                : "group-hover/li:visible"
            } group-hover/li:opacity-100 dark:hover:bg-white/20${
              btnFocused ? " !visible !opacity-100" : ""
            }`}
            onClick={
              note.status === "PINNED"
                ? () => unPinNote.mutate({ id: note.id })
                : () => pinNote.mutate({ id: note.id })
            }
          >
            {note.status === "PINNED" ? (
              <PinIcon
                className="-rotate-45 text-black/60 transition-all duration-300 ease-in group-hover/btn:text-black dark:text-white/60 dark:group-hover/btn:text-white"
                size={24}
              />
            ) : (
              <PinOutlineIcon
                className="text-black/60 transition-all duration-300 ease-in group-hover/btn:text-black dark:text-white/60 dark:group-hover/btn:text-white"
                size={24}
              />
            )}
          </button>
        </Tooltip>
      ) : null}
      <Tooltip text={"Select note"}>
        <button
          className={`group/btn invisible absolute top-1 left-1 flex items-center justify-center rounded-full opacity-0 transition-all duration-300 ease-in hover:bg-black/10 group-hover/li:visible group-hover/li:opacity-100`}
          // onClick={}
        >
          <PinIcon
            className="-rotate-45 text-black/60 transition-all duration-300 ease-in group-hover/btn:text-black"
            size={16}
          />
        </button>
      </Tooltip>
      {/* NOTE CONTENT */}
      <div
        className="flex w-full flex-col justify-between px-3 py-2"
        onClick={() => {
          router.push(
            {
              href: `${router.pathname}?noteId=${note.id}`,
              query: { noteId: note.id },
            },
            `/note/${note.id}`
          );
        }}
      >
        <div className="h-full min-h-[4rem]">
          {note.title ? (
            <h3 className="mr-6 mb-2 font-semibold leading-tight">
              {note.title}
            </h3>
          ) : null}
          <p className={`text-sm font-light`}>{note?.content}</p>
        </div>
        {note.labels.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {note.labels.map((label) => (
              <NoteLabel key={label.id} label={label} note={note} />
            ))}
          </div>
        ) : null}
      </div>
      {/* NOTE ACTIONS */}
      <div
        className={`invisible flex items-center justify-between py-1 px-[2px] opacity-0 transition-all duration-300 ease-in ${
          router.query.noteId === note.id
            ? "duration-[0ms]"
            : "group-hover/li:visible"
        } group-hover/li:opacity-100${
          btnFocused ? " !visible !opacity-100" : ""
        }`}
      >
        {/* DELETE / RESTORE */}
        {note.status === "TRASH" ? (
          <span>
            {/* Delete Dialog Modal */}
            <Dialog.Root>
              <Tooltip text="Delete forever">
                <Dialog.Trigger asChild>
                  <button
                    type="button"
                    className="rounded-full p-[8px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white dark:focus:ring-white/60"
                  >
                    <OutlineDeleteForeverIcon size={22} />
                  </button>
                </Dialog.Trigger>
              </Tooltip>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-[9999] bg-black/80" />
                <Dialog.Content className="fixed top-1/2 left-1/2 z-[9999] flex max-h-[85vh] min-h-[120px] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 transform flex-col justify-between rounded-md border-black/20 bg-gray-50 p-6 pb-4 shadow-md focus:outline-none dark:border-white/30 dark:bg-gray-900">
                  <Dialog.Title className="text-sm ">
                    Delete note forever?
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
                        onClick={() => deleteNote.mutate({ id: note.id })}
                        type="button"
                      >
                        Delete
                      </button>
                    </Dialog.Close>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
            <Tooltip text="Restore">
              <button
                onClick={() => restoreNote.mutate({ id: note.id })}
                className="rounded-full p-[8px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white dark:focus:ring-white/60"
              >
                <OutlineRestoreFromTrashIcon size={22} />
              </button>
            </Tooltip>
          </span>
        ) : (
          <>
            {/* REMINDER Dropdown */}
            <DropdownMenu.Root modal={false}>
              <Tooltip text="Reminder">
                <DropdownMenu.Trigger asChild>
                  <button
                    type="button"
                    onFocus={() => setBtnFocused(true)}
                    className="rounded-full p-[8px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white dark:focus:ring-white/60"
                  >
                    <BellPlusIcon size={18} />
                  </button>
                </DropdownMenu.Trigger>
              </Tooltip>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  loop
                  className="w-[300px] rounded-md border border-black/10 bg-gray-50 py-1 shadow-md dark:border-white/10 dark:bg-gray-900 dark:shadow-black "
                  sideOffset={-1}
                  align="start"
                >
                  <h3 className="py-4 px-4 text-sm">Reminder:</h3>
                  <DropdownMenu.Item
                    // onClick={() => trashNote.mutate({ id: note.id })}
                    className="flex h-full w-full cursor-pointer items-center justify-between py-2 px-4 text-xs text-black/60 hover:bg-black/10 hover:text-black focus-visible:bg-black/10 focus-visible:outline-0 dark:text-white/60 dark:hover:bg-white/20 dark:hover:text-white dark:focus-visible:bg-white/10"
                  >
                    Later today
                    <span>8:00 PM</span>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    // onClick={() => trashNote.mutate({ id: note.id })}
                    className="flex h-full w-full cursor-pointer items-center justify-between py-2 px-4 text-xs text-black/60 hover:bg-black/10 hover:text-black focus-visible:bg-black/10 focus-visible:outline-0 dark:text-white/60 dark:hover:bg-white/20 dark:hover:text-white dark:focus-visible:bg-white/10"
                  >
                    Tomorrow
                    <span>8:00 AM</span>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    // onClick={() => trashNote.mutate({ id: note.id })}
                    className="flex h-full w-full cursor-pointer items-center justify-between py-2 px-4 text-xs text-black/60 hover:bg-black/10 hover:text-black focus-visible:bg-black/10 focus-visible:outline-0 dark:text-white/60 dark:hover:bg-white/20 dark:hover:text-white dark:focus-visible:bg-white/10"
                  >
                    Next week
                    <span>Mon, 8:00 AM</span>
                  </DropdownMenu.Item>
                  <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger className="flex h-full w-full cursor-pointer items-center justify-between py-2 pl-4 pr-2 text-xs text-black/60 hover:bg-black/10 hover:text-black focus-visible:bg-black/10 focus-visible:outline-0 dark:text-white/60 dark:hover:bg-white/20 dark:hover:text-white dark:focus-visible:bg-white/10">
                      <span className="flex items-center gap-1">
                        <OutlineClockIcon size={16} /> Pick date & time
                      </span>
                      <ChevronRightIcon size={18} />
                    </DropdownMenu.SubTrigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.SubContent
                        className="relative w-[200px] rounded-md border border-black/10 bg-gray-50 shadow-md dark:border-white/10 dark:bg-gray-900 dark:shadow-black"
                        sideOffset={-4}
                        alignOffset={0}
                      >
                        <div className="px-3 py-2">
                          <h3 className="text-xs font-medium">Label note</h3>
                          <DropdownMenu.Label className="relative">
                            <input
                              id="search-tag"
                              type="text"
                              placeholder="Enter label name"
                              className="w-full border-none bg-gray-50 px-0 py-1 text-xs focus:outline-none dark:border-white/10 dark:bg-gray-900"
                              autoFocus
                            />
                            <span className="absolute top-1/2 right-0 -translate-y-1/2">
                              <SearchIcon size={12} />
                            </span>
                          </DropdownMenu.Label>
                        </div>
                      </DropdownMenu.SubContent>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Sub>
                  <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger className="flex h-full w-full cursor-pointer items-center justify-between py-2 pl-4 pr-2 text-xs text-black/60 hover:bg-black/10 hover:text-black focus-visible:bg-black/10 focus-visible:outline-0 dark:text-white/60 dark:hover:bg-white/20 dark:hover:text-white dark:focus-visible:bg-white/10">
                      <span className="flex items-center gap-1">
                        <LocationFillIcon size={18} /> Pick place
                      </span>
                      <ChevronRightIcon size={18} />
                    </DropdownMenu.SubTrigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.SubContent
                        className="relative w-[200px] rounded-md border border-black/10 bg-gray-50 shadow-md dark:border-white/10 dark:bg-gray-900 dark:shadow-black"
                        sideOffset={-4}
                        alignOffset={0}
                      >
                        <div className="px-3 py-2">
                          <h3 className="text-xs font-medium">Pick place</h3>
                          <DropdownMenu.Label className="relative">
                            <input
                              id="search-tag"
                              type="text"
                              placeholder="Choose location"
                              className="w-full border-b bg-gray-50 px-0 py-1 text-xs focus:outline-none dark:border-white/10 dark:bg-gray-900"
                              autoFocus
                            />
                            <span className="absolute top-1/2 right-0 -translate-y-1/2">
                              <SearchIcon size={12} />
                            </span>
                          </DropdownMenu.Label>
                        </div>
                      </DropdownMenu.SubContent>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Sub>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
            {/* COLLABORATORS */}
            <Tooltip text="Collaborator">
              <button
                type="button"
                onFocus={() => setBtnFocused(true)}
                className="rounded-full p-[8px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white dark:focus:ring-white/60"
              >
                <OutlineUserPlusIcon size={18} />
              </button>
            </Tooltip>
            {/* BACKGROUND OPTIONS */}
            <Popover.Root>
              <Tooltip text="Background options">
                <Popover.Trigger asChild>
                  <button
                    type="button"
                    onFocus={() => setBtnFocused(true)}
                    className="rounded-full p-[8px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white dark:focus:ring-white/60"
                  >
                    <OutlineColorPaletteIcon size={18} />
                  </button>
                </Popover.Trigger>
              </Tooltip>
              <Popover.Portal>
                <Popover.Content sideOffset={-7}>
                  <div className="max-w-min rounded-md border border-black/10 bg-gray-50 shadow-md dark:border-white/10 dark:bg-gray-900">
                    <ul className="flex items-center justify-between gap-1 border-b border-black/10 px-2 py-2">
                      <Tooltip text="No color">
                        <li className="relative">
                          <DropletOffIcon
                            size={32}
                            className={`cursor-pointer rounded-full border-2 border-solid stroke-black/60 p-1 transition-all dark:stroke-white/60 duration-200${
                              note.color === "default"
                                ? " border-fuchsia-500 hover:border-fuchsia-500"
                                : " border-black/20 hover:border-black dark:border-white/20 dark:hover:border-white"
                            }`}
                            onClick={() => {
                              editNote.mutate({
                                id: note.id,
                                color: "default",
                              });
                            }}
                          />
                          {note.color === "default" ? (
                            <OutlineDoneIcon
                              size={14}
                              className="absolute -top-[2px] -right-[2px] flex rounded-full bg-fuchsia-500 fill-white"
                            />
                          ) : null}
                        </li>
                      </Tooltip>
                      {colorList.map((color) => (
                        <Tooltip text={color.name} key={color.color}>
                          <li className="relative h-[32px] min-h-[32px] w-[32px] min-w-[32px]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="100%"
                              height="100%"
                              viewBox="0 0 32 32"
                              fill="none"
                              className={`rounded-full stroke-[3px] stroke-[${
                                color.color
                              }] cursor-pointer transition-all duration-300${
                                note.color === color.color
                                  ? " stroke-fuchsia-500 hover:stroke-fuchsia-500"
                                  : " hover:stroke-black/80 dark:hover:stroke-white/80"
                              }`}
                              onClick={() => {
                                editNote.mutate({
                                  id: note.id,
                                  color: color.color,
                                });
                              }}
                            >
                              <circle
                                cx="16"
                                cy="16"
                                r="16"
                                fill={color.color}
                              />
                            </svg>
                            {note.color === color.color ? (
                              <OutlineDoneIcon
                                size={14}
                                className="absolute -top-[2px] -right-[2px] flex rounded-full bg-fuchsia-500 fill-white"
                              />
                            ) : null}
                          </li>
                        </Tooltip>
                      ))}
                    </ul>
                    <ul className="flex items-center justify-between px-1 py-2">
                      <Tooltip text="No image">
                        <li className="relative">
                          <OutlineHideImageIcon
                            size={40}
                            className={`cursor-pointer rounded-full border-2 border-solid fill-black/60 p-[6px] dark:fill-white/60${
                              note.background === "default"
                                ? " border-fuchsia-500 hover:border-fuchsia-500"
                                : " border-black/20 hover:border-black dark:border-white/20 dark:hover:border-white"
                            }`}
                            onClick={() => {
                              editNote.mutate({
                                id: note.id,
                                background: "default",
                              });
                            }}
                          />
                          {note.background === "default" ? (
                            <OutlineDoneIcon
                              size={14}
                              className="absolute top-0 right-0 flex rounded-full bg-fuchsia-500 fill-white"
                            />
                          ) : null}
                        </li>
                      </Tooltip>
                      {bgList.map((bg, i) => (
                        <Tooltip text={bg.name} key={`${bg.name}-${i}`}>
                          <li className="relative h-[40px] min-h-[40px] w-[40px] min-w-[40px]">
                            <Image
                              src={bg.path}
                              alt={bg.name}
                              fill
                              className={`cursor-pointer rounded-full object-cover object-center outline outline-2 -outline-offset-2${
                                note.background === bg.path
                                  ? " outline-fuchsia-500 hover:outline-fuchsia-500"
                                  : " outline-transparent hover:outline-black dark:hover:outline-white"
                              }`}
                              onClick={() => {
                                editNote.mutate({
                                  id: note.id,
                                  background: bg.path,
                                });
                              }}
                            />
                            {note.background === bg.path ? (
                              <OutlineDoneIcon
                                size={14}
                                className="absolute top-0 right-0 flex rounded-full bg-fuchsia-500 fill-white"
                              />
                            ) : null}
                          </li>
                        </Tooltip>
                      ))}
                    </ul>
                  </div>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
            {/* ADD IMAGE */}
            <Tooltip text="Add image">
              <button
                type="button"
                className="rounded-full p-[8px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white dark:focus:ring-white/60"
              >
                <ImageAddIcon size={18} />
              </button>
            </Tooltip>
            {/* ARCHIVE / UNARCHIVE */}
            <Tooltip
              text={note.status === "ARCHIVED" ? "Unarchive" : "Archive"}
            >
              <button
                type="button"
                onClick={
                  note.status === "ARCHIVED"
                    ? () => unarchiveNote.mutate({ id: note.id })
                    : () => archiveNote.mutate({ id: note.id })
                }
                className="rounded-full p-[8px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white dark:focus:ring-white/60"
              >
                {note.status === "ARCHIVED" ? (
                  <UnarchiveIcon size={18} />
                ) : (
                  <ArchiveIcon size={18} />
                )}
              </button>
            </Tooltip>
            {/* MORE Dropdown */}
            <DropdownMenu.Root modal={false}>
              <Tooltip text="More">
                <DropdownMenu.Trigger asChild>
                  <button
                    type="button"
                    onClick={() => setBtnFocused(true)}
                    className="rounded-full p-[8px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white dark:focus:ring-white/60"
                  >
                    <MoreVerticalIcon size={18} />
                  </button>
                </DropdownMenu.Trigger>
              </Tooltip>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  loop
                  className="w-[180px] rounded-md border border-black/10 bg-gray-50 py-1 shadow-md dark:border-white/10 dark:bg-gray-900 dark:shadow-black"
                  sideOffset={-1}
                  align="start"
                >
                  <DropdownMenu.Item
                    onClick={() => trashNote.mutate({ id: note.id })}
                    className="flex h-full w-full cursor-pointer items-center justify-between py-2 pl-4 pr-2 text-sm text-black/60 hover:bg-black/10 hover:text-black focus-visible:bg-black/10 focus-visible:outline-0 dark:text-white/60 dark:hover:bg-white/20 dark:hover:text-white dark:focus-visible:bg-white/10"
                  >
                    Delete note
                  </DropdownMenu.Item>
                  <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger className="flex h-full w-full cursor-pointer items-center justify-between py-2 pl-4 pr-2 text-sm text-black/60 hover:bg-black/10 hover:text-black focus-visible:bg-black/10 focus-visible:outline-0 dark:text-white/60 dark:hover:bg-white/20 dark:hover:text-white dark:focus-visible:bg-white/10">
                      {hasActiveTags ? "Change label" : "Add label"}
                      <ChevronRightIcon size={18} />
                    </DropdownMenu.SubTrigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.SubContent
                        className="relative w-[200px] rounded-md border border-black/10 bg-gray-50 shadow-md dark:border-white/10 dark:bg-gray-900 dark:shadow-black"
                        sideOffset={-4}
                        alignOffset={0}
                      >
                        <div className="px-3 py-2">
                          <h3 className="text-xs font-medium">Label note</h3>
                          <DropdownMenu.Label className="relative">
                            <input
                              id="search-tag"
                              type="text"
                              placeholder="Enter label name"
                              className="w-full border-none bg-gray-50 px-0 py-1 text-xs focus:outline-none dark:border-white/10 dark:bg-gray-900"
                              autoFocus
                            />
                            <span className="absolute top-1/2 right-0 -translate-y-1/2">
                              <SearchIcon size={12} />
                            </span>
                          </DropdownMenu.Label>
                        </div>
                        <div className="max-h-[250px] overflow-y-auto pb-4">
                          {noteLabels.map((label) => (
                            <LabelPick
                              key={label.id}
                              label={label}
                              note={note}
                            />
                          ))}
                        </div>
                      </DropdownMenu.SubContent>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Sub>
                  <DropdownMenu.Item className="flex h-full w-full cursor-pointer items-center justify-between py-2 pl-4 pr-2 text-sm text-black/60 hover:bg-black/10 hover:text-black focus-visible:bg-black/10 focus-visible:outline-0 dark:text-white/60 dark:hover:bg-white/20 dark:hover:text-white dark:focus-visible:bg-white/10">
                    Add drawing
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => copyNote.mutate({ ...note })}
                    className="flex h-full w-full cursor-pointer items-center justify-between py-2 pl-4 pr-2 text-sm text-black/60 hover:bg-black/10 hover:text-black focus-visible:bg-black/10 focus-visible:outline-0 dark:text-white/60 dark:hover:bg-white/20 dark:hover:text-white dark:focus-visible:bg-white/10"
                  >
                    Make a copy
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="flex h-full w-full cursor-pointer items-center justify-between py-2 pl-4 pr-2 text-sm text-black/60 hover:bg-black/10 hover:text-black focus-visible:bg-black/10 focus-visible:outline-0 dark:text-white/60 dark:hover:bg-white/20 dark:hover:text-white dark:focus-visible:bg-white/10">
                    Show checkboxes
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </>
        )}
      </div>
    </li>
  );
};

export default React.memo(ListNote);

function NoteLabel({
  label,
  note,
}: {
  label: Label;
  note: Note & { labels: Label[] };
}) {
  const utils = trpc.useContext();
  const router = useRouter();
  const disconnectFromNote = trpc.label.disconnectFromNote.useMutation({
    async onMutate({ noteId, id }) {
      const allActiveNotes = utils.note.allActive.getData();
      const allArchivedNotes = utils.note.allArchived.getData();
      const allPinnedNotes = utils.note.allPinned.getData();
      switch (note.status) {
        case "ACTIVE":
          utils.note.allActive.setData(
            undefined,
            allActiveNotes?.map((note) =>
              note.id === noteId
                ? {
                    ...note,
                    labels: note.labels.filter((label) => label.id !== id),
                  }
                : note
            )
          );
          break;
        case "PINNED":
          utils.note.allPinned.setData(
            undefined,
            allPinnedNotes?.map((note) =>
              note.id === noteId
                ? {
                    ...note,
                    labels: note.labels.filter((label) => label.id !== id),
                  }
                : note
            )
          );
          break;
        case "ARCHIVED":
          utils.note.allArchived.setData(
            undefined,
            allArchivedNotes?.map((note) =>
              note.id === noteId
                ? {
                    ...note,
                    labels: note.labels.filter((label) => label.id !== id),
                  }
                : note
            )
          );
          break;
        default:
          break;
      }
    },
  });
  return (
    <span
      key={label.id}
      className="group/label relative flex h-[24px] cursor-pointer items-center justify-between whitespace-nowrap rounded-full bg-black/10 px-[10px] text-xs font-medium leading-none dark:bg-white/10"
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/label/${label.id}`);
      }}
    >
      {label.name}
      <Tooltip text={"Remove label"}>
        <button
          className="absolute right-0 top-1/2 ml-1 hidden h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-black/60 group-hover/label:flex group-hover/label:bg-gray-700 group-hover/label:text-white dark:text-white/60 dark:group-hover/label:bg-gray-300 dark:group-hover/label:text-black"
          onClick={(e) => {
            e.stopPropagation();
            disconnectFromNote.mutate({ noteId: note.id, id: label.id });
          }}
        >
          <CloseIcon size={10} />
        </button>
      </Tooltip>
    </span>
  );
}

function LabelPick({
  label,
  note,
}: {
  label: Label;
  note: Note & { labels: Label[] };
}) {
  const utils = trpc.useContext();
  const connectToNote = trpc.label.connectToNote.useMutation({
    async onMutate({ noteId, id }) {
      const allActiveNotes = utils.note.allActive.getData();
      const allArchivedNotes = utils.note.allArchived.getData();
      const allPinnedNotes = utils.note.allPinned.getData();
      switch (note.status) {
        case "ACTIVE":
          utils.note.allActive.setData(
            undefined,
            allActiveNotes?.map((note) =>
              note.id === noteId
                ? { ...note, labels: [...note.labels, label] }
                : note
            )
          );
          break;
        case "PINNED":
          utils.note.allPinned.setData(
            undefined,
            allPinnedNotes?.map((note) =>
              note.id === noteId
                ? { ...note, labels: [...note.labels, label] }
                : note
            )
          );
          break;
        case "ARCHIVED":
          utils.note.allArchived.setData(
            undefined,
            allArchivedNotes?.map((note) =>
              note.id === noteId
                ? { ...note, labels: [...note.labels, label] }
                : note
            )
          );
          break;
        default:
          break;
      }
    },
  });
  const disconnectFromNote = trpc.label.disconnectFromNote.useMutation({
    async onMutate({ noteId, id }) {
      const allActiveNotes = utils.note.allActive.getData();
      const allArchivedNotes = utils.note.allArchived.getData();
      const allPinnedNotes = utils.note.allPinned.getData();
      switch (note.status) {
        case "ACTIVE":
          utils.note.allActive.setData(
            undefined,
            allActiveNotes?.map((note) =>
              note.id === noteId
                ? {
                    ...note,
                    labels: note.labels.filter((label) => label.id !== id),
                  }
                : note
            )
          );
          break;
        case "PINNED":
          utils.note.allPinned.setData(
            undefined,
            allPinnedNotes?.map((note) =>
              note.id === noteId
                ? {
                    ...note,
                    labels: note.labels.filter((label) => label.id !== id),
                  }
                : note
            )
          );
          break;
        case "ARCHIVED":
          utils.note.allArchived.setData(
            undefined,
            allArchivedNotes?.map((note) =>
              note.id === noteId
                ? {
                    ...note,
                    labels: note.labels.filter((label) => label.id !== id),
                  }
                : note
            )
          );
          break;
        default:
          break;
      }
    },
  });
  return (
    <RadixLabel.Root
      className="flex w-full select-none items-center gap-2 py-2 px-3 text-sm leading-none hover:bg-black/10 dark:hover:bg-white/10"
      htmlFor={label.id}
    >
      <Checkbox.Root
        className="flex h-[14px] min-h-[14px] w-[14px] min-w-[14px] items-center justify-center rounded border-2 border-solid border-black/30 bg-gray-50 hover:bg-gray-100 focus:border-black dark:border-white/30 dark:bg-gray-900 hover:dark:bg-black dark:focus:border-white"
        id={label.id}
        checked={note.labels.some((l) => l.id === label.id)}
        onCheckedChange={(checked) => {
          if (checked) {
            connectToNote.mutate({ noteId: note.id, id: label.id });
          } else {
            disconnectFromNote.mutate({ noteId: note.id, id: label.id });
          }
        }}
      >
        <Checkbox.Indicator className="text-black dark:text-white">
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
      {label.name}
    </RadixLabel.Root>
  );
}
