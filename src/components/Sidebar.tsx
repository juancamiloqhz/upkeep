import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/router";
import { TiFlashOutline } from "react-icons/ti";
import { BiAlarm, BiArchiveIn, BiPlus } from "react-icons/bi";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { MdOutlineClose, MdCheck, MdLabel, MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import Tooltip from "./Radix/Tooltip";

export default function Sidebar({
  forceSidebarOpen,
}: {
  forceSidebarOpen: boolean;
}) {
  const { push, pathname } = useRouter();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  return (
    <div
      className={`sidebar${sidebarOpen || forceSidebarOpen ? " open" : ""}`}
      onMouseOver={() => setSidebarOpen(true)}
      onMouseOut={() => setSidebarOpen(false)}
    >
      <div
        className={`sidebar-placeholder${forceSidebarOpen ? " open" : ""}`}
      ></div>
      <div className="sidebar-inner bg-gray-50 dark:bg-gray-900">
        <div className="sidebar-menu">
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
                    <form
                      action=""
                      onSubmit={(e) => e.preventDefault()}
                      className="text-sm"
                    >
                      <CreateLabelInput />
                      <NoteLabelInput label="a" />
                      <NoteLabelInput label="b" />
                      <NoteLabelInput label="c" />
                      <NoteLabelInput label="d" />
                      <NoteLabelInput label="e" />
                      <NoteLabelInput label="f" />
                      <NoteLabelInput label="g" />
                      <NoteLabelInput label="h" />
                      <NoteLabelInput label="i" />
                      <NoteLabelInput label="j" />
                      <NoteLabelInput label="k" />
                      <NoteLabelInput label="l" />
                      <NoteLabelInput label="m" />
                      <NoteLabelInput label="n" />
                      <NoteLabelInput label="o" />
                      <NoteLabelInput label="p" />
                    </form>
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
          overflow: hidden;
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
  const [text, setText] = React.useState("");
  const [state, setState] = React.useState({
    focused: false,
    create: false,
  });

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
      <input
        ref={ref}
        type="text"
        className="w-full border-b border-transparent bg-transparent font-semibold placeholder:text-black focus:border-b  focus:border-black/60 focus:outline-none dark:placeholder:text-white dark:focus:border-white/60"
        placeholder="Create new label"
        value={text}
        autoFocus
        onChange={(e) => setText(e.target.value)}
        onFocus={() => setState(() => ({ create: true, focused: true }))}
      />
      <Tooltip text="Create label">
        <button
          type="button"
          className={`ml-4 rounded-full p-1 text-black/60 hover:bg-black/10 hover:text-black dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white${
            state.create ? " visible" : " invisible"
          }`}
          onClick={() => {
            if (text) {
              setText("");
            }
          }}
        >
          <MdCheck size={20} />
        </button>
      </Tooltip>
    </div>
  );
}

function NoteLabelInput({ label }: { label: string }) {
  const ref = React.useRef<HTMLInputElement>(null);
  const [focused, setFocused] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [text, setText] = React.useState(label);

  return (
    <div
      className="flex h-11 items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Tooltip text="Delete label">
        <button
          type="button"
          className="mr-2 rounded-full p-1 text-black/60 hover:bg-black/10 hover:text-black dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
          onClick={() => console.log("deleting label")}
        >
          {hovered || focused ? <IoMdTrash size={18} /> : <MdLabel size={18} />}
        </button>
      </Tooltip>
      <input
        ref={ref}
        type="text"
        className="w-full border-b border-transparent bg-transparent font-semibold placeholder:text-black focus:border-b  focus:border-black focus:outline-none dark:placeholder:text-white dark:focus:border-white"
        placeholder="Enter label name"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <Tooltip text="Rename label">
        <button
          type="button"
          className={`ml-4 rounded-full p-1 text-black/60 hover:bg-black/10 hover:text-black dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white`}
          onClick={() => {
            if (!focused) {
              ref.current?.focus();
            } else {
              if (text !== label) {
                console.log("renaming label");
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
