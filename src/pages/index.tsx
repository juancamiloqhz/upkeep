import React from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useIsMutating } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import Header from "../components/Header";
import ListNote from "../components/Note/ListNote";
import { useClickOutside } from "../utils/helpers";

const Home: NextPage = () => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const { data: sessionData } = useSession();
  const [creatingNote, setCreatingNote] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [background, setBackground] = React.useState("default");
  const [color, setColor] = React.useState("default");

  const allActiveNotes = trpc.note.allActive.useQuery(undefined, {
    staleTime: 3000,
  });
  const allPinnedNotes = trpc.note.allPinned.useQuery(undefined, {
    staleTime: 3000,
  });
  const allTrashedNotes = trpc.note.allTrashed.useQuery(undefined, {
    staleTime: 3000,
  });
  const allArchivedNotes = trpc.note.allArchived.useQuery(undefined, {
    staleTime: 3000,
  });
  const utils = trpc.useContext();
  const addNote = trpc.note.add.useMutation({
    async onMutate({ title, content, background, color }) {
      // console.log("onMutate", res);
      await utils.note.allActive.cancel();
      const notes = allActiveNotes.data ?? [];
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
        ...notes,
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
      <Header loading={allActiveNotes.isLoading} />
      <div className="flex min-h-screen flex-col bg-white">
        <div className="mx-auto w-full px-4 py-16 md:max-w-5xl lg:max-w-7xl">
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

          {allPinnedNotes.data?.length ? (
            <>
              <h1 className="mb-2 px-3 text-xs font-semibold uppercase">
                Pinned
              </h1>
              <ul className="mb-16 grid w-full grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                {allPinnedNotes.data?.map((note) => (
                  <ListNote key={note.id} note={note} />
                ))}
              </ul>
            </>
          ) : null}
          {allActiveNotes.data?.length ? (
            <>
              <h1 className="mb-2 px-3 text-xs font-semibold uppercase">
                Other
              </h1>
              <ul className="mb-16 grid w-full grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                {allActiveNotes.data?.map((note) => (
                  <ListNote key={note.id} note={note} />
                ))}
              </ul>
            </>
          ) : null}
          {allArchivedNotes.data?.length ? (
            <>
              <h1 className="mb-2 px-3 text-xs font-semibold uppercase">
                Archived
              </h1>
              <ul className="mb-16 grid w-full grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                {allArchivedNotes.data?.map((note) => (
                  <ListNote key={note.id} note={note} />
                ))}
              </ul>
            </>
          ) : null}
          {allTrashedNotes.data?.length ? (
            <>
              <h1 className="mb-2 px-3 text-xs font-semibold uppercase">
                Trash
              </h1>
              <ul className="mb-16 grid w-full grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                {allTrashedNotes.data?.map((note) => (
                  <ListNote key={note.id} note={note} />
                ))}
              </ul>
            </>
          ) : null}
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
