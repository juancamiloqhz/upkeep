import React from "react";
import { useClickOutside } from "../../utils/helpers";
import { trpc } from "../../utils/trpc";
import Image from "next/image";
import Tooltip from "../Radix/Tooltip";
import { bgList, colorList } from "../../utils/constants";
import * as Popover from "@radix-ui/react-popover";
import * as Label from "@radix-ui/react-label";
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
  BiCheckSquare,
  BiPaint,
  BiUndo,
  BiRedo,
} from "react-icons/bi";
import { TbDropletOff } from "react-icons/tb";
import { type Note } from "../../types/upkeep";

export default function CreateNote() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [formFocused, setFormFocused] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [background, setBackground] = React.useState("default");
  const [noteColor, setNoteColor] = React.useState("default");
  const [status, setStatus] = React.useState<Note["status"]>("ACTIVE");
  const utils = trpc.useContext();
  const addNote = trpc.note.add.useMutation({
    async onMutate({ title, content, background, color, status }) {
      // console.log("onMutate", res);
      await utils.note.allActive.cancel();
      await utils.note.allPinned.cancel();
      await utils.note.allTrashed.cancel();
      await utils.note.allArchived.cancel();
      const allActiveNotes = utils.note.allActive.getData();
      const allPinnedNotes = utils.note.allPinned.getData();
      const newNoteStatus: Note["status"] = status;
      const newNote = {
        id: `${Math.random()}`,
        title: title || "",
        content: content || "",
        background: background || "default",
        color: color || "default",
        status: newNoteStatus,
        authorId: `${Math.random()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      switch (status) {
        case "ACTIVE":
          utils.note.allActive.setData(undefined, [
            newNote,
            ...(allActiveNotes || []),
          ]);
          break;
        case "PINNED":
          utils.note.allPinned.setData(undefined, [
            newNote,
            ...(allPinnedNotes || []),
          ]);
          break;
        default:
          break;
      }
      setTitle("");
      setContent("");
      setBackground("default");
      setNoteColor("default");
    },
  });
  // function createNote(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   if (title || content) {
  //     addNote.mutate({
  //       title,
  //       content,
  //       background,
  //       color: noteColor,
  //     });
  //   }
  // }

  useClickOutside({
    ref: formRef,
    enabled: formFocused,
    callback() {
      if (title || content) {
        addNote.mutate({
          title,
          content,
          background,
          color: noteColor,
          status,
        });
      }
      setFormFocused(false);
      setBackground("default");
      setNoteColor("default");
      setStatus("ACTIVE");
    },
  });

  const formStyles = {
    ...(noteColor !== "default" && background === "default"
      ? { backgroundColor: noteColor }
      : {}),
    ...(background !== "default" && noteColor === "default"
      ? {
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }
      : {}),
    ...(noteColor !== "default" && background !== "default"
      ? {
          backgroundColor: noteColor,
          borderColor: noteColor,
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }
      : {}),
  };
  return (
    <form
      ref={formRef}
      className="bg-grey-40 relative mx-auto mb-16 mt-6 flex max-w-xl flex-col rounded-xl border border-black/10 shadow-lg dark:border-white/20 dark:bg-gray-900"
      onSubmit={(e) => e.preventDefault()}
      action=""
      onFocus={() => setFormFocused(true)}
      style={formStyles}
    >
      <Label.Root htmlFor="title" className="hidden">
        Note title
      </Label.Root>
      <input
        type="text"
        name="title"
        id="title"
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.currentTarget.value)}
        className={`rounded-t-xl px-4 py-3 placeholder:font-medium placeholder:text-black/70 focus-visible:outline-none dark:placeholder:text-white/70 bg-transparent${
          !formFocused ? " hidden" : ""
        }`}
      />
      <Label.Root htmlFor="content" className="hidden">
        Note content
      </Label.Root>
      <textarea
        name="content"
        id="content"
        placeholder="Take a note..."
        cols={30}
        rows={formFocused ? 2 : 1}
        value={content}
        onChange={(e) => setContent(e.currentTarget.value)}
        className={`resize-none px-4 placeholder:text-sm placeholder:font-medium focus-visible:outline-none bg-transparent${
          !formFocused
            ? " h-11 rounded-xl placeholder:leading-[44px] placeholder:text-black dark:placeholder:text-white"
            : " py-3 placeholder:text-black/70 dark:placeholder:text-white/70"
        }`}
      />
      {/* <div className="h-9 px-3" contentEditable placeholder="Take a note"></div> */}
      {/* Actions Bar */}
      {formFocused ? (
        <>
          <Tooltip text={status === "PINNED" ? "Unpin note" : "Pin note"}>
            <button
              className={`group/btn absolute top-1 right-1 flex items-center justify-center rounded-full p-[0.4rem] transition-all duration-300 ease-in hover:bg-black/10 group-hover/li:visible group-hover/li:opacity-100 dark:hover:bg-white/20`}
              onClick={() =>
                setStatus(status === "PINNED" ? "ACTIVE" : "PINNED")
              }
            >
              {status === "PINNED" ? (
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
          <div
            className={`flex flex-col justify-between rounded-b-xl bg-gray-50 px-2 py-1 dark:bg-gray-900 sm:flex-row sm:items-center`}
            style={{
              backgroundColor: noteColor !== "default" ? noteColor : "",
            }}
          >
            <div className="flex items-center justify-between sm:justify-start sm:gap-4">
              {/* REMINDER */}
              <Tooltip text="Reminder">
                <button
                  type="button"
                  className="rounded-full p-[8px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white dark:focus:ring-white/60"
                >
                  <BiBellPlus size={18} />
                </button>
              </Tooltip>
              {/* COLLABORATORS */}
              <Tooltip text="Collaborator">
                <button
                  type="button"
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
                      className="rounded-full p-[8px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white dark:focus:ring-white/60"
                    >
                      <MdOutlineColorLens size={18} />
                    </button>
                  </Popover.Trigger>
                </Tooltip>

                <Popover.Content sideOffset={-7} className="z-10">
                  <div className="max-w-min rounded-md border border-black/10 bg-gray-50 shadow-md dark:border-white/10 dark:bg-gray-900">
                    <ul className="flex items-center justify-between gap-1 border-b border-black/10 px-2 py-2">
                      <Tooltip text="No color">
                        <li className="relative">
                          <TbDropletOff
                            size={32}
                            className={`cursor-pointer rounded-full border-2 border-solid stroke-black/60 p-1 transition-all dark:stroke-white/60 duration-200${
                              noteColor === "default"
                                ? " border-fuchsia-500 hover:border-fuchsia-500"
                                : " border-black/20 hover:border-black dark:border-white/20 dark:hover:border-white"
                            }`}
                            onClick={() => setNoteColor("default")}
                          />
                          {noteColor === "default" ? (
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
                                noteColor === color.color
                                  ? " stroke-fuchsia-500 hover:stroke-fuchsia-500"
                                  : " hover:stroke-black/80 dark:hover:stroke-white/80"
                              }`}
                              onClick={() => setNoteColor(color.color)}
                            >
                              <circle
                                cx="16"
                                cy="16"
                                r="16"
                                fill={color.color}
                              />
                            </svg>
                            {noteColor === color.color ? (
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
                              background === "default"
                                ? " border-fuchsia-500 hover:border-fuchsia-500"
                                : " border-black/20 hover:border-black dark:border-white/20 dark:hover:border-white"
                            }`}
                            onClick={() => setBackground("default")}
                          />
                          {background === "default" ? (
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
                                background === bg.path
                                  ? " outline-fuchsia-500 hover:outline-fuchsia-500"
                                  : " outline-transparent hover:outline-black dark:hover:outline-white"
                              }`}
                              onClick={() => setBackground(bg.path)}
                            />
                            {background === bg.path ? (
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
              <Tooltip text={status === "ARCHIVED" ? "Unarchive" : "Archive"}>
                <button
                  type="button"
                  // onClick={
                  //   status === "ARCHIVED"
                  //     ? () => unarchiveNote.mutate({ id: note.id })
                  //     : () => archiveNote.mutate({ id: note.id })
                  // }
                  className="rounded-full p-[8px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white dark:focus:ring-white/60"
                >
                  {status === "ARCHIVED" ? (
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
                      // onFocus={() => setBtnFocused(true)}
                      className="rounded-full p-[8px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white dark:focus:ring-white/60"
                    >
                      <MdMoreVert size={18} />
                    </button>
                  </Popover.Trigger>
                </Tooltip>

                <Popover.Content sideOffset={-1} align="start" className="z-10">
                  <ul className="rounded-md border border-solid border-black/10 bg-gray-50 py-1 shadow-md dark:border-white/10 dark:bg-gray-900">
                    <li className="flex items-center">
                      <button
                        type="button"
                        onClick={() => console.log("Add label")}
                        className="h-full w-full px-4 py-2 text-sm text-black hover:bg-black/10 dark:text-white dark:hover:bg-white/10"
                      >
                        Add label
                      </button>
                    </li>
                    <li className="flex items-center">
                      <button
                        type="button"
                        onClick={() => console.log("Add drawing")}
                        className="h-full w-full px-4 py-2 text-sm text-black hover:bg-black/10 dark:text-white dark:hover:bg-white/10"
                      >
                        Add drawing
                      </button>
                    </li>
                    <li className="flex items-center">
                      <button
                        type="button"
                        onClick={() => console.log("Show checkboxes")}
                        className="h-full w-full px-4 py-2 text-sm text-black hover:bg-black/10 dark:text-white dark:hover:bg-white/10"
                      >
                        Show checkboxes
                      </button>
                    </li>
                  </ul>
                </Popover.Content>
              </Popover.Root>
              <Tooltip text="Undo">
                <button
                  type="button"
                  className="rounded-full p-[8px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white dark:focus:ring-white/60"
                >
                  <BiUndo size={18} />
                </button>
              </Tooltip>
              <Tooltip text="Redo">
                <button
                  type="button"
                  className="rounded-full p-[8px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white dark:focus:ring-white/60"
                >
                  <BiRedo size={18} />
                </button>
              </Tooltip>
            </div>
            <button
              className="h-8 self-end rounded px-6 text-sm font-medium hover:bg-black/10 dark:hover:bg-white/10"
              type="button"
              onClick={() => {
                setNoteColor("default");
                setBackground("default");
                setStatus("ACTIVE");
                setFormFocused(false);
              }}
            >
              Close
            </button>
          </div>
        </>
      ) : null}

      {/* Action Buttons */}
      {!formFocused ? (
        <div className="absolute top-1/2 right-0 flex -translate-y-1/2">
          <Tooltip text="New list">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full text-black/30 hover:bg-black/10 hover:text-black/50 dark:text-white/30 dark:hover:bg-white/20 dark:hover:text-white/50"
              onClick={() => setFormFocused(true)}
            >
              <BiCheckSquare className="h-6 w-6" />
            </button>
          </Tooltip>
          <Tooltip text="New note with drawing">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full text-black/30 hover:bg-black/10 hover:text-black/50 dark:text-white/30 dark:hover:bg-white/20 dark:hover:text-white/50"
              onClick={() => setFormFocused(true)}
            >
              <BiPaint className="h-6 w-6" />
            </button>
          </Tooltip>
          <Tooltip text="New note with image">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full text-black/30 hover:bg-black/10 hover:text-black/50 dark:text-white/30 dark:hover:bg-white/20 dark:hover:text-white/50"
              onClick={() => setFormFocused(true)}
            >
              <BiImageAdd className="h-6 w-6" />
            </button>
          </Tooltip>
        </div>
      ) : null}
      {addNote.error ? <p>{addNote.error.message}</p> : null}
    </form>
  );
}
