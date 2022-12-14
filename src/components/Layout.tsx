import { useIsMutating } from "@tanstack/react-query";
import Head from "next/head";
import React from "react";
import { trpc } from "../utils/trpc";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [forceSidebarOpen, setForceSidebarOpen] = React.useState(false);
  const utils = trpc.useContext();

  const number = useIsMutating();
  React.useEffect(() => {
    // invalidate queries when mutations have settled
    // doing this here rather than in `onSettled()`
    // to avoid race conditions if you're clicking fast
    if (number === 0) {
      utils.note.allActive.invalidate();
      utils.note.allPinned.invalidate();
      utils.note.allTrashed.invalidate();
      utils.note.allArchived.invalidate();
    }
  }, [number, utils]);
  return (
    <>
      <Head>
        <title>UpKeep</title>
        <meta name="description" content="Google Keep Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header setForceSidebarOpen={setForceSidebarOpen} />
      <div className="h-16"></div>
      <div className="relative flex min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900">
        <Sidebar forceSidebarOpen={forceSidebarOpen} />
        <div className="mx-auto w-full px-4 sm:max-w-[496px] sm:px-0 lg:max-w-[752px] xl:max-w-[1008px] 2xl:max-w-[1264px] 3xl:max-w-[1520px] 4xl:max-w-[1776px] 5xl:max-w-[2032px] 6xl:max-w-[2288px]">
          {children}
        </div>
      </div>
    </>
  );
}
