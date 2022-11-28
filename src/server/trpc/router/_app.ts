import { router } from "../trpc";
import { authRouter } from "./auth";
import { labelRouter } from "./label";
import { noteRouter } from "./note";

export const appRouter = router({
  note: noteRouter,
  auth: authRouter,
  label: labelRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
