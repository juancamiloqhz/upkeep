import React from "react";
import * as Popover from "@radix-ui/react-popover";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { TiPinOutline, TiPin } from "react-icons/ti";
import { HiOutlineUserPlus, HiOutlineClock } from "react-icons/hi2";
import {
  MdOutlineColorLens,
  MdMoreVert,
  MdOutlineRestoreFromTrash,
  MdOutlineDeleteForever,
  MdOutlineHideImage,
  MdOutlineDone,
  MdChevronRight,
  MdSearch,
  MdLocationOn,
} from "react-icons/md";
import {
  BiBellPlus,
  BiImageAdd,
  BiArchiveIn,
  BiArchiveOut,
} from "react-icons/bi";
import { TbDropletOff } from "react-icons/tb";
import { trpc } from "../../utils/trpc";
import Tooltip from "../Radix/Tooltip";
import { useClickOutside } from "../../utils/helpers";
import Image from "next/image";
import { type Note } from "../../types/upkeep";
import { bgList, colorList } from "../../utils/constants";
import { useRouter } from "next/router";

const ListNote: React.FC<{ note: Note }> = ({ note }) => {
  const ref = React.useRef<HTMLLIElement>(null);
  const [btnFocused, setBtnFocused] = React.useState(false);
  const router = useRouter();
  const utils = trpc.useContext();
  const trashNote = trpc.note.trash.useMutation({
    onError(error) {
      console.log(error);
    },

    async onMutate() {
      // await utils.note.allActive.cancel();
      // await utils.note.allTrashed.cancel();
      // await utils.note.allPinned.cancel();
      // await utils.note.allArchived.cancel();
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
        title: title || "",
        content: content || "",
        background: background || "default",
        color: color || "default",
        status: note.status,
        authorId: note.authorId,
        createdAt: new Date(),
        updatedAt: new Date(),
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
      ...(note.color !== "default" && note.background === "default"
        ? { backgroundColor: note.color }
        : {}),
      ...(note.background !== "default" && note.color === "default"
        ? {
            backgroundImage: `url(${note.background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }
        : {}),
      ...(note.color !== "default" && note.background !== "default"
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
              <TiPin
                className="-rotate-45 text-black/60 transition-all duration-300 ease-in group-hover/btn:text-black dark:text-white/60 dark:group-hover/btn:text-white"
                size={24}
              />
            ) : (
              <TiPinOutline
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
          <TiPin
            className="-rotate-45 text-black/60 transition-all duration-300 ease-in group-hover/btn:text-black"
            size={16}
          />
        </button>
      </Tooltip>
      {/* NOTE CONTENT */}
      <div
        className="gap-4 px-3 pb-10 pt-[0.6rem]"
        onClick={() => {
          router.push(
            {
              href: `${router.pathname}?noteId=${note.id}`,
              // pathname: `/?noteId=[noteId]`,
              query: { noteId: note.id },
            },
            `/note/${note.id}`
          );
        }}
      >
        {note.title ? (
          <h3 className="mr-6 mb-2 font-semibold leading-tight">
            {note.title}
          </h3>
        ) : null}
        <p className={`text-sm font-light`}>{note?.content}</p>
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
                    <MdOutlineDeleteForever size={22} />
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
                <MdOutlineRestoreFromTrash size={22} />
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
                    <BiBellPlus size={18} />
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
                        <HiOutlineClock size={16} /> Pick date & time
                      </span>
                      <MdChevronRight size={18} />
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
                              <MdSearch size={12} />
                            </span>
                          </DropdownMenu.Label>
                        </div>
                      </DropdownMenu.SubContent>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Sub>
                  <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger className="flex h-full w-full cursor-pointer items-center justify-between py-2 pl-4 pr-2 text-xs text-black/60 hover:bg-black/10 hover:text-black focus-visible:bg-black/10 focus-visible:outline-0 dark:text-white/60 dark:hover:bg-white/20 dark:hover:text-white dark:focus-visible:bg-white/10">
                      <span className="flex items-center gap-1">
                        <MdLocationOn size={18} /> Pick place
                      </span>
                      <MdChevronRight size={18} />
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
                              <MdSearch size={12} />
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
                <HiOutlineUserPlus size={18} />
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
                    <MdOutlineColorLens size={18} />
                  </button>
                </Popover.Trigger>
              </Tooltip>
              <Popover.Portal>
                <Popover.Content sideOffset={-7}>
                  <div className="max-w-min rounded-md border border-black/10 bg-gray-50 shadow-md dark:border-white/10 dark:bg-gray-900">
                    <ul className="flex items-center justify-between gap-1 border-b border-black/10 px-2 py-2">
                      <Tooltip text="No color">
                        <li className="relative">
                          <TbDropletOff
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
                            <MdOutlineDone
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
                              <MdOutlineDone
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
                          <MdOutlineHideImage
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
                            <MdOutlineDone
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
                              <MdOutlineDone
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
                <BiImageAdd size={18} />
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
                  <BiArchiveOut size={18} />
                ) : (
                  <BiArchiveIn size={18} />
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
                    <MdMoreVert size={18} />
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
                      Add label
                      <MdChevronRight size={18} />
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
                              <MdSearch size={12} />
                            </span>
                          </DropdownMenu.Label>
                        </div>
                        <div className="max-h-[250px] overflow-y-auto px-3">
                          <h1>tag</h1>
                          <h1>tag</h1>
                          <h1>tag</h1>
                          <h1>tag</h1>
                          <h1>tag</h1>
                          <h1>tag</h1>
                          <h1>tag</h1>
                          <h1>tag</h1>
                          <h1>tag</h1>
                          <h1>tag</h1>
                          <h1>tag</h1>
                          <h1>tag</h1>
                          <h1>tag</h1>
                          <h1>tag</h1>
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
