import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header({ loading }: { loading: boolean }) {
  const { data: sessionData } = useSession();
  return (
    <header className="flex items-center justify-between bg-white px-4 py-2 shadow-md">
      <Link href="/">
        <h1 className="text-xl font-bold">
          Up<span className="text-[hsl(280,100%,70%)]">Keep</span>
        </h1>
      </Link>

      <div className="flex items-center gap-4">
        {loading ? <p className="text-sm">Saving...</p> : null}
        <p className="text-sm">
          {sessionData && <span>Logged in as {sessionData?.user?.name}</span>}
        </p>
        <button
          className="rounded-full bg-black/10 px-6 py-2 font-semibold no-underline transition hover:bg-black/20"
          onClick={sessionData ? () => signOut() : () => signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </header>
  );
}
