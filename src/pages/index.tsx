import React from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { useIsMutating } from "@tanstack/react-query";
import { trpc } from "../utils/trpc";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/router";
import { HomeView, ArchiveView, TrashView } from "../components/Views";
import { CreateNote } from "../components/Note";

const Home: NextPage = () => {
  const [forceSidebarOpen, setForceSidebarOpen] = React.useState(false);
  const router = useRouter();
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
      <div className="relative flex h-[calc(100vh-4rem)] bg-white">
        <Sidebar forceSidebarOpen={forceSidebarOpen} />
        <div className="mx-auto w-full px-4 sm:max-w-[496px] sm:px-0 lg:max-w-[752px] xl:max-w-[1008px] 2xl:max-w-[1264px] 3xl:max-w-[1520px] 4xl:max-w-[1776px] 5xl:max-w-[2032px] 6xl:max-w-[2288px]">
          {router.asPath === "/#home" || router.asPath === "/" ? (
            <>
              <CreateNote />
              <HomeView />
            </>
          ) : null}
          {router.asPath === "/#archive" ? <ArchiveView /> : null}
          {router.asPath === "/#trash" ? <TrashView /> : null}
        </div>
      </div>
    </>
  );
};

export default Home;
