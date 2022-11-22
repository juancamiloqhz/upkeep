import { type inferProcedureOutput } from "@trpc/server";
import { type AppRouter } from "../server/trpc/router/_app";

type Note = inferProcedureOutput<AppRouter["note"]["allActive"]>[number];
