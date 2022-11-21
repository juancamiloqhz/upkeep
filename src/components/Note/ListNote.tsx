import React from "react";
import { type inferProcedureOutput } from "@trpc/server";
import * as Popover from "@radix-ui/react-popover";
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

import { type AppRouter } from "../../server/trpc/router/_app";
import { trpc } from "../../utils/trpc";
import Tooltip from "../Radix/Tooltip";
import { useClickOutside } from "../../utils/helpers";
import Image from "next/image";

type Note = inferProcedureOutput<AppRouter["note"]["allActive"]>[number];

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
  const noteStyles = {
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
  };

  return (
    <li
      ref={ref}
      tab-index={1}
      key={note.id}
      style={noteStyles}
      className={`group/li relative flex h-fit flex-col rounded-lg border border-gray-200 bg-white transition-all duration-200 ease-in-out hover:border-gray-300 hover:shadow-md`}
    >
      {/* PIN / UNPIN */}
      {note.status !== "TRASH" ? (
        <Tooltip text={note.status === "PINNED" ? "Unpin note" : "Pin note"}>
          <button
            className={`group/btn invisible absolute top-1 right-1 flex items-center justify-center rounded-full p-[0.4rem] opacity-0 transition-all duration-300 ease-in hover:bg-black/10 group-hover/li:visible group-hover/li:opacity-100${
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
                className="-rotate-45 text-black/60 transition-all duration-300 ease-in group-hover/btn:text-black"
                size={24}
              />
            ) : (
              <TiPinOutline
                className="text-black/60 transition-all duration-300 ease-in group-hover/btn:text-black"
                size={24}
              />
            )}
          </button>
        </Tooltip>
      ) : null}
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
            <Tooltip text="Delete forever">
              <button
                onClick={() => deleteNote.mutate({ id: note.id })}
                className="rounded-full p-[9px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60"
              >
                <MdOutlineDeleteForever size={22} />
              </button>
            </Tooltip>
            <Tooltip text="Restore">
              <button
                onClick={() => restoreNote.mutate({ id: note.id })}
                className="rounded-full p-[8px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60"
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
                onFocus={() => setBtnFocused(true)}
                className="rounded-full p-[8px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60"
              >
                <BiBellPlus size={18} />
              </button>
            </Tooltip>
            {/* COLLABORATORS */}
            <Tooltip text="Collaborator">
              <button
                onFocus={() => setBtnFocused(true)}
                className="rounded-full p-[8px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60"
              >
                <HiOutlineUserPlus size={18} />
              </button>
            </Tooltip>
            {/* BACKGROUND OPTIONS */}
            <Popover.Root>
              <Tooltip text="Background options">
                <Popover.Trigger asChild>
                  <button
                    onFocus={() => setBtnFocused(true)}
                    className="rounded-full p-[8px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60"
                  >
                    <MdOutlineColorLens size={18} />
                  </button>
                </Popover.Trigger>
              </Tooltip>
              <Popover.Portal
                container={document.getElementsByTagName("main")[0]}
              >
                <Popover.Content sideOffset={-7}>
                  <div className="max-w-min rounded-md border border-black/10 bg-white shadow-md">
                    <ul className="flex items-center justify-between gap-1 border-b border-black/10 px-2 py-2">
                      <Tooltip text="No color">
                        <li className="relative">
                          <TbDropletOff
                            size={32}
                            className={`cursor-pointer rounded-full border-2 border-solid border-black/20 stroke-black/60 p-1 transition-all hover:border-black duration-200${
                              note.color === "default"
                                ? " border-fuchsia-500 hover:border-fuchsia-500"
                                : ""
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
                              }] cursor-pointer transition-all hover:stroke-black/80 duration-300${
                                note.color === color.color
                                  ? " stroke-fuchsia-500 hover:stroke-fuchsia-500"
                                  : ""
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
                            className={`cursor-pointer rounded-full border-2 border-solid border-black/20 p-[6px] hover:border-black fill-black/60${
                              note.background === "default"
                                ? " border-fuchsia-500 hover:border-fuchsia-500"
                                : ""
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
                              className={`cursor-pointer rounded-full object-cover object-center outline outline-2 -outline-offset-2 outline-transparent hover:outline-black${
                                note.background === bg.path
                                  ? " outline-fuchsia-500 hover:outline-fuchsia-500"
                                  : ""
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
              <button className="rounded-full p-[8px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60">
                <BiImageAdd size={18} />
              </button>
            </Tooltip>
            {/* ARCHIVE / UNARCHIVE */}
            <Tooltip
              text={note.status === "ARCHIVED" ? "Unarchive" : "Archive"}
            >
              <button
                onClick={
                  note.status === "ARCHIVED"
                    ? () => unarchiveNote.mutate({ id: note.id })
                    : () => archiveNote.mutate({ id: note.id })
                }
                className="rounded-full p-[8px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60"
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
                    onFocus={() => setBtnFocused(true)}
                    className="rounded-full p-[8px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60"
                  >
                    <MdMoreVert size={18} />
                  </button>
                </Popover.Trigger>
              </Tooltip>
              <Popover.Portal
                container={document.getElementsByTagName("main")[0]}
              >
                <Popover.Content sideOffset={-1} align="start">
                  <ul className="rounded-md border border-black/10 bg-white py-1 shadow-md">
                    <li className="flex items-center">
                      <button
                        onClick={() => trashNote.mutate({ id: note.id })}
                        className="h-full w-full px-4 py-2 text-sm text-black hover:bg-gray-100"
                      >
                        Delete note
                      </button>
                    </li>
                    <li className="flex items-center">
                      <button
                        onClick={() => console.log("Add label")}
                        className="h-full w-full px-4 py-2 text-sm text-black hover:bg-gray-100"
                      >
                        Add label
                      </button>
                    </li>
                    <li className="flex items-center">
                      <button
                        onClick={() => console.log("Add drawing")}
                        className="h-full w-full px-4 py-2 text-sm text-black hover:bg-gray-100"
                      >
                        Add drawing
                      </button>
                    </li>
                    <li className="flex items-center">
                      <button
                        onClick={() => copyNote.mutate({ ...note })}
                        className="h-full w-full px-4 py-2 text-sm text-black hover:bg-gray-100"
                      >
                        Make a copy
                      </button>
                    </li>
                    <li className="flex items-center">
                      <button
                        onClick={() => console.log("Show checkboxes")}
                        className="h-full w-full px-4 py-2 text-sm text-black hover:bg-gray-100"
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
    </li>
  );
};

export default ListNote;

const colorList = [
  { color: "#f28b82", name: "Red" },
  { color: "#fbbc04", name: "Orange" },
  { color: "#fff475", name: "Yellow" },
  { color: "#ccff90", name: "Green" },
  { color: "#a7ffeb", name: "Teal" },
  { color: "#cbf0f8", name: "Blue" },
  { color: "#aecbfa", name: "Dark blue" },
  { color: "#d7aefb", name: "Purple" },
  { color: "#fdcfe8", name: "Pink" },
  { color: "#e6c9a8", name: "Brown" },
  { color: "#e8eaed", name: "Gray" },
];

const bgList = [
  { path: "/images/svg/dragon-scales.svg", name: "Dragon scales" },
  { path: "/images/svg/flat-mountains.svg", name: "Mountains" },
  { path: "/images/svg/liquid-cheese.svg", name: "Liquid cheese" },
  { path: "/images/svg/quantum-gradient.svg", name: "Quantum" },
  { path: "/images/svg/radiant-gradient.svg", name: "Radiant" },
  { path: "/images/svg/slanted-gradient.svg", name: "Slanted" },
  { path: "/images/svg/spectrum-gradient.svg", name: "Spectrum" },
  { path: "/images/svg/subtle-prism.svg", name: "Subtle prism" },
  { path: "/images/svg/sun-tornado.svg", name: "Sun Tornado" },
];
