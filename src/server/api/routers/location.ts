// import { eq } from "drizzle-orm";
// import { z } from "zod";

import {
  createTRPCRouter,
  // protectedProcedure,
  // publicProcedure,
} from "~/server/api/trpc";
// import { locations } from "~/server/db/schema";

export const locationRouter = createTRPCRouter({
  // create: protectedProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     await ctx.db.insert(posts).values({
  //       name: input.name,
  //       createdById: ctx.session.user.id,
  //     });
  //   }),
  // update: protectedProcedure
  //   .input(z.object({ id: z.number(), name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     await ctx.db
  //       .update(posts)
  //       .set({ name: input.name })
  //       .where(eq(posts.id, input.id));
  //   }),
  // delete: protectedProcedure
  //   .input(z.object({ id: z.number() }))
  //   .mutation(async ({ ctx, input }) => {
  //     await ctx.db.delete(posts).where(eq(posts.id, input.id));
  //   }),
  // getAll: publicProcedure.query(async ({ ctx }) => {
  //   const post = await ctx.db.query.posts.findMany();
  //   return post ?? null;
  // }),
  // getById: publicProcedure
  //   .input(z.object({ id: z.number() }))
  //   .query(async ({ ctx, input }) => {
  //     const post = await ctx.db.query.posts.findFirst({
  //       where: eq(posts.id, input.id),
  //     });
  //     return post ?? null;
  //   }),
  // getByCoords: publicProcedure
  //   .input(z.object({ lat: z.number(), lng: z.number() }))
  //   .query(async ({ ctx, input }) => {
  //     const post = await ctx.db.query.posts.findFirst({
  //       where: eq(posts.lat, input.lat),
  //     });
  //     return post ?? null;
  //   }),
});
