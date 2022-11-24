import React from "react";
import { motion } from "framer-motion";
import * as Popover from "@radix-ui/react-popover";
import * as Dialog from "@radix-ui/react-dialog";
import { TiPinOutline, TiPin } from "react-icons/ti";
import { HiOutlineUserPlus } from "react-icons/hi2";
import {
  MdOutlineColorLens,
  MdMoreVert,
  MdOutlineRestoreFromTrash,
  MdOutlineDeleteForever,
  MdOutlineHideImage,
  MdOutlineDone,
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

const ListNote = ({ note }: { note: Note }) => {
  const ref = React.useRef<HTMLLIElement>(null);
  const [btnFocused, setBtnFocused] = React.useState(false);
  const utils = trpc.useContext();
  const trashNote = trpc.note.trash.useMutation({
    async onMutate() {
      await utils.note.allActive.cancel();
      await utils.note.allTrashed.cancel();
      await utils.note.allPinned.cancel();
      await utils.note.allArchived.cancel();
      const allActiveNotes = utils.note.allActive.getData();
      const allTrashedNotes = utils.note.allTrashed.getData();
      const allPinnedNotes = utils.note.allPinned.getData();
      const allArchivedNotes = utils.note.allArchived.getData();
      const newStatus: Note["status"] = "TRASH";
      const noteToTrash = { ...note, status: newStatus, updatedAt: new Date() };
      if (allActiveNotes && note.status === "ACTIVE") {
        utils.note.allActive.setData(
          undefined,
          allActiveNotes.filter((t) => t.id != note.id)
        );
      }
      if (allPinnedNotes && note.status === "PINNED") {
        utils.note.allPinned.setData(
          undefined,
          allPinnedNotes.filter((t) => t.id != note.id)
        );
      }
      if (allArchivedNotes && note.status === "ARCHIVED") {
        utils.note.allArchived.setData(
          undefined,
          allArchivedNotes.filter((t) => t.id != note.id)
        );
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
      if (allActiveNotes && note.status === "ACTIVE") {
        utils.note.allActive.setData(
          undefined,
          allActiveNotes.filter((t) => t.id != note.id)
        );
      }
      if (allArchivedNotes && note.status === "ARCHIVED") {
        utils.note.allArchived.setData(
          undefined,
          allArchivedNotes.filter((t) => t.id != note.id)
        );
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
  const deleteNote = trpc.note.delete.useMutation({
    async onMutate() {
      await utils.note.allTrashed.cancel();
      const allTrashedNotes = utils.note.allTrashed.getData();
      if (!allTrashedNotes) {
        return;
      }
      utils.note.allTrashed.setData(
        undefined,
        allTrashedNotes.filter((t) => t.id != note.id)
      );
    },
    // onError(e) {
    //   console.log("deleting Error: ", e.message);
    // },
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
      if (allActiveNotes && note.status === "ACTIVE") {
        utils.note.allActive.setData(
          undefined,
          allActiveNotes.filter((t) => t.id != note.id)
        );
      }
      if (allPinnedNotes && note.status === "PINNED") {
        utils.note.allPinned.setData(
          undefined,
          allPinnedNotes.filter((t) => t.id != note.id)
        );
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
      if (note.status === "ACTIVE") {
        utils.note.allActive.setData(
          undefined,
          allActiveNotes ? [newNote, ...allActiveNotes] : [newNote]
        );
      }
      if (note.status === "PINNED") {
        utils.note.allPinned.setData(
          undefined,
          allPinnedNotes ? [newNote, ...allPinnedNotes] : [newNote]
        );
      }
      if (note.status === "ARCHIVED") {
        utils.note.allArchived.setData(
          undefined,
          allArchivedNotes ? [newNote, ...allArchivedNotes] : [newNote]
        );
      }
      if (note.status === "TRASH") {
        utils.note.allTrashed.setData(
          undefined,
          allTrashedNotes ? [newNote, ...allTrashedNotes] : [newNote]
        );
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
    <motion.li
      layout
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      // transition={{ bounce: 0 }}
      ref={ref}
      tab-index={1}
      key={note.id}
      style={noteStyles}
      className={`group/li relative mb-4 flex h-fit w-full break-inside-avoid flex-col rounded-lg border border-black/20 bg-gray-50 transition-all duration-200 ease-in-out hover:border-black/30 hover:shadow-md dark:border-white/20 dark:bg-gray-900 sm:w-60`}
    >
      {/* PIN / UNPIN */}
      {note.status !== "TRASH" ? (
        <Tooltip text={note.status === "PINNED" ? "Unpin note" : "Pin note"}>
          <button
            className={`group/btn invisible absolute top-1 right-1 flex items-center justify-center rounded-full p-[0.4rem] opacity-0 transition-all duration-300 ease-in hover:bg-black/10 group-hover/li:visible group-hover/li:opacity-100 dark:hover:bg-white/20${
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
      <div className="gap-4 px-3 pb-10 pt-[0.6rem]">
        {note.title ? (
          <h3 className="mr-6 mb-2 font-semibold leading-tight">
            {note.title}
          </h3>
        ) : null}
        <p className={`text-sm font-light`}>{note?.content}</p>
      </div>
      {/* NOTE ACTIONS */}
      <div
        className={`invisible flex items-center justify-between py-1 px-[2px] opacity-0 transition-all duration-300 ease-in group-hover/li:visible group-hover/li:opacity-100${
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
            {/* REMINDER */}
            <Tooltip text="Reminder">
              <button
                type="button"
                onFocus={() => setBtnFocused(true)}
                className="rounded-full p-[8px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white dark:focus:ring-white/60"
              >
                <BiBellPlus size={18} />
              </button>
            </Tooltip>
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
            {/* MORE */}
            <Popover.Root>
              <Tooltip text="More">
                <Popover.Trigger asChild>
                  <button
                    type="button"
                    onFocus={() => setBtnFocused(true)}
                    className="rounded-full p-[8px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white dark:focus:ring-white/60"
                  >
                    <MdMoreVert size={18} />
                  </button>
                </Popover.Trigger>
              </Tooltip>
              <Popover.Portal>
                <Popover.Content sideOffset={-1} align="start">
                  <ul className="rounded-md border border-black/10 bg-gray-50 py-1 shadow-md dark:border-white/10 dark:bg-gray-900">
                    <li className="flex items-center">
                      <button
                        type="button"
                        onClick={() => trashNote.mutate({ id: note.id })}
                        className="h-full w-full px-4 py-2 text-sm text-black hover:bg-black/20 dark:text-white dark:hover:bg-white/20 "
                      >
                        Delete note
                      </button>
                    </li>
                    <li className="flex items-center">
                      <button
                        type="button"
                        onClick={() => console.log("Add label")}
                        className="h-full w-full px-4 py-2 text-sm text-black hover:bg-black/20 dark:text-white dark:hover:bg-white/20 "
                      >
                        Add label
                      </button>
                    </li>
                    <li className="flex items-center">
                      <button
                        type="button"
                        onClick={() => console.log("Add drawing")}
                        className="h-full w-full px-4 py-2 text-sm text-black hover:bg-black/20 dark:text-white dark:hover:bg-white/20 "
                      >
                        Add drawing
                      </button>
                    </li>
                    <li className="flex items-center">
                      <button
                        type="button"
                        onClick={() => copyNote.mutate({ ...note })}
                        className="h-full w-full px-4 py-2 text-sm text-black hover:bg-black/20 dark:text-white dark:hover:bg-white/20 "
                      >
                        Make a copy
                      </button>
                    </li>
                    <li className="flex items-center">
                      <button
                        type="button"
                        onClick={() => console.log("Show checkboxes")}
                        className="h-full w-full px-4 py-2 text-sm text-black hover:bg-black/20 dark:text-white dark:hover:bg-white/20 "
                      >
                        Show checkboxes
                      </button>
                    </li>
                  </ul>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </>
        )}
      </div>
    </motion.li>
  );
};

export default ListNote;
