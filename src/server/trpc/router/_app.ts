import { router } from "../trpc";
import { authRouter } from "./auth";
import { noteRouter } from "./note";

export const appRouter = router({
  note: noteRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
