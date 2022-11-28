import React from "react";
import { signOut, useSession } from "next-auth/react";
import * as Popover from "@radix-ui/react-popover";
import * as Dialog from "@radix-ui/react-dialog";
import * as Label from "@radix-ui/react-label";
import * as Checkbox from "@radix-ui/react-checkbox";
import Link from "next/link";
import { SlMenu } from "react-icons/sl";
import {
  MdOutlineCloudDone,
  MdAccountCircle,
  MdOutlineSettings,
  MdCheck,
  MdSearch,
} from "react-icons/md";
import { TfiViewGrid, TfiViewList } from "react-icons/tfi";
import LoadingSpinner from "./LoadingSpinner";
import Image from "next/image";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import Tooltip from "./Radix/Tooltip";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import KeyboardShortcutsModal from "./Note/KeyboardShortcutsModal";
import { trpc } from "../utils/trpc";

export default function Header({
  setForceSidebarOpen,
}: {
  setForceSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [hasScroll, setHasScroll] = React.useState(false);
  const { data: sessionData } = useSession();
  const router = useRouter();
  const mutatingNumber = useIsMutating();
  const fetchingNumber = useIsFetching();
  const utils = trpc.useContext();

  React.useEffect(() => {
    if (mutatingNumber > 0 || fetchingNumber > 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [mutatingNumber, fetchingNumber]);

  // user has scrolled down
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 10) {
        setHasScroll(true);
      } else {
        setHasScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const labelName = React.useMemo(() => {
    if (router.pathname === "/label/[id]") {
      const labels = utils.label.all.getData();
      if (labels) {
        const label = labels.find((label) => label.id === router.query.id);
        return label?.name;
      } else {
        return "";
      }
    } else {
      return "";
    }
  }, [router.query?.id, router.pathname]);

  return (
    <header
      className={`fixed top-0 z-[101] grid h-16 w-full grid-cols-[auto_auto] items-center gap-6 bg-gray-50 px-4 transition-shadow dark:bg-gray-900 md:grid-cols-[minmax(160px,_220px)_minmax(300px,_600px)_1fr] ${
        hasScroll
          ? "shadow-md dark:shadow-black"
          : "border-b border-black/10 dark:border-white/10"
      }`}
    >
      <div className="flex items-center gap-2">
        <Tooltip text="Main menu">
          <button
            className={`rounded-full p-3 hover:bg-black/10 focus:bg-black/10 dark:hover:bg-white/10 dark:focus:bg-white/10`}
            onClick={() => setForceSidebarOpen((d) => !d)}
          >
            <SlMenu size={18} />
          </button>
        </Tooltip>
        {router.pathname === "/" ? (
          <Link href="/">
            <h1 className="text-2xl font-bold">
              <span className="text-[hsl(280,100%,30%)] dark:text-[hsl(280,100%,40%)]">
                Up
              </span>
              <span className="text-[hsl(280,100%,70%)] dark:text-[hsl(280,100%,80%)]">
                Keep
              </span>
            </h1>
          </Link>
        ) : null}
        {router.pathname === "/trash" ? (
          <h1 className="text-xl">Trash</h1>
        ) : null}
        {router.pathname === "/reminders" ? (
          <h1 className="text-xl">Reminders</h1>
        ) : null}
        {router.pathname === "/archive" ? (
          <h1 className="text-xl">Archive</h1>
        ) : null}
        {router.pathname === "/label/[id]" ? (
          <h1 className="text-xl">{labelName}</h1>
        ) : null}
      </div>

      {/* Search Bar */}
      <div className="relative hidden w-full md:block">
        <Label.Root htmlFor="search" className="hidden">
          Search notes
        </Label.Root>
        <input
          ref={searchInputRef}
          type="text"
          id="search"
          placeholder="Search notes"
          className="group/input h-12 w-full rounded-lg bg-gray-200 py-2 pl-14 pr-4 transition focus:border-transparent focus:shadow-md focus:outline-none dark:bg-gray-700 dark:focus:bg-gray-900 dark:focus:shadow-black"
        />
        <button
          className="absolute top-1/2 left-[6px] flex -translate-y-1/2 items-center justify-center rounded-full p-2 hover:bg-black/20 dark:hover:bg-white/20"
          onClick={() => searchInputRef.current?.focus()}
        >
          <MdSearch size={24} />
        </button>
      </div>

      <div className="flex items-center gap-1 justify-self-end md:gap-4">
        {/* Loading */}
        <div className="rounded-full p-[12px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white dark:focus:ring-white/60">
          {loading ? <LoadingSpinner /> : <MdOutlineCloudDone size={22} />}
        </div>
        {/* View */}
        <Tooltip text={true ? "List view" : "Grid view"}>
          <button
            type="button"
            // onFocus={() => setBtnFocused(true)}
            className="rounded-full p-[12px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white dark:focus:ring-white/60"
          >
            {true ? <TfiViewList size={20} /> : <TfiViewGrid size={20} />}
          </button>
        </Tooltip>
        {/* Settings */}
        <Popover.Root>
          <Tooltip text="Settings">
            <Popover.Trigger asChild>
              <button
                type="button"
                // onFocus={() => setBtnFocused(true)}
                className="rounded-full p-[12px] text-black/60 hover:bg-black/10 hover:text-black focus:ring-1 focus:ring-black/60 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white dark:focus:ring-white/60"
              >
                <MdOutlineSettings size={22} />
              </button>
            </Popover.Trigger>
          </Tooltip>
          <Popover.Portal>
            <Popover.Content sideOffset={-1} align="end" className="z-[101]">
              <ul className="rounded-md border border-black/10 bg-gray-50 py-1 shadow-md dark:border-white/10 dark:bg-gray-900">
                <li className="flex items-center">
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <button
                        type="button"
                        className="h-full w-full px-4 py-2 text-sm hover:bg-black/10 focus:bg-black/10 dark:hover:bg-white/10"
                      >
                        Settings
                      </button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="fixed inset-0 z-[9999] bg-black/80" />
                      <Dialog.Content className="fixed top-1/2 left-1/2 z-[9999] flex max-h-[85vh] w-[90vw] max-w-[300px] -translate-x-1/2 -translate-y-1/2 transform flex-col justify-between rounded-md border-black/20 bg-gray-50 p-4 shadow-md focus:outline-none dark:border-white/30 dark:bg-gray-900">
                        <Dialog.Title className="text-center text-xl font-medium">
                          Settings
                        </Dialog.Title>
                        <Dialog.Description className="my-9">
                          <form action="" onSubmit={(e) => e.preventDefault()}>
                            <h3 className="mb-4 text-sm font-semibold text-blue-500">
                              Notes and Lists
                            </h3>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <Label.Root
                                  className="select-none text-xs leading-none"
                                  htmlFor="new-to-bottom"
                                >
                                  Add new items to the bottom
                                </Label.Root>
                                <Checkbox.Root
                                  className="flex h-4 w-4 items-center justify-center rounded border-2 border-solid border-black/30 bg-gray-50 hover:bg-gray-100 focus:border-black dark:border-white/30 dark:bg-gray-900 hover:dark:bg-black dark:focus:border-white"
                                  id="new-to-bottom"
                                >
                                  <Checkbox.Indicator className="text-black dark:text-white">
                                    <MdCheck />
                                  </Checkbox.Indicator>
                                </Checkbox.Root>
                              </div>
                              <div className="flex items-center justify-between">
                                <Label.Root
                                  className="select-none text-xs leading-none"
                                  htmlFor="checked-to-bottom"
                                >
                                  Move checked items to the bottom
                                </Label.Root>
                                <Checkbox.Root
                                  className="flex h-4 w-4 items-center justify-center rounded border-2 border-solid border-black/30 bg-gray-50 hover:bg-gray-100 focus:border-black dark:border-white/30 dark:bg-gray-900 hover:dark:bg-black dark:focus:border-white"
                                  id="checked-to-bottom"
                                >
                                  <Checkbox.Indicator className="text-black dark:text-white">
                                    <MdCheck />
                                  </Checkbox.Indicator>
                                </Checkbox.Root>
                              </div>
                              <div className="flex items-center justify-between">
                                <Label.Root
                                  className="select-none text-xs leading-none"
                                  htmlFor="rich-link-previews"
                                >
                                  Display rich link previews
                                </Label.Root>
                                <Checkbox.Root
                                  className="flex h-4 w-4 items-center justify-center rounded border-2 border-solid border-black/30 bg-gray-50 hover:bg-gray-100 focus:border-black dark:border-white/30 dark:bg-gray-900 hover:dark:bg-black dark:focus:border-white"
                                  defaultChecked
                                  id="rich-link-previews"
                                >
                                  <Checkbox.Indicator className="text-black dark:text-white">
                                    <MdCheck />
                                  </Checkbox.Indicator>
                                </Checkbox.Root>
                              </div>
                              <div className="flex items-center justify-between">
                                <Label.Root
                                  className="select-none text-xs leading-none"
                                  htmlFor="enable-dark-theme"
                                >
                                  Enable dark theme
                                </Label.Root>
                                <Checkbox.Root
                                  className="flex h-4 w-4 items-center justify-center rounded border-2 border-solid border-black/30 bg-gray-50 hover:bg-gray-100 focus:border-black dark:border-white/30 dark:bg-gray-900 hover:dark:bg-black dark:focus:border-white"
                                  defaultChecked
                                  id="enable-dark-theme"
                                >
                                  <Checkbox.Indicator className="text-black dark:text-white">
                                    <MdCheck />
                                  </Checkbox.Indicator>
                                </Checkbox.Root>
                              </div>
                            </div>
                            <h3 className="mb-4 mt-5 text-sm font-semibold text-blue-500">
                              Reminder Defaults
                            </h3>
                            <div className="space-y-6">
                              <div className="flex items-center justify-between">
                                <Label.Root
                                  className="select-none text-xs leading-none"
                                  htmlFor="morning"
                                >
                                  Morning
                                </Label.Root>
                                <input
                                  className="w-36 border-b border-solid border-black/30 bg-gray-50 px-2 text-sm focus:border-black focus:outline-none dark:border-white/30 dark:bg-gray-900 dark:focus:border-white"
                                  type="text"
                                  id="morning"
                                  defaultValue="6:00 AM"
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <Label.Root
                                  className="select-none text-xs leading-none"
                                  htmlFor="afternoon"
                                >
                                  Afternoon
                                </Label.Root>
                                <input
                                  className="w-36 border-b border-solid border-black/30 bg-gray-50 px-2 text-sm focus:border-black focus:outline-none dark:border-white/30 dark:bg-gray-900 dark:focus:border-white"
                                  type="text"
                                  id="afternoon"
                                  defaultValue="1:00 PM"
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <Label.Root
                                  className="select-none text-xs leading-none"
                                  htmlFor="evening"
                                >
                                  Evening
                                </Label.Root>
                                <input
                                  className="w-36 border-b border-solid border-black/30 bg-gray-50 px-2 text-sm focus:border-black focus:outline-none dark:border-white/30 dark:bg-gray-900 dark:focus:border-white"
                                  type="text"
                                  id="evening"
                                  defaultValue="6:00 PM"
                                />
                              </div>
                            </div>
                            <h3 className="mb-4 mt-5 text-sm font-semibold text-blue-500">
                              Sharing
                            </h3>
                            <div className="flex items-center justify-between">
                              <label
                                className="select-none text-xs leading-none"
                                htmlFor="enable-sharing"
                              >
                                Enable sharing
                              </label>
                              <Checkbox.Root
                                className="flex h-4 w-4 items-center justify-center rounded border-2 border-solid border-black/30 bg-gray-50 hover:bg-gray-100 focus:border-black dark:border-white/30 dark:bg-gray-900 hover:dark:bg-black dark:focus:border-white"
                                defaultChecked
                                id="enable-sharing"
                              >
                                <Checkbox.Indicator className="text-black dark:text-white">
                                  <MdCheck />
                                </Checkbox.Indicator>
                              </Checkbox.Root>
                            </div>
                          </form>
                        </Dialog.Description>
                        <div className="flex justify-end gap-2">
                          <Dialog.Close asChild>
                            <button
                              className="h-9 rounded px-6 text-sm font-medium hover:bg-black/10 focus:bg-black/10 hover:dark:bg-white/10 dark:focus:bg-white/10"
                              type="button"
                            >
                              Cancel
                            </button>
                          </Dialog.Close>
                          <Dialog.Close asChild>
                            <button
                              className="h-9 rounded px-6 text-sm font-medium text-blue-500 hover:bg-black/10 focus:bg-black/10 hover:dark:bg-white/10 dark:focus:bg-white/10"
                              // onClick={() => deleteNote.mutate({ id: note.id })}
                              type="button"
                            >
                              Save
                            </button>
                          </Dialog.Close>
                        </div>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                </li>
                <li className="flex items-center">
                  <button
                    type="button"
                    onClick={() =>
                      setTheme(resolvedTheme === "dark" ? "light" : "dark")
                    }
                    className="h-full w-full px-4 py-2 text-sm hover:bg-black/10 focus:bg-black/10 dark:hover:bg-white/10"
                  >
                    {resolvedTheme === "dark" ? "Disable" : "Enable"} dark theme
                  </button>
                </li>
                <li className="flex items-center">
                  <button
                    type="button"
                    onClick={() => console.log("Add drawing")}
                    className="h-full w-full px-4 py-2 text-sm hover:bg-black/10 focus:bg-black/10 dark:hover:bg-white/10"
                  >
                    Send feedback
                  </button>
                </li>
                <li className="flex items-center">
                  <button
                    type="button"
                    // onClick={() => copyNote.mutate({ ...note })}
                    className="h-full w-full px-4 py-2 text-sm hover:bg-black/10 focus:bg-black/10 dark:hover:bg-white/10"
                  >
                    Help
                  </button>
                </li>
                <li className="flex items-center">
                  <KeyboardShortcutsModal />
                </li>
              </ul>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
        {/* Account */}
        <Popover.Root>
          <Tooltip text="UpKeep account">
            <Popover.Trigger asChild>
              <button
                className="border-3 h-8 w-8 rounded-full border-solid border-transparent text-black/50 hover:border-black/30 focus:border-black/30 dark:text-white/50 dark:hover:border-white/30 dark:focus:border-white/30"
                aria-label="Open account options"
              >
                {sessionData?.user?.image ? (
                  <Image
                    src={sessionData?.user?.image || ""}
                    width={32}
                    height={32}
                    className="rounded-full"
                    alt="User profile picture"
                  />
                ) : (
                  <MdAccountCircle size={32} />
                )}
              </button>
            </Popover.Trigger>
          </Tooltip>
          <Popover.Portal>
            <Popover.Content
              sideOffset={3}
              align="end"
              className="z-[101] min-w-[350px] rounded-md border border-black/10 bg-gray-50 shadow-md dark:border-white/10 dark:bg-gray-900"
            >
              <div className="flex flex-col">
                <div className="flex flex-col items-center border-b border-black/30 px-2 py-7 dark:border-white/30">
                  {sessionData?.user?.image ? (
                    <Image
                      src={sessionData?.user?.image || ""}
                      width={80}
                      height={80}
                      className="rounded-full"
                      alt="User profile picture"
                    />
                  ) : (
                    <MdAccountCircle size={80} className="text-black/50" />
                  )}
                  <h3 className="mt-1 font-semibold">
                    {sessionData?.user?.name}
                  </h3>
                  <p className="mt-1 text-sm">{sessionData?.user?.email}</p>
                  <Link
                    href="/account"
                    className="mt-4 rounded-full border border-solid border-black/10 px-5 py-[6px] text-sm font-medium hover:bg-black/10 dark:border-white/30 dark:hover:bg-white/10"
                  >
                    Manage your UpKeep account
                  </Link>
                </div>
                <div className="flex items-center justify-center border-b border-black/30 px-2 py-4 dark:border-white/30">
                  <button
                    className="rounded-sm border border-solid border-black/10 px-4 py-[10px] text-sm font-medium hover:bg-black/10 dark:border-white/30 dark:hover:bg-white/10"
                    onClick={() => signOut()}
                  >
                    Sign out
                  </button>
                </div>
                <div className="flex items-center justify-center gap-1 px-1 py-4 text-xs font-light">
                  <Link href="/privacy-policy" className="hover:underline">
                    Privacy policy
                  </Link>
                  <span>•</span>
                  <Link href="/terms-of-service" className="hover:underline">
                    Terms of service
                  </Link>
                </div>
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </header>
  );
}
