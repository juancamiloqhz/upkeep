import React from "react";
import { type IconType } from "react-icons";
import { useRouter } from "next/router";
import { TiFlashOutline } from "react-icons/ti";
import { BiAlarm, BiArchiveIn } from "react-icons/bi";
import { FiEdit3, FiTrash2 } from "react-icons/fi";

const sidebarButtonList = [
  { icon: TiFlashOutline, title: "Notes", paths: ["/#home", "/"] },
  { icon: BiAlarm, title: "Reminders", paths: ["/#reminders"] },
  { icon: FiEdit3, title: "Edit labels", paths: ["/#labels"] },
  { icon: BiArchiveIn, title: "Archive", paths: ["/#archive"] },
  { icon: FiTrash2, title: "Trash", paths: ["/#trash"] },
];

export default function Sidebar({
  forceSidebarOpen,
}: {
  forceSidebarOpen: boolean;
}) {
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
          {sidebarButtonList.map((button) => (
            <SidebarBtn
              key={button.title}
              text={button.title}
              Icon={button.icon}
              paths={button.paths}
            />
          ))}
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

function SidebarBtn({
  Icon,
  text,
  paths,
}: {
  Icon: IconType;
  text: string;
  paths: string[];
}) {
  const { asPath, push } = useRouter();
  return (
    <button
      className={`${
        paths.includes(asPath)
          ? "bg-fuchsia-500/10 text-fuchsia-600 hover:bg-fuchsia-500/10 dark:bg-fuchsia-500/20 dark:text-fuchsia-300 dark:hover:bg-fuchsia-500/20"
          : "text-black/60 hover:bg-black/10 dark:text-white/60 dark:hover:bg-white/10"
      } ease-[cubic-bezier(0.075, 0.82, 0.165, 1)] transition-all duration-300`}
      onClick={() => push(paths[0] as string)}
    >
      <Icon />
      <span>{text}</span>
    </button>
  );
}
