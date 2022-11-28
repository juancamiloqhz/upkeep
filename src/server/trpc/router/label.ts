import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const labelRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.label.findMany({
      where: {
        userId: ctx.session?.user?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  one: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.label.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  add: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        color: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.label.create({
        data: {
          name: input.name,
          color: input.color,
          user: {
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
        name: z.string().optional(),
        color: z.string().optional(),
        noteId: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.label.update({
        where: {
          id: input.id,
        },
        data: {
          ...(input.name && { name: input.name }),
          ...(input.color && { color: input.color }),
          ...(input.noteId && {
            notes: {
              connect: {
                id: input.noteId,
              },
            },
          }),
        },
      });
    }),
  connectToNote: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        noteId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.label.update({
        where: {
          id: input.id,
        },
        data: {
          notes: {
            connect: {
              id: input.noteId,
            },
          },
        },
      });
    }),
  disconnectFromNote: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        noteId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.label.update({
        where: {
          id: input.id,
        },
        data: {
          notes: {
            disconnect: {
              id: input.noteId,
            },
          },
        },
      });
    }),
  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.label.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
