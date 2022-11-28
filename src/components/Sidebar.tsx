import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/router";
import { TiFlashOutline } from "react-icons/ti";
import { BiAlarm, BiArchiveIn, BiPlus } from "react-icons/bi";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import {
  MdOutlineClose,
  MdCheck,
  MdLabel,
  MdEdit,
  MdLabelOutline,
} from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import * as RadixLabel from "@radix-ui/react-label";
import Tooltip from "./Radix/Tooltip";
import { trpc } from "../utils/trpc";
import { type Label } from "@prisma/client";

export default function Sidebar({
  forceSidebarOpen,
}: {
  forceSidebarOpen: boolean;
}) {
  const { push, pathname, asPath } = useRouter();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const allLabels = trpc.label.all.useQuery(undefined, {
    staleTime: 3000,
    refetchOnWindowFocus: false,
    enabled: false,
    // onSuccess: (data) => {
    //   console.log("allLabels", data);
    // },
  });

  React.useEffect(() => {
    allLabels.refetch();
  }, []);

  return (
    <div
      className={`sidebar${sidebarOpen || forceSidebarOpen ? " open" : ""}`}
      onMouseOver={() => setSidebarOpen(true)}
      onMouseOut={() => setSidebarOpen(false)}
    >
      <div
        className={`sidebar-placeholder${forceSidebarOpen ? " open" : ""}`}
      />
      <div className="sidebar-inner bg-gray-50 dark:bg-gray-900">
        <div className="sidebar-menu">
          {/* Notes */}
          <button
            className={`${
              pathname === "/"
                ? "bg-fuchsia-500/10 text-fuchsia-600 hover:bg-fuchsia-500/10 dark:bg-fuchsia-500/20 dark:text-fuchsia-300 dark:hover:bg-fuchsia-500/20"
                : "text-black/60 hover:bg-black/10 dark:text-white/60 dark:hover:bg-white/10"
            } ease-[cubic-bezier(0.075, 0.82, 0.165, 1)] transition-all duration-300`}
            onClick={() => push("/")}
          >
            <TiFlashOutline />
            <span>Notes</span>
          </button>
          {/* Reminders */}
          <button
            className={`${
              pathname === "/reminders"
                ? "bg-fuchsia-500/10 text-fuchsia-600 hover:bg-fuchsia-500/10 dark:bg-fuchsia-500/20 dark:text-fuchsia-300 dark:hover:bg-fuchsia-500/20"
                : "text-black/60 hover:bg-black/10 dark:text-white/60 dark:hover:bg-white/10"
            } ease-[cubic-bezier(0.075, 0.82, 0.165, 1)] transition-all duration-300`}
            onClick={() => push("/reminders")}
          >
            <BiAlarm />
            <span>Reminders</span>
          </button>
          {/* Labels */}
          {allLabels.data?.map((label: Label) => (
            <button
              key={label.id}
              className={`${
                asPath === `/label/${label.id}`
                  ? "bg-fuchsia-500/10 text-fuchsia-600 hover:bg-fuchsia-500/10 dark:bg-fuchsia-500/20 dark:text-fuchsia-300 dark:hover:bg-fuchsia-500/20"
                  : "text-black/60 hover:bg-black/10 dark:text-white/60 dark:hover:bg-white/10"
              } ease-[cubic-bezier(0.075, 0.82, 0.165, 1)] transition-all duration-300`}
              onClick={() => push(`/label/${label.id}`)}
            >
              <MdLabelOutline />
              <span>{label.name}</span>
            </button>
          ))}
          {/* Edit Labels */}
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button
                className={`${
                  pathname === "/labels"
                    ? "bg-fuchsia-500/10 text-fuchsia-600 hover:bg-fuchsia-500/10 dark:bg-fuchsia-500/20 dark:text-fuchsia-300 dark:hover:bg-fuchsia-500/20"
                    : "text-black/60 hover:bg-black/10 dark:text-white/60 dark:hover:bg-white/10"
                } ease-[cubic-bezier(0.075, 0.82, 0.165, 1)] transition-all duration-300`}
              >
                <FiEdit3 />
                <span>Edit labels</span>
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-[102] bg-black/80" />
              <Dialog.Content className="fixed top-1/2 left-1/2 z-[9999] flex max-h-[85vh] min-h-fit w-[90vw] max-w-[300px] -translate-x-1/2 -translate-y-1/2 transform flex-col justify-between rounded-md border-black/20 bg-gray-50 shadow-md focus:outline-none dark:border-white/30 dark:bg-gray-900 md:max-h-[560px]">
                <div className="overflow-y-auto p-4">
                  <Dialog.Title className="text-lg font-medium">
                    Edit labels
                  </Dialog.Title>
                  <Dialog.Description asChild>
                    <div className="text-sm">
                      <CreateLabelInput />
                      {allLabels.data?.map((label) => (
                        <NoteLabelInput key={label.id} label={label} />
                      ))}
                    </div>
                  </Dialog.Description>
                </div>
                <div className="flex justify-end border-t border-black/20 p-4 dark:border-white/20">
                  <Dialog.Close asChild>
                    <button
                      className="h-9 rounded px-6 text-sm font-medium hover:bg-black/10 focus:bg-black/10 hover:dark:bg-white/10 dark:focus:bg-white/10"
                      type="button"
                    >
                      Done
                    </button>
                  </Dialog.Close>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          {/* Archive */}
          <button
            className={`${
              pathname === "/archive"
                ? "bg-fuchsia-500/10 text-fuchsia-600 hover:bg-fuchsia-500/10 dark:bg-fuchsia-500/20 dark:text-fuchsia-300 dark:hover:bg-fuchsia-500/20"
                : "text-black/60 hover:bg-black/10 dark:text-white/60 dark:hover:bg-white/10"
            } ease-[cubic-bezier(0.075, 0.82, 0.165, 1)] transition-all duration-300`}
            onClick={() => push("/archive")}
          >
            <BiArchiveIn />
            <span>Archive</span>
          </button>
          {/* Trash */}
          <button
            className={`${
              pathname === "/trash"
                ? "bg-fuchsia-500/10 text-fuchsia-600 hover:bg-fuchsia-500/10 dark:bg-fuchsia-500/20 dark:text-fuchsia-300 dark:hover:bg-fuchsia-500/20"
                : "text-black/60 hover:bg-black/10 dark:text-white/60 dark:hover:bg-white/10"
            } ease-[cubic-bezier(0.075, 0.82, 0.165, 1)] transition-all duration-300`}
            onClick={() => push("/trash")}
          >
            <FiTrash2 />
            <span>Trash</span>
          </button>
        </div>
        {/* Sidebar Bottom */}
        <div className="sidebar-bottom">
          <a
            href="https://github.com/juancamiloqhz"
            target="_blank"
            rel="noreferrer noopener"
          >
            Open-source licenses
          </a>
        </div>
      </div>
      <style global jsx>{`
        .sidebar {
        }
        .sidebar.open .sidebar-inner {
          width: 280px;
          box-shadow: 0 16px 10px 0 rgb(0 0 0 / 14%),
            0 11px 18px 0 rgb(0 0 0 / 12%), 0 13px 5px -1px rgb(0 0 0 / 20%);
        }
        .sidebar-inner {
          width: 80px;
          transition-property: width, box-shadow, border-radius;
          transition-duration: 150ms;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          position: fixed;
          top: 64px;
          padding-top: 8px;
          overflow-y: auto;
          overflow-x: hidden;
          min-height: auto;
          height: calc(100vh - 64px);
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          z-index: 99;
          font-size: 14px;
        }
        .sidebar-menu {
          flex: 1 0 auto;
        }
        .sidebar button {
          height: 48px;
          width: 48px;
          min-width: 48px;
          overflow: hidden;
          display: flex;
          align-items: center;
          font-weight: 500;
          border-radius: 50%;
          margin-left: 12px;
          padding: 0;
          transition-property: margin, width, padding, border-radius;
          transition-duration: 150ms;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          box-sizing: border-box;
          border: 1px solid transparent;
          outline: none;
        }
        .sidebar button svg {
          padding: 0 12px;
          flex-shrink: 0;
          width: 48px;
          height: 48px;
        }
        .sidebar button span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-left: 20px;
        }
        .sidebar.open button {
          width: 100%;
          display: flex;
          align-items: center;
          font-weight: 500;
          border-radius: 0 25px 25px 0;
          margin-left: 0;
          padding-left: 12px;
        }
        .sidebar-bottom {
          flex: 0 0 auto;
          margin-bottom: 12px px;
          margin-top: 20px;
          padding: 4px 0 6px 24px;
          visibility: hidden;
        }
        .sidebar-bottom a {
          color: #5f6368;
          cursor: pointer;
          font-size: 12px;
          padding: 2px 5px;
          text-decoration: none;
          white-space: nowrap;
        }
        .sidebar.open .sidebar-bottom {
          visibility: visible;
        }
        .sidebar-placeholder {
          width: 80px;
          transition-property: width, box-shadow, border-radius;
          transition-duration: 150ms;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (min-width: 768px) {
          .sidebar-placeholder.open {
            width: 280px;
          }
        }
      `}</style>
    </div>
  );
}

function CreateLabelInput() {
  const ref = React.useRef<HTMLInputElement>(null);
  const [name, setName] = React.useState("");
  const [state, setState] = React.useState({
    focused: false,
    create: false,
  });
  const utils = trpc.useContext();
  const addLabel = trpc.label.add.useMutation({
    async onMutate({ name, color }) {
      const allLabels = utils.label.all.getData();
      const newLabel = {
        id: `${Math.random()}`,
        name,
        color: color || null,
        userId: `${Math.random()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      utils.label.all.setData(undefined, [newLabel, ...(allLabels || [])]);

      setName("");
      // setContent("");
      // setBackground("default");
      // setNoteColor("default");
    },
    async onSuccess() {
      await utils.label.all.fetch();
    },
  });

  function handleCreateLabel(e: React.FormEvent) {
    e.preventDefault();
    if (name) {
      addLabel.mutate({ name });
    }
  }

  return (
    <div className="flex h-11 items-center">
      <Tooltip text={state.focused ? "Cancel" : "Create label"}>
        <button
          type="button"
          className="mr-2 rounded-full p-1 text-black/60 hover:bg-black/10 hover:text-black dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
          onClick={() => {
            setState((state) => {
              if (!state.focused) {
                ref.current?.focus();
              }
              return {
                focused: !state.focused,
                create: !state.focused,
              };
            });
          }}
        >
          {state.focused ? <MdOutlineClose size={20} /> : <BiPlus size={20} />}
        </button>
      </Tooltip>
      <form onSubmit={handleCreateLabel} className="flex items-center">
        <RadixLabel.Root htmlFor="label-name" className="hidden">
          Create new label
        </RadixLabel.Root>
        <input
          id="label-name"
          ref={ref}
          type="text"
          className="w-full border-b border-transparent bg-transparent font-semibold placeholder:text-black focus:border-b  focus:border-black/60 focus:outline-none dark:placeholder:text-white dark:focus:border-white/60"
          placeholder="Create new label"
          value={name}
          autoFocus
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setState(() => ({ create: true, focused: true }))}
        />
        <Tooltip text="Create label">
          <button
            type="submit"
            className={`ml-4 rounded-full p-1 text-black/60 hover:bg-black/10 hover:text-black dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white${
              state.create ? " visible" : " invisible"
            }`}
          >
            <MdCheck size={20} />
          </button>
        </Tooltip>
      </form>
    </div>
  );
}

function NoteLabelInput({ label }: { label: Label }) {
  const ref = React.useRef<HTMLInputElement>(null);
  const [focused, setFocused] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [name, setName] = React.useState(label.name);
  const utils = trpc.useContext();
  const deleteLabel = trpc.label.deleteOne.useMutation({
    async onMutate() {
      const allLabels = utils.label.all.getData();
      const allActiveNotes = utils.note.allActive.getData();
      const allArchivedNotes = utils.note.allArchived.getData();
      const allPinnedNotes = utils.note.allPinned.getData();
      const allTrashedNotes = utils.note.allTrashed.getData();
      if (allLabels) {
        utils.label.all.setData(
          undefined,
          allLabels.filter((t) => t.id != label.id)
        );
      }
      if (allActiveNotes) {
        utils.note.allActive.setData(
          undefined,
          allActiveNotes.map((note) => ({
            ...note,
            labels: note.labels.filter((t) => t.id != label.id),
          }))
        );
      }
      if (allArchivedNotes) {
        utils.note.allArchived.setData(
          undefined,
          allArchivedNotes.map((note) => ({
            ...note,
            labels: note.labels.filter((t) => t.id != label.id),
          }))
        );
      }
      if (allPinnedNotes) {
        utils.note.allPinned.setData(
          undefined,
          allPinnedNotes.map((note) => ({
            ...note,
            labels: note.labels.filter((t) => t.id != label.id),
          }))
        );
      }
      if (allTrashedNotes) {
        utils.note.allTrashed.setData(
          undefined,
          allTrashedNotes.map((note) => ({
            ...note,
            labels: note.labels.filter((t) => t.id != label.id),
          }))
        );
      }
    },
    // async onSuccess() {
    //   await utils.label.all.fetch();
    // },
  });
  const editLabel = trpc.label.edit.useMutation({
    async onMutate({ name, color }) {
      const allLabels = utils.label.all.getData();
      const allActiveNotes = utils.note.allActive.getData();
      const allArchivedNotes = utils.note.allArchived.getData();
      const allPinnedNotes = utils.note.allPinned.getData();
      const allTrashedNotes = utils.note.allTrashed.getData();
      const editedLabel = {
        name: name || label.name,
        color: color || null,
      };
      if (allLabels) {
        utils.label.all.setData(
          undefined,
          allLabels.map((t) =>
            t.id === label.id ? { ...t, ...editedLabel } : t
          )
        );
      }
      if (allActiveNotes) {
        utils.note.allActive.setData(
          undefined,
          allActiveNotes.map((note) => ({
            ...note,
            labels: note.labels.map((t) =>
              t.id === label.id ? { ...t, ...editedLabel } : t
            ),
          }))
        );
      }
      if (allArchivedNotes) {
        utils.note.allArchived.setData(
          undefined,
          allArchivedNotes.map((note) => ({
            ...note,
            labels: note.labels.map((t) =>
              t.id === label.id ? { ...t, ...editedLabel } : t
            ),
          }))
        );
      }
      if (allPinnedNotes) {
        utils.note.allPinned.setData(
          undefined,
          allPinnedNotes.map((note) => ({
            ...note,
            labels: note.labels.map((t) =>
              t.id === label.id ? { ...t, ...editedLabel } : t
            ),
          }))
        );
      }
      if (allTrashedNotes) {
        utils.note.allTrashed.setData(
          undefined,
          allTrashedNotes.map((note) => ({
            ...note,
            labels: note.labels.map((t) =>
              t.id === label.id ? { ...t, ...editedLabel } : t
            ),
          }))
        );
      }
    },
    async onSuccess() {
      await utils.label.all.fetch();
    },
  });

  function handleEditLabel(e: React.FormEvent) {
    e.preventDefault();
    if (name && name !== label.name) {
      editLabel.mutate({ id: label.id, name });
      ref.current?.blur();
    }
  }

  return (
    <div
      className="flex h-11 items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Delete Dialog Modal */}
      <Dialog.Root>
        <Tooltip text="Delete label">
          <Dialog.Trigger asChild>
            <button
              type="button"
              className="mr-2 rounded-full p-1 text-black/60 hover:bg-black/10 hover:text-black dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {hovered || focused ? (
                <IoMdTrash size={18} />
              ) : (
                <MdLabel size={18} />
              )}
            </button>
          </Dialog.Trigger>
        </Tooltip>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[9999] bg-black/80" />
          <Dialog.Content className="fixed top-1/2 left-1/2 z-[9999] flex max-h-[85vh] min-h-[120px] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 transform flex-col justify-between rounded-md border-black/20 bg-gray-50 p-6 pb-4 shadow-md focus:outline-none dark:border-white/30 dark:bg-gray-900">
            <Dialog.Title className="text-sm ">
              We’ll delete this label and remove it from all of your UpKeep
              notes. Your notes won’t be deleted.
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
                  onClick={() => deleteLabel.mutate({ id: label.id })}
                  type="button"
                >
                  Delete
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <form onSubmit={handleEditLabel}>
        <RadixLabel.Root htmlFor="label-name" className="hidden">
          Edit label
        </RadixLabel.Root>
        <input
          ref={ref}
          type="text"
          className="w-full border-b border-transparent bg-transparent font-semibold placeholder:text-black focus:border-b  focus:border-black focus:outline-none dark:placeholder:text-white dark:focus:border-white"
          placeholder="Enter label name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setFocused(true)}
          // onBlur={() => setFocused(false)}
        />
      </form>
      <Tooltip text="Rename label">
        <button
          type="button"
          className={`ml-4 rounded-full p-1 text-black/60 hover:bg-black/10 hover:text-black dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white`}
          onClick={() => {
            if (!focused) {
              setFocused(true);
              ref.current?.focus();
            } else {
              if (name && name !== label.name) {
                editLabel.mutate({ id: label.id, name });
              }
              setFocused(false);
            }
          }}
        >
          {focused ? <MdCheck size={20} /> : <MdEdit size={20} />}
        </button>
      </Tooltip>
    </div>
  );
}
