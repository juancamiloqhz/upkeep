import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const noteRouter = router({
  allActive: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.note.findMany({
      where: {
        status: "ACTIVE",
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }),
  allPinned: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.note.findMany({
      where: {
        status: "PINNED",
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }),
  allTrashed: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.note.findMany({
      where: {
        status: "TRASH",
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }),
  one: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.note.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  add: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        title: z.string().optional(),
        content: z.string().optional(),
        background: z.string().optional(),
        color: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.create({
        data: {
          id: input?.id,
          title: input?.title ?? "",
          content: input?.content ?? "",
          background: input?.background ?? "",
          color: input?.color ?? "",
          author: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
  edit: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        content: z.string().optional(),
        background: z.string().optional(),
        color: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.update({
        where: {
          id: input.id,
        },
        data: {
          title: input?.title ?? "",
          content: input?.content ?? "",
          background: input?.background ?? "",
          color: input?.color ?? "",
        },
      });
    }),
  pin: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.update({
        where: {
          id: input.id,
        },
        data: {
          status: "PINNED",
        },
      });
    }),
  trash: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.update({
        where: {
          id: input.id,
        },
        data: {
          status: "TRASH",
        },
      });
    }),
  restore: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.update({
        where: {
          id: input.id,
        },
        data: {
          status: "ACTIVE",
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
