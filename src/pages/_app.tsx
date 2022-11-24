import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Inter as NextFont } from "@next/font/google";
import { trpc } from "../utils/trpc";
import { ThemeProvider } from "next-themes";

const font = NextFont({ subsets: ["latin"] });

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <style jsx global>{`
        html {
          font-family: ${font.style.fontFamily};
        }
      `}</style>
      <ThemeProvider enableSystem={true} attribute="class">
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
