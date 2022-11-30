import React from "react";
import { useClickOutside } from "../../utils/helpers";
import Image from "next/image";
import { type Label, type Note } from "@prisma/client";
import Tooltip from "../Radix/Tooltip";
import { trpc } from "../../utils/trpc";
import { bgList, colorList } from "../../utils/constants";
import * as Popover from "@radix-ui/react-popover";
import * as RadixLabel from "@radix-ui/react-label";
import { useRouter } from "next/router";
import {
  ArchiveIcon,
  BellPlusIcon,
  CheckSquareIcon,
  CloseIcon,
  DropletOffIcon,
  ImageAddIcon,
  MoreVerticalIcon,
  OutlineColorPaletteIcon,
  OutlineDoneIcon,
  OutlineHideImageIcon,
  OutlineUserPlusIcon,
  PaintBrushIcon,
  PinIcon,
  PinOutlineIcon,
  RedoIcon,
  UnarchiveIcon,
  UndoIcon,
} from "../Icons";

export default function CreateNote() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const router = useRouter();
  const utils = trpc.useContext();

  const [formFocused, setFormFocused] = React.useState(false);
  const [currentLabel, setCurrentLabel] = React.useState<Label | undefined>(
    undefined
  );
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [background, setBackground] = React.useState<string | undefined>(
    undefined
  );
  const [noteColor, setNoteColor] = React.useState<string | undefined>(
    undefined
  );
  const [status, setStatus] = React.useState<Note["status"]>("ACTIVE");
  // Note created if user uploads an image. Create the note and then upload the image
  const [newNote, setNewNote] = React.useState<Note | undefined>(undefined);
  const [firstImage, setFirstImage] = React.useState<File | undefined>(
    undefined
  );

  const addNote = trpc.note.add.useMutation({
    async onMutate({ title, content, background, color, status }) {
      // console.log("onMutate", res);
      // await utils.note.allActive.cancel();
      // await utils.note.allPinned.cancel();
      // await utils.note.allTrashed.cancel();
      // await utils.note.allArchived.cancel();
      const allActiveNotes = utils.note.allActive.getData();
      const allPinnedNotes = utils.note.allPinned.getData();
      const newNoteStatus: Note["status"] = status;
      const newNote = {
        id: `${Math.random()}`,
        title: title || null,
        content: content || null,
        background: background || null,
        color: color || null,
        status: newNoteStatus,
        authorId: `${Math.random()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        labels: [],
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
      // setBackground("default");
      // setNoteColor("default");
    },
    async onSuccess({ status }) {
      switch (status) {
        case "ACTIVE":
          await utils.note.allActive.fetch();
          break;
        case "PINNED":
          await utils.note.allPinned.fetch();
          break;
        default:
          break;
      }
    },
  });

  const addNoteWithFirstImage = trpc.note.add.useMutation();

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
      setBackground(undefined);
      setNoteColor(undefined);
      setStatus("ACTIVE");
    },
  });

  const formStyles = React.useMemo(
    () => ({
      ...(noteColor && !background ? { backgroundColor: noteColor } : {}),
      ...(background && !noteColor
        ? {
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }
        : {}),
      ...(noteColor && background
        ? {
            backgroundColor: noteColor,
            borderColor: noteColor,
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }
        : {}),
    }),
    [noteColor, background]
  );

  React.useEffect(() => {
    if (router.pathname === "/label/[id]") {
      const labels = utils.label.all.getData();
      if (labels) {
        setCurrentLabel(labels.find((label) => label.id === router.query.id));
      }
    }
  }, [router.query?.id, router.pathname]);
  return (
    <form
      ref={formRef}
      className="bg-grey-40 relative mx-auto mb-16 mt-6 flex max-w-xl flex-col rounded-xl border border-black/10 shadow-md dark:border-white/20 dark:bg-gray-900 dark:shadow-black"
      onSubmit={(e) => e.preventDefault()}
      onFocus={() => setFormFocused(true)}
      style={formStyles}
    >
      <RadixLabel.Root htmlFor="title" className="hidden">
        Note title
      </RadixLabel.Root>
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
      <RadixLabel.Root htmlFor="content" className="hidden">
        Note content
      </RadixLabel.Root>
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
          {currentLabel ? (
            <div className="px-4 py-2">
              <div
                key={currentLabel.id}
                className="group/label relative flex h-6 w-fit cursor-pointer items-center justify-between whitespace-nowrap rounded-full bg-black/10 px-3 text-xs font-medium leading-none dark:bg-white/10"
                onClick={(e) => {
                  e.stopPropagation();
                  // router.push(`/label/${label.id}`);
                }}
              >
                {currentLabel.name}
                <Tooltip text={"Remove label"}>
                  <button
                    className="absolute right-0 top-1/2 ml-1 hidden h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-black/60 group-hover/label:flex group-hover/label:bg-gray-700 group-hover/label:text-white dark:text-white/60 dark:group-hover/label:bg-gray-300 dark:group-hover/label:text-black"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentLabel(undefined);
                      // disconnectFromNote.mutate({ noteId: note.id, id: label.id });
                    }}
                  >
                    <CloseIcon size={10} />
                  </button>
                </Tooltip>
              </div>
            </div>
          ) : null}
          <div
            className={`flex flex-col justify-between rounded-b-xl bg-gray-50 px-2 py-1 dark:bg-gray-900 sm:flex-row sm:items-center`}
            style={{
              backgroundColor: noteColor || "transparent",
            }}
          >
            <div className="flex items-center justify-between sm:justify-start sm:gap-4">
              {/* REMINDER */}
              <Tooltip text="Reminder">
                <button
                  type="button"
                  className="rounded-full p-[8px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white dark:focus:ring-white/60"
                >
                  <BellPlusIcon size={18} />
                </button>
              </Tooltip>
              {/* COLLABORATORS */}
              <Tooltip text="Collaborator">
                <button
                  type="button"
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
                      className="rounded-full p-[8px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white dark:focus:ring-white/60"
                    >
                      <OutlineColorPaletteIcon size={18} />
                    </button>
                  </Popover.Trigger>
                </Tooltip>

                <Popover.Content sideOffset={-7} className="z-10">
                  <div className="max-w-min rounded-md border border-black/10 bg-gray-50 shadow-md dark:border-white/10 dark:bg-gray-900">
                    <ul className="flex items-center justify-between gap-1 border-b border-black/10 px-2 py-2">
                      <Tooltip text="No color">
                        <li className="relative">
                          <DropletOffIcon
                            size={32}
                            className={`cursor-pointer rounded-full border-2 border-solid stroke-black/60 p-1 transition-all dark:stroke-white/60 duration-200${
                              !noteColor
                                ? " border-fuchsia-500 hover:border-fuchsia-500"
                                : " border-black/20 hover:border-black dark:border-white/20 dark:hover:border-white"
                            }`}
                            onClick={() => setNoteColor(undefined)}
                          />
                          {!noteColor ? (
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
                              !background
                                ? " border-fuchsia-500 hover:border-fuchsia-500"
                                : " border-black/20 hover:border-black dark:border-white/20 dark:hover:border-white"
                            }`}
                            onClick={() => setBackground("default")}
                          />
                          {!background ? (
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
                                background === bg.path
                                  ? " outline-fuchsia-500 hover:outline-fuchsia-500"
                                  : " outline-transparent hover:outline-black dark:hover:outline-white"
                              }`}
                              onClick={() => setBackground(bg.path)}
                            />
                            {background === bg.path ? (
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
                    <UnarchiveIcon size={18} />
                  ) : (
                    <ArchiveIcon size={18} />
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
                      <MoreVerticalIcon size={18} />
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
                  <UndoIcon size={18} />
                </button>
              </Tooltip>
              <Tooltip text="Redo">
                <button
                  type="button"
                  className="rounded-full p-[8px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white dark:focus:ring-white/60"
                >
                  <RedoIcon size={18} />
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
        <div className="absolute top-1/2 right-0 flex -translate-y-1/2 md:right-4 md:gap-2">
          <Tooltip text="New list">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full text-black/30 hover:bg-black/10 hover:text-black dark:text-white/30 dark:hover:bg-white/20 dark:hover:text-white"
              onClick={() => setFormFocused(true)}
            >
              <CheckSquareIcon className="h-6 w-6" />
            </button>
          </Tooltip>
          <Tooltip text="New note with drawing">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full text-black/30 hover:bg-black/10 hover:text-black dark:text-white/30 dark:hover:bg-white/20 dark:hover:text-white"
              onClick={() => setFormFocused(true)}
            >
              <PaintBrushIcon className="h-6 w-6" />
            </button>
          </Tooltip>

          <Tooltip text="New note with image">
            <RadixLabel.Root
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-black/30 hover:bg-black/10 hover:text-black dark:text-white/30 dark:hover:bg-white/20 dark:hover:text-white"
              htmlFor="upload"
            >
              <ImageAddIcon className="h-6 w-6" />
            </RadixLabel.Root>
          </Tooltip>
          <input
            id="upload"
            type="file"
            accept={validImageTypes}
            className="hidden"
            onChange={async (e) => {
              setFormFocused(true);
              // uploadPhoto(e);
              const files = e.target.files;
              const file = files ? files[0] : false;
              if (!file) {
                console.error("Please select a file before clicking 'Upload'");
                return null;
              }

              // Validate file type
              if (!file.type || validImageTypes.indexOf(file.type) === -1) {
                console.error(
                  "Please select a valid image format: GIF, JPG, PNG o WEBP."
                );
                return null;
              }

              // Validate file size (20MB)
              if (file.size > 20 * 1024 * 1024) {
                console.error("Max file size allowed is 20MB.");
                return null;
              }
              // setFirstImage(file);
              try {
                const noteRes = await addNoteWithFirstImage.mutateAsync({
                  background,
                  color: noteColor,
                  status,
                });
                console.log(noteRes);
                const imageRes = await handleUploadImage(file, noteRes.id);
                console.log(imageRes);
              } catch (error) {
                console.log(error);
              }
            }}
          />
        </div>
      ) : null}
      {addNote.error ? <p>{addNote.error.message}</p> : null}
    </form>
  );
}

const validImageTypes =
  "image/gif, image/jpeg, image/jpg, image/png, image/webp, image/avif, image/heic, image/heif";

async function handleUploadImage(file: File, noteId: string) {
  const filename = encodeURIComponent(file.name);
  const fileType = encodeURIComponent(file.type);

  const formData = new FormData();
  formData.append("image", file);

  console.dir(file, { depth: null });
  console.dir(filename, { depth: null });
  console.dir(fileType, { depth: null });
  console.dir(formData, { depth: null });

  return await fetch(`/api/note/upload/${noteId}`, {
    method: "POST",
    body: formData,
  });

  // if (upload.ok) {
  //   console.log("Uploaded successfully!");
  // } else {
  //   console.error("Upload failed.");
  // }

  // return null;
}
