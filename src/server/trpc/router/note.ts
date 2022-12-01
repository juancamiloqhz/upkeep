import { Status } from "@prisma/client";
import { z } from "zod";
import { deleteImages as deleteImagesFromCloudinary } from "../../../utils/cloudinary";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const noteRouter = router({
  allActive: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.note.findMany({
      where: {
        status: "ACTIVE",
        authorId: ctx.session?.user?.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        images: true,
        labels: true,
      },
    });
  }),
  allPinned: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.note.findMany({
      where: {
        status: "PINNED",
        authorId: ctx.session?.user?.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        images: true,
        labels: true,
      },
    });
  }),
  allTrashed: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.note.findMany({
      where: {
        status: "TRASH",
        authorId: ctx.session?.user?.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        images: true,
        labels: true,
      },
    });
  }),
  allArchived: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.note.findMany({
      where: {
        status: "ARCHIVED",
        authorId: ctx.session?.user?.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        images: true,
        labels: true,
      },
    });
  }),
  allByLabel: protectedProcedure
    .input(z.object({ labelId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.note.findMany({
        where: {
          authorId: ctx.session.user.id,
          labels: {
            some: {
              id: input.labelId,
            },
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          images: true,
          labels: true,
        },
      });
    }),
  one: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.note.findFirst({
        where: {
          id: input.id,
          authorId: ctx.session?.user?.id,
        },
      });
    }),
  add: protectedProcedure
    .input(
      z.object({
        title: z.string().nullish(),
        content: z.string().nullish(),
        background: z.string().nullish(),
        color: z.string().nullish(),
        status: z.nativeEnum(Status),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.create({
        data: {
          title: input.title,
          content: input.content,
          background: input.background,
          color: input.color,
          status: input.status,
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
        title: z.string().nullish(),
        content: z.string().nullish(),
        background: z.string().nullish(),
        color: z.string().nullish(),
        status: z.nativeEnum(Status).optional(),
        updatedAt: z.date().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.update({
        where: {
          id: input.id,
        },
        data: {
          ...(input.title && { title: input.title }),
          ...(input.content && { content: input.content }),
          ...(input.background && { background: input.background }),
          ...(input.color && { color: input.color }),
          ...(input.status && { status: input.status }),
          ...(input.updatedAt && { updatedAt: input.updatedAt }),
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
          updatedAt: new Date(),
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
          updatedAt: new Date(),
        },
      });
    }),
  archive: protectedProcedure
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
          status: "ARCHIVED",
          updatedAt: new Date(),
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
          updatedAt: new Date(),
        },
      });
    }),
  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const images = await ctx.prisma.image.findMany({
        where: {
          noteId: input.id,
        },
        select: {
          public_id: true,
        },
      });
      if (images.length > 0) {
        await deleteImagesFromCloudinary(
          images.map((image) => image.public_id)
        );
      }

      return ctx.prisma.note.delete({
        where: {
          id: input.id,
        },
      });
    }),
  deleteMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const images = await ctx.prisma.image.findMany({
        where: {
          noteId: {
            in: input.ids,
          },
        },
        select: {
          public_id: true,
        },
      });
      if (images.length > 0) {
        await deleteImagesFromCloudinary(
          images.map((image) => image.public_id)
        );
      }
      return ctx.prisma.note.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),
});
