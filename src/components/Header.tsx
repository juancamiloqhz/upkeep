import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { SlMenu } from "react-icons/sl";
import { MdOutlineCloudDone } from "react-icons/md";
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
        <Link href="/#home">
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
        {/* <p className="text-sm">
          {sessionData && <span>Logged in as {sessionData?.user?.name}</span>}
        </p> */}
        {/* <button
          className="rounded-full bg-black/10 px-6 py-2 font-semibold no-underline transition hover:bg-black/20"
          onClick={sessionData ? () => signOut() : () => signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button> */}
        <button className="border-3 rounded-full border-solid border-transparent hover:border-black/30">
          {sessionData?.user?.image ? (
            <Image
              src={sessionData?.user?.image}
              width={32}
              height={32}
              className="rounded-full"
              alt="User profile picture"
            />
          ) : null}
        </button>
      </div>
    </header>
  );
}
