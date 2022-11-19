import React from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useIsMutating } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { type inferProcedureOutput } from "@trpc/server";
import { TiPinOutline, TiPin } from "react-icons/ti";
import { trpc } from "../utils/trpc";
import Header from "../components/Header";
import { type AppRouter } from "../server/trpc/router/_app";

/**
 * Hook for checking when the user clicks outside the passed ref
 */
function useClickOutside({
  ref,
  callback,
  enabled,
}: {
  ref: React.RefObject<any>;
  callback: () => void;
  enabled: boolean;
}) {
  const callbackRef = React.useRef(callback);
  callbackRef.current = callback;
  React.useEffect(() => {
    if (!enabled) {
      return;
    }
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        callbackRef.current();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, enabled]);
}

type Note = inferProcedureOutput<AppRouter["note"]["allActive"]>[number];

const ListNote = ({ note }: { note: Note }) => {
  const utils = trpc.useContext();
  const trashNote = trpc.note.trash.useMutation({
    async onMutate() {
      await utils.note.allActive.cancel();
      const allActiveNotes = utils.note.allActive.getData();
      const allTrashedNotes = utils.note.allTrashed.getData();
      const newStatus: Note["status"] = "TRASH";
      const noteToTrash = { ...note, status: newStatus, updatedAt: new Date() };
      if (allActiveNotes) {
        utils.note.allActive.setData(
          undefined,
          allActiveNotes.filter((t) => t.id != note.id)
        );
      }
      utils.note.allTrashed.setData(
        undefined,
        allTrashedNotes ? [noteToTrash, ...allTrashedNotes] : [noteToTrash]
      );
    },
  });
  const pinNote = trpc.note.pin.useMutation({
    async onMutate() {
      await utils.note.allActive.cancel();
      await utils.note.allPinned.cancel();
      const allActiveNotes = utils.note.allActive.getData();
      const allPinnedNotes = utils.note.allPinned.getData();
      const newStatus: Note["status"] = "PINNED";
      const noteToPin = { ...note, status: newStatus, updatedAt: new Date() };
      if (allActiveNotes) {
        utils.note.allActive.setData(
          undefined,
          allActiveNotes.filter((t) => t.id != note.id)
        );
      }
      utils.note.allPinned.setData(
        undefined,
        allPinnedNotes ? [noteToPin, ...allPinnedNotes] : [noteToPin]
      );
    },
  });
  const unPinNote = trpc.note.restore.useMutation({
    async onMutate() {
      await utils.note.allActive.cancel();
      await utils.note.allPinned.cancel();
      const allActiveNotes = utils.note.allActive.getData();
      const allPinnedNotes = utils.note.allPinned.getData();
      const newStatus: Note["status"] = "ACTIVE";
      const noteToUnPin = {
        ...note,
        status: newStatus,
        updatedAt: new Date(),
      };
      if (allPinnedNotes) {
        utils.note.allPinned.setData(
          undefined,
          allPinnedNotes.filter((t) => t.id != note.id)
        );
      }
      utils.note.allActive.setData(
        undefined,
        allActiveNotes ? [noteToUnPin, ...allActiveNotes] : [noteToUnPin]
      );
    },
  });
  const deleteNote = trpc.note.delete.useMutation({
    async onMutate() {
      await utils.note.allTrashed.cancel();
      const allTrashedNotes = utils.note.allTrashed.getData();
      if (!allTrashedNotes) {
        return;
      }
      utils.note.allTrashed.setData(
        undefined,
        allTrashedNotes.filter((t) => t.id != note.id)
      );
    },
    // onError(e) {
    //   console.log("deleting Error: ", e.message);
    // },
  });

  const restoreNote = trpc.note.restore.useMutation({
    async onMutate() {
      await utils.note.allActive.cancel();
      await utils.note.allTrashed.cancel();
      const allActiveNotes = utils.note.allActive.getData();
      const allTrashedNotes = utils.note.allTrashed.getData();
      const newStatus: Note["status"] = "ACTIVE";
      const noteToRestore = {
        ...note,
        status: newStatus,
        updatedAt: new Date(),
      };
      if (allTrashedNotes) {
        utils.note.allTrashed.setData(
          undefined,
          allTrashedNotes.filter((t) => t.id != note.id)
        );
      }
      utils.note.allActive.setData(
        undefined,
        allActiveNotes ? [noteToRestore, ...allActiveNotes] : [noteToRestore]
      );
    },
  });

  return (
    <li
      tab-index={1}
      key={note.id}
      className="group/li relative flex h-fit flex-col rounded-xl border border-gray-200"
    >
      {note.status !== "TRASH" ? (
        <button
          className="group/btn invisible absolute top-1 right-1 flex items-center justify-center rounded-full p-[0.4rem] opacity-0 transition-all duration-300 ease-in hover:bg-black/10 group-hover/li:visible group-hover/li:opacity-100"
          onClick={
            note.status === "PINNED"
              ? () => unPinNote.mutate({ id: note.id })
              : () => pinNote.mutate({ id: note.id })
          }
        >
          {note.status === "PINNED" ? (
            <TiPin
              className="-rotate-45 text-gray-400 transition-all duration-300 ease-in group-hover/btn:text-gray-500"
              size={24}
            />
          ) : (
            <TiPinOutline
              className="text-gray-400 transition-all duration-300 ease-in group-hover/btn:text-gray-500"
              size={24}
            />
          )}
        </button>
      ) : null}
      <div className="gap-4 px-3 pb-10 pt-[0.6rem]">
        {note.title ? (
          <h3 className="mr-6 mb-2 font-semibold leading-tight">
            {note.title}
          </h3>
        ) : null}
        <p className={`text-sm font-light`}>{note?.content}</p>
      </div>
      <div className="invisible flex items-center justify-between gap-2 p-2 opacity-0 transition-all duration-300 ease-in group-hover/li:visible group-hover/li:opacity-100">
        {note.status === "TRASH" ? (
          <>
            <div className="flex items-center gap-2">
              <button
                className="h-6 w-fit rounded-md bg-blue-500 px-1 text-sm font-semibold text-white hover:bg-blue-600"
                onClick={() => restoreNote.mutate({ id: note.id })}
              >
                Restore
              </button>
              <button
                className="h-6 w-fit rounded-md bg-red-500 px-1 text-sm font-semibold text-white hover:bg-red-600"
                onClick={() => deleteNote.mutate({ id: note.id })}
              >
                Delete Forever
              </button>
            </div>
          </>
        ) : null}
        <p></p>
        {note.status === "ACTIVE" ? (
          <button
            className="h-6 w-fit rounded-md bg-fuchsia-500 px-1 text-sm font-semibold text-white hover:bg-fuchsia-600"
            onClick={() => trashNote.mutate({ id: note.id })}
          >
            Delete
          </button>
        ) : null}
      </div>
    </li>
  );
};

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
      <main className="flex min-h-screen flex-col bg-white">
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
          <h1 className="mb-2 px-3 text-xs font-semibold uppercase">Other</h1>
          <ul className="mb-16 grid w-full grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {allActiveNotes.data?.map((note) => (
              <ListNote key={note.id} note={note} />
            ))}
          </ul>
          <h1 className="mb-2 px-3 text-xs font-semibold uppercase">Trash</h1>
          <ul className="mb-16 grid w-full grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {allTrashedNotes.data?.map((note) => (
              <ListNote key={note.id} note={note} />
            ))}
          </ul>
        </div>
      </main>
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
