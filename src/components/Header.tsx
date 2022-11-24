import React from "react";
import { signOut, useSession } from "next-auth/react";
import * as Popover from "@radix-ui/react-popover";
import Link from "next/link";
import { SlMenu } from "react-icons/sl";
import { MdOutlineCloudDone, MdAccountCircle } from "react-icons/md";
import LoadingSpinner from "./LoadingSpinner";
import Image from "next/image";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import Tooltip from "./Radix/Tooltip";

export default function Header({
  setForceSidebarOpen,
}: {
  setForceSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = React.useState(false);
  const [hasScroll, setHasScroll] = React.useState(false);
  const { data: sessionData } = useSession();
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
      className={`fixed top-0 z-[101] flex h-16 w-full items-center justify-between bg-white px-4 py-2 transition-shadow ${
        hasScroll ? "shadow-md" : "border-b"
      }`}
    >
      <div className="flex items-center gap-2">
        <Tooltip text="Main menu">
          <button
            className={`rounded-full p-3 hover:bg-black/10 focus:bg-black/10`}
            onClick={() => setForceSidebarOpen((d) => !d)}
          >
            <SlMenu size={18} />
          </button>
        </Tooltip>
        <Link href="/">
          <h1 className="text-2xl font-bold">
            <span className="text-[hsl(280,100%,30%)]">Up</span>
            <span className="text-[hsl(280,100%,70%)]">Keep</span>
          </h1>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <MdOutlineCloudDone size={22} color="hsla(0, 0%, 0%, 0.5)" />
        )}

        <Popover.Root>
          <Tooltip text="UpKeep account">
            <Popover.Trigger asChild>
              <button
                className="border-3 rounded-full border-solid border-transparent text-black/50 hover:border-black/30"
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
              className="z-[101] min-w-[350px] rounded-md border border-black/10 bg-white shadow-md"
            >
              <div className="flex flex-col">
                <div className="flex flex-col items-center border-b px-2 py-7">
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
                    className="mt-4 rounded-full border border-solid border-black/10 px-5 py-[6px] text-sm font-medium hover:bg-black/10"
                  >
                    Manage your UpKeep account
                  </Link>
                </div>
                <div className="flex items-center justify-center border-b px-2 py-4">
                  <button
                    className="rounded-sm border border-solid border-black/10 px-4 py-[10px] text-sm font-medium hover:bg-black/10"
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
