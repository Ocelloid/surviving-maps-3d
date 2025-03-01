import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  locations,
  namedLocations,
  breakthroughs,
  breakthroughsInLocations,
  versions,
} from "~/server/db/schema";

const CSVLangRow = z.object({
  name_en: z.string(),
  name_br: z.string(),
  name_fr: z.string(),
  name_ge: z.string(),
  name_po: z.string(),
  name_ru: z.string(),
  name_sc: z.string(),
  name_sp: z.string(),
});

const CSVDataRow = z.object({
  Altitude: z.string(),
  "Breakthrough 1": z.string(),
  "Breakthrough 2": z.string(),
  "Breakthrough 3": z.string(),
  "Breakthrough 4": z.string(),
  "Breakthrough 5": z.string(),
  "Breakthrough 6": z.string(),
  "Breakthrough 7": z.string(),
  "Breakthrough 8": z.string(),
  "Breakthrough 9": z.string(),
  "Breakthrough 10": z.string(),
  "Breakthrough 11": z.string(),
  "Breakthrough 12": z.string(),
  "Breakthrough 13": z.string().optional(),
  "Breakthrough 14": z.string().optional(),
  "Breakthrough 15": z.string().optional(),
  "Breakthrough 16": z.string().optional(),
  "Breakthrough 17": z.string().optional(),
  "Cold Waves": z.string(),
  Concrete: z.string(),
  "Difficulty Challenge": z.string(),
  "Dust Devils": z.string(),
  "Dust Storms": z.string(),
  Latitude: z.string(),
  "Latitude °": z.string(),
  Longitude: z.string(),
  "Longitude °": z.string(),
  "Map Name": z.string(),
  Metals: z.string(),
  Meteors: z.string(),
  "Named Location": z.string(),
  "Rare Metals": z.string(),
  Temperature: z.string(),
  Topography: z.string(),
  Water: z.string(),
});

type Location = {
  id: number;
  lat_dir: string;
  lat_deg: string;
  lon_dir: string;
  lon_deg: string;
  altitude: number;
  named_loc_id: number;
  map_name: string;
  topography: string;
  concrete: number;
  water: number;
  metals: number;
  rare_metals: number;
  temperature: number;
  meteors: number;
  dust_devils: number;
  dust_storms: number;
  cold_waves: number;
  difficulty: number;
  bts_loc?: BreakthroughInLocation[];
  namedLoc?: NamedLocation;
};

type NamedLocation = {
  id: number;
  name_en: string;
  name_br: string;
  name_fr: string;
  name_ge: string;
  name_po: string;
  name_ru: string;
  name_sc: string;
  name_sp: string;
  coordinates?: Location[];
};

type BreakthroughInLocation = {
  id: number;
  bt_id: number;
  loc_id: number;
  ver_id: number;
  bt?: Breakthrough;
  loc?: Location;
  ver?: Version;
};

type Breakthrough = {
  id: number;
  name_en: string;
  name_br: string;
  name_fr: string;
  name_ge: string;
  name_po: string;
  name_ru: string;
  name_sc: string;
  name_sp: string;
  desc_en: string;
  desc_br: string;
  desc_fr: string;
  desc_ge: string;
  desc_po: string;
  desc_ru: string;
  desc_sc: string;
  desc_sp: string;
  bts_loc?: BreakthroughInLocation[];
};

type Version = {
  id: number;
  name: string;
  bts_loc?: BreakthroughInLocation[];
};

export const locationRouter = createTRPCRouter({
  getNamedLocations: publicProcedure.query(async ({ ctx }) => {
    const namedLocations = await ctx.db.query.namedLocations.findMany();
    return namedLocations;
  }),

  getBreakthroughs: publicProcedure.query(async ({ ctx }) => {
    const breakthroughs = await ctx.db.query.breakthroughs.findMany();
    return breakthroughs;
  }),

  deleteBreakthroughs: protectedProcedure
    .input(
      z.object({
        version: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const version = input.version;
      const ver = await ctx.db.query.versions.findFirst({
        where: eq(versions.name, version),
      });
      if (!!ver?.id) {
        await ctx.db
          .delete(breakthroughsInLocations)
          .where(eq(breakthroughsInLocations.ver_id, ver.id));
        return {
          status: 200,
          message: `Successfully deleted breakthroughs for version ${version}.`,
        };
      } else {
        return { status: 404, message: `Version ${version} not found.` };
      }
    }),

  seedLocations: protectedProcedure
    .input(
      z.object({
        version: z.string(),
        rows: z.array(CSVDataRow),
        override: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const version = input.version;
      const oldVersions = await ctx.db.query.versions.findMany();
      let versionId = oldVersions.find((ver) => ver.name === version)?.id;

      if (!!versionId && !input.override) {
        return { status: 409, message: "Version already exists" };
      }

      if (!versionId) {
        const newVersion = await ctx.db
          .insert(versions)
          .values({
            name: version,
          })
          .returning({
            id: versions.id,
          });
        versionId = newVersion[0]!.id;
        console.log("added new version: ", version);
      }

      console.log("fetching additional info");

      const oldNamedLocations = await ctx.db.query.namedLocations.findMany();
      const oldBreakthroughs = await ctx.db.query.breakthroughs.findMany();
      const oldLocations = await ctx.db.query.locations.findMany();

      if (!oldNamedLocations.length) {
        return {
          status: 500,
          message: "No named locations found. Seed them first.",
        };
      }

      if (!oldBreakthroughs.length) {
        return {
          status: 500,
          message: "No breakthroughs found. Seed them first.",
        };
      }

      //seeding locations
      const newLocations: Location[] = [];
      if (!oldLocations.length) {
        console.log("seeding locations");
        const pendingLocations = input.rows.map((row) => ({
          lat_dir: row.Latitude,
          lat_deg: row["Latitude °"],
          lon_dir: row.Longitude,
          lon_deg: row["Longitude °"],
          altitude: Number(row.Altitude),
          map_name: row["Map Name"],
          topography: row.Topography,
          concrete: Number(row.Concrete),
          water: Number(row.Water),
          metals: Number(row.Metals),
          rare_metals: Number(row["Rare Metals"]),
          temperature: Number(row.Temperature),
          meteors: Number(row.Meteors),
          dust_devils: Number(row["Dust Devils"]),
          dust_storms: Number(row["Dust Storms"]),
          cold_waves: Number(row["Cold Waves"]),
          difficulty: Number(row["Difficulty Challenge"]),
          named_loc_id: oldNamedLocations.find(
            (nl) => nl.name_en === row["Named Location"],
          )?.id,
        }));
        console.log("pending locations: ", pendingLocations.length);
        let locationsBatch: Location[] = [];
        for (let i = 0; i < pendingLocations.length; i += 1000) {
          locationsBatch = await ctx.db
            .insert(locations)
            .values(pendingLocations.slice(i, i + 1000));
          console.log(`added ${locationsBatch.length} locations`);
          newLocations.push(...locationsBatch);
          console.log(`added ${newLocations.length} locations total`);
        }
      } else {
        console.log("locations already seeded");
      }

      // adding breakthroughs in locations for this version
      let seededBreakthroughs = 0;
      const pendingBreakthroughs: {
        bt_id: number;
        loc_id: number;
        ver_id: number;
      }[] = [];
      console.log("batching breakthroughs");
      for (const row of input.rows) {
        const newBreakthroughs = [
          row["Breakthrough 1"],
          row["Breakthrough 2"],
          row["Breakthrough 3"],
          row["Breakthrough 4"],
          row["Breakthrough 5"],
          row["Breakthrough 6"],
          row["Breakthrough 7"],
          row["Breakthrough 8"],
          row["Breakthrough 9"],
          row["Breakthrough 10"],
          row["Breakthrough 11"],
          row["Breakthrough 12"],
          row["Breakthrough 13"],
          row["Breakthrough 14"],
          row["Breakthrough 15"],
          row["Breakthrough 16"],
          row["Breakthrough 17"],
        ];
        pendingBreakthroughs.push(
          ...newBreakthroughs.map((nbt) => ({
            bt_id: oldBreakthroughs.find((bt) => bt.name_en === nbt)?.id ?? 1,
            loc_id: newLocations.length
              ? (newLocations.find(
                  (loc) =>
                    loc.lat_deg === row["Latitude °"] &&
                    loc.lon_deg === row["Longitude °"] &&
                    loc.lat_dir === row.Latitude &&
                    loc.lon_dir === row.Longitude,
                )?.id ?? 1)
              : (oldLocations.find(
                  (loc) =>
                    loc.lat_deg === row["Latitude °"] &&
                    loc.lon_deg === row["Longitude °"] &&
                    loc.lat_dir === row.Latitude &&
                    loc.lon_dir === row.Longitude,
                )?.id ?? 1),
            ver_id: versionId ?? 1,
          })),
        );
      }

      console.log("pending breakthroughs: ", pendingBreakthroughs.length);
      for (let i = 0; i < pendingBreakthroughs.length; i += 1000) {
        const pending = pendingBreakthroughs.slice(i, i + 1000);
        await ctx.db.insert(breakthroughsInLocations).values(pending);
        const lastLoc = oldLocations.find(
          (loc) => loc.id === pending[pending.length - 1]?.loc_id,
        );
        seededBreakthroughs += pending.length;
        console.log(
          `added breakthroughs for locations up to ${lastLoc?.lat_dir} ${lastLoc?.lat_deg} ${lastLoc?.lon_dir} ${lastLoc?.lon_deg}`,
        );
      }

      return {
        status: 200,
        message: `Successfully seeded ${version}. Added ${
          newLocations.length
        } locations and ${seededBreakthroughs} breakthroughs.`,
      };
    }),

  seedNamedLocations: protectedProcedure
    .input(
      z.object({
        names: z.array(CSVLangRow),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      //eslint-disable-next-line drizzle/enforce-delete-with-where
      await ctx.db.delete(namedLocations);
      await ctx.db.insert(namedLocations).values(
        input.names.map((row) => ({
          name_en: row.name_en,
          name_br: row.name_br,
          name_fr: row.name_fr,
          name_ge: row.name_ge,
          name_po: row.name_po,
          name_ru: row.name_ru,
          name_sc: row.name_sc,
          name_sp: row.name_sp,
        })),
      );
    }),

  seedBreakthroughs: protectedProcedure
    .input(
      z.object({
        names: z.array(CSVLangRow),
        descs: z.array(CSVLangRow),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      //eslint-disable-next-line drizzle/enforce-delete-with-where
      await ctx.db.delete(breakthroughs);
      await ctx.db.insert(breakthroughs).values(
        input.names.map((row, i) => ({
          name_en: row.name_en,
          name_br: row.name_br,
          name_fr: row.name_fr,
          name_ge: row.name_ge,
          name_po: row.name_po,
          name_ru: row.name_ru,
          name_sc: row.name_sc,
          name_sp: row.name_sp,
          desc_en: input.descs[i]!.name_en,
          desc_br: input.descs[i]!.name_br,
          desc_fr: input.descs[i]!.name_fr,
          desc_ge: input.descs[i]!.name_ge,
          desc_po: input.descs[i]!.name_po,
          desc_ru: input.descs[i]!.name_ru,
          desc_sc: input.descs[i]!.name_sc,
          desc_sp: input.descs[i]!.name_sp,
        })),
      );
    }),

  getFirstHundredLocations: publicProcedure.query(async ({ ctx }) => {
    const locations = await ctx.db.query.locations.findMany({
      limit: 100,
      with: {
        namedLoc: true,
        bts_loc: { with: { bt: true, ver: true } },
      },
    });
    return locations;
  }),
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
