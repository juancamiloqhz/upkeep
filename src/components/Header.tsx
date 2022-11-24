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
} from "react-icons/md";
import { TfiViewGrid, TfiViewList } from "react-icons/tfi";
import LoadingSpinner from "./LoadingSpinner";
import Image from "next/image";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import Tooltip from "./Radix/Tooltip";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

export default function Header({
  setForceSidebarOpen,
}: {
  setForceSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [hasScroll, setHasScroll] = React.useState(false);
  const { data: sessionData } = useSession();
  const router = useRouter();
  const mutatingNumber = useIsMutating();
  const fetchingNumber = useIsFetching();

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

  return (
    <header
      className={`fixed top-0 z-[101] flex h-16 w-full items-center justify-between bg-gray-50 px-4 py-2 transition-shadow dark:bg-gray-900 ${
        hasScroll
          ? "shadow-md"
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
        {router.asPath === "/" || router.asPath === "/#home" ? (
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
        {router.asPath === "/#trash" ? (
          <h1 className="text-xl">Trash</h1>
        ) : null}
        {router.asPath === "/#archive" ? (
          <h1 className="text-xl">Archive</h1>
        ) : null}
      </div>

      <div className="flex items-center gap-4">
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
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <button
                        type="button"
                        className="h-full w-full px-4 py-2 text-sm hover:bg-black/10 focus:bg-black/10 dark:hover:bg-white/10"
                      >
                        Keyboard shortcuts
                      </button>
                    </Dialog.Trigger>

                    <Dialog.Portal>
                      <Dialog.Overlay className="fixed inset-0 z-[9999] bg-black/80" />
                      <Dialog.Content className="fixed top-1/2 left-1/2 z-[9999] flex h-[85vh] max-h-[500px] w-[90vw] max-w-[550px] -translate-x-1/2 -translate-y-1/2 transform flex-col justify-between rounded-md border-black/20 bg-gray-50 pb-6 shadow-md focus:outline-none dark:border-white/30 dark:bg-gray-900">
                        <Dialog.Title className="border-b p-4 text-xl font-medium">
                          Keyboard shortcuts
                        </Dialog.Title>
                        <Dialog.Description className="overflow-y-auto p-4">
                          <form action="" onSubmit={(e) => e.preventDefault()}>
                            <h3 className="mb-4 text-sm font-semibold">
                              Navigation
                            </h3>
                            <div className="">
                              <div className="flex items-center justify-between border-b border-black/30 py-1 dark:border-white/30">
                                <p className="text-sm text-black/60 dark:text-white/60">
                                  Navigate to next/previous note
                                </p>
                                <div className="flex w-36 items-center">
                                  <kbd className="rounded bg-gray-200 px-2 py-1 text-sm font-bold dark:bg-black">
                                    j / k
                                  </kbd>
                                </div>
                              </div>
                              <div className="flex items-center justify-between border-b border-black/30 py-1 dark:border-white/30">
                                <p className="text-sm text-black/60 dark:text-white/60">
                                  Move note to next/previous position
                                </p>
                                <div className="flex w-36 items-center">
                                  <kbd className="rounded bg-gray-200 px-2 py-1 text-sm font-bold dark:bg-black">
                                    Shift + j / k
                                  </kbd>
                                </div>
                              </div>
                              <div className="flex items-center justify-between border-b border-black/30 py-1 dark:border-white/30">
                                <p className="text-sm text-black/60 dark:text-white/60">
                                  Navigate to next/previous list item
                                </p>
                                <div className="flex w-36 items-center">
                                  <kbd className="rounded bg-gray-200 px-2 py-1 text-sm font-bold dark:bg-black">
                                    n / p
                                  </kbd>
                                </div>
                              </div>
                              <div className="flex items-center justify-between border-b border-black/30 py-1 dark:border-white/30">
                                <p className="text-sm text-black/60 dark:text-white/60">
                                  Move list item to next/previous position
                                </p>
                                <div className="flex w-36 items-center">
                                  <kbd className="rounded bg-gray-200 px-2 py-1 text-sm font-bold dark:bg-black">
                                    Shift + n / p
                                  </kbd>
                                </div>
                              </div>
                            </div>
                            <h3 className="mb-4 mt-5 text-sm font-semibold">
                              Application
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
                            <h3 className="mb-4 mt-5 text-sm font-semibold">
                              Actions
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
                            <h3 className="mb-4 mt-5 text-sm font-semibold">
                              Editor
                            </h3>
                          </form>
                        </Dialog.Description>
                        <Tooltip text="Close">
                          <Dialog.Close asChild>
                            <button
                              className="absolute top-3 right-3 inline-flex h-6 w-6 items-center justify-center rounded-full"
                              aria-label="Close"
                            >
                              {/* <Cross2Icon /> */}x
                            </button>
                          </Dialog.Close>
                        </Tooltip>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
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
                className="border-3 rounded-full border-solid border-transparent text-black/50 hover:border-black/30 dark:text-white/50 dark:hover:border-white/30"
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
