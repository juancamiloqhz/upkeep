import React from "react";
import { type NextPage } from "next";
import Head from "next/head";
// import Link from "next/link";
import { useIsMutating } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import Header from "../components/Header";
// import ListNote from "../components/Note/ListNote";
import { useClickOutside } from "../utils/helpers";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/router";
import { HomeView, ArchiveView, TrashView } from "../components/Views";

const Home: NextPage = () => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const { data: sessionData } = useSession();
  const [forceSidebarOpen, setForceSidebarOpen] = React.useState(false);
  const [creatingNote, setCreatingNote] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [background, setBackground] = React.useState("default");
  const [color, setColor] = React.useState("default");
  const router = useRouter();
  // console.log(router);
  const utils = trpc.useContext();
  const addNote = trpc.note.add.useMutation({
    async onMutate({ title, content, background, color }) {
      // console.log("onMutate", res);
      await utils.note.allActive.cancel();
      await utils.note.allPinned.cancel();
      await utils.note.allTrashed.cancel();
      await utils.note.allArchived.cancel();
      const allActiveNotes = utils.note.allActive.getData();
      utils.note.allActive.setData(undefined, [
        {
          id: `${Math.random()}`,
          title: title || "",
          content: content || "",
          background: background || "default",
          color: color || "default",
          status: "ACTIVE",
          authorId: sessionData?.user?.id || null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        ...(allActiveNotes || []),
      ]);
      setTitle("");
      setContent("");
      setBackground("default");
      setColor("default");
    },
  });

  function createNote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addNote.mutate({
      title,
      content,
      background,
      color,
    });
  }

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

  useClickOutside({
    ref: formRef,
    enabled: creatingNote,
    callback() {
      if (title || content || background !== "default" || color !== "default") {
        addNote.mutate({
          title,
          content,
          background,
          color,
        });
      }
      setCreatingNote(false);
    },
  });

  return (
    <>
      <Head>
        <title>UpKeep</title>
        <meta name="description" content="Google Keep Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header setForceSidebarOpen={setForceSidebarOpen} />
      <div className="h-16"></div>
      <div className="relative flex h-[calc(100vh-4rem)] min-h-screen bg-white">
        <Sidebar forceSidebarOpen={forceSidebarOpen} />
        <div className="container relative mx-auto py-2 sm:py-16">
          {router.asPath === "/#home" ? (
            <>
              <h1 className="text-center text-xl">{`Creating note: ${creatingNote}`}</h1>
              <form
                ref={formRef}
                className="mx-auto mb-16 flex max-w-md flex-col gap-2 rounded-xl border border-gray-200 bg-white/10 py-4"
                onSubmit={createNote}
                onFocus={() => setCreatingNote(true)}
              >
                <label htmlFor="title" className="hidden">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  placeholder="Title"
                  onChange={(e) => setTitle(e.currentTarget.value)}
                  className="px-4 focus-visible:outline-none"
                />
                <label htmlFor="content" className="hidden">
                  Content
                </label>
                <textarea
                  name="content"
                  id="content"
                  placeholder="Take a note"
                  cols={30}
                  rows={1}
                  value={content}
                  onFocus={(e) => (e.currentTarget.rows = 5)}
                  onBlur={(e) => (e.currentTarget.rows = 1)}
                  onChange={(e) => setContent(e.currentTarget.value)}
                  className="px-4 focus-visible:outline-none"
                />
                {addNote.error ? <p>{addNote.error.message}</p> : null}
              </form>
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

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData?.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <pre className="text-white">{JSON.stringify(sessionData, null, 2)}</pre>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => signOut() : () => signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
