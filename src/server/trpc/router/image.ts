import { router, protectedProcedure } from "../trpc";

export const imageRouter = router({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.image.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
});
