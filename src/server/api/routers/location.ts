/* eslint-disable drizzle/enforce-delete-with-where */
import { and, eq, inArray, gte, lte, type SQL, count, desc } from "drizzle-orm";
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
  "Breakthrough 1": z.string().optional(),
  "Breakthrough 2": z.string().optional(),
  "Breakthrough 3": z.string().optional(),
  "Breakthrough 4": z.string().optional(),
  "Breakthrough 5": z.string().optional(),
  "Breakthrough 6": z.string().optional(),
  "Breakthrough 7": z.string().optional(),
  "Breakthrough 8": z.string().optional(),
  "Breakthrough 9": z.string().optional(),
  "Breakthrough 10": z.string().optional(),
  "Breakthrough 11": z.string().optional(),
  "Breakthrough 12": z.string().optional(),
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

export type Location = {
  id?: number;
  lat_dir: string | null;
  lat_deg: string | null;
  lon_dir: string | null;
  lon_deg: string | null;
  altitude: number | null;
  named_loc_id?: number | null;
  map_name: string | null;
  topography: string | null;
  concrete: number | null;
  water: number | null;
  metals: number | null;
  rare_metals: number | null;
  temperature: number | null;
  meteors: number | null;
  dust_devils: number | null;
  dust_storms: number | null;
  cold_waves: number | null;
  difficulty: number | null;
  bts_loc?: BreakthroughInLocation[];
  namedLoc?: NamedLocation | null;
};

export type NamedLocation = {
  id: number;
  name_en: string | null;
  name_br: string | null;
  name_fr: string | null;
  name_ge: string | null;
  name_po: string | null;
  name_ru: string | null;
  name_sc: string | null;
  name_sp: string | null;
  coordinates?: Location[];
};

type BreakthroughInLocation = {
  id: number;
  bt_id: number | null;
  loc_id: number | null;
  ver_id: number | null;
  bt?: Breakthrough | null;
  loc?: Location | null;
  ver?: Version | null;
};

export type Breakthrough = {
  id: number;
  name_en: string | null;
  name_br: string | null;
  name_fr: string | null;
  name_ge: string | null;
  name_po: string | null;
  name_ru: string | null;
  name_sc: string | null;
  name_sp: string | null;
  desc_en: string | null;
  desc_br: string | null;
  desc_fr: string | null;
  desc_ge: string | null;
  desc_po: string | null;
  desc_ru: string | null;
  desc_sc: string | null;
  desc_sp: string | null;
  bts_loc?: BreakthroughInLocation[];
};

export type Version = {
  id: number;
  name: string | null;
  bts_loc?: BreakthroughInLocation[];
};

export const locationRouter = createTRPCRouter({
  clearDB: protectedProcedure.mutation(async ({ ctx }) => {
    ctx.db
      .delete(breakthroughsInLocations)
      .then(() => {
        console.log("deleted breakthroughs in locations");
        ctx.db
          .delete(locations)
          .then(() => {
            console.log("deleted locations");
            ctx.db
              .delete(versions)
              .then(() => {
                console.log("deleted versions");
                console.log("cleared db");
              })
              .catch((err) => {
                console.error(err);
              });
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }),

  getFilteredLocations: publicProcedure
    .input(
      z.object({
        page: z.number(),
        filter: z.object({
          coordinates: z.string().optional(),
          versionId: z.number().nullable().optional(),
          namedLocationIds: z.array(z.number()).optional(),
          mapNames: z.array(z.string()).optional(),
          topographyNames: z.array(z.string()).optional(),
          breakthroughIds: z.array(z.number()).optional(),
          minAltitude: z.number().optional(),
          maxAltitude: z.number().optional(),
          minConcrete: z.number().optional(),
          maxConcrete: z.number().optional(),
          minWater: z.number().optional(),
          maxWater: z.number().optional(),
          minMetals: z.number().optional(),
          maxMetals: z.number().optional(),
          minRareMetals: z.number().optional(),
          maxRareMetals: z.number().optional(),
          minTemperature: z.number().optional(),
          maxTemperature: z.number().optional(),
          minMeteors: z.number().optional(),
          maxMeteors: z.number().optional(),
          minDustDevils: z.number().optional(),
          maxDustDevils: z.number().optional(),
          minDustStorms: z.number().optional(),
          maxDustStorms: z.number().optional(),
          minColdWaves: z.number().optional(),
          maxColdWaves: z.number().optional(),
          minDifficulty: z.number().optional(),
          maxDifficulty: z.number().optional(),
        }),
      }),
    )
    .query(async ({ ctx, input }) => {
      const filters: SQL[] = [];
      const coords = input.filter.coordinates?.split(" ") ?? [];
      if (!!coords[0]) filters.push(eq(locations.lat_dir, coords[0]));
      if (!!coords[1]) filters.push(eq(locations.lat_deg, coords[1]));
      if (!!coords[2]) filters.push(eq(locations.lon_dir, coords[2]));
      if (!!coords[3]) filters.push(eq(locations.lon_deg, coords[3]));

      if (
        !!input.filter.namedLocationIds &&
        input.filter.namedLocationIds.length > 0
      )
        filters.push(
          inArray(locations.named_loc_id, input.filter.namedLocationIds),
        );

      if (!!input.filter.mapNames && input.filter.mapNames.length > 0)
        filters.push(inArray(locations.map_name, input.filter.mapNames));

      if (
        !!input.filter.topographyNames &&
        input.filter.topographyNames.length > 0
      )
        filters.push(
          inArray(locations.topography, input.filter.topographyNames),
        );

      if (
        !!input.filter.breakthroughIds &&
        input.filter.breakthroughIds.length > 0 &&
        input.filter.versionId
      )
        for (const bt_id of input.filter.breakthroughIds) {
          filters.push(
            inArray(
              locations.id,
              ctx.db
                .select({ id: breakthroughsInLocations.loc_id })
                .from(breakthroughsInLocations)
                .where(
                  and(
                    eq(breakthroughsInLocations.bt_id, bt_id),
                    eq(breakthroughsInLocations.ver_id, input.filter.versionId),
                  ),
                ),
            ),
          );
        }

      if (!!input.filter.minAltitude && !!input.filter.maxAltitude) {
        filters.push(gte(locations.altitude, input.filter.minAltitude));
        filters.push(lte(locations.altitude, input.filter.maxAltitude));
      }

      if (!!input.filter.minConcrete && !!input.filter.maxConcrete) {
        filters.push(gte(locations.concrete, input.filter.minConcrete));
        filters.push(lte(locations.concrete, input.filter.maxConcrete));
      }

      if (!!input.filter.minWater && !!input.filter.maxWater) {
        filters.push(gte(locations.water, input.filter.minWater));
        filters.push(lte(locations.water, input.filter.maxWater));
      }

      if (!!input.filter.minMetals && !!input.filter.maxMetals) {
        filters.push(gte(locations.metals, input.filter.minMetals));
        filters.push(lte(locations.metals, input.filter.maxMetals));
      }

      if (!!input.filter.minRareMetals && !!input.filter.maxRareMetals) {
        filters.push(gte(locations.rare_metals, input.filter.minRareMetals));
        filters.push(lte(locations.rare_metals, input.filter.maxRareMetals));
      }

      if (!!input.filter.minTemperature && !!input.filter.maxTemperature) {
        filters.push(gte(locations.temperature, input.filter.minTemperature));
        filters.push(lte(locations.temperature, input.filter.maxTemperature));
      }

      if (!!input.filter.minMeteors && !!input.filter.maxMeteors) {
        filters.push(gte(locations.meteors, input.filter.minMeteors));
        filters.push(lte(locations.meteors, input.filter.maxMeteors));
      }

      if (!!input.filter.minDustDevils && !!input.filter.maxDustDevils) {
        filters.push(gte(locations.dust_devils, input.filter.minDustDevils));
        filters.push(lte(locations.dust_devils, input.filter.maxDustDevils));
      }

      if (!!input.filter.minDustStorms && !!input.filter.maxDustStorms) {
        filters.push(gte(locations.dust_storms, input.filter.minDustStorms));
        filters.push(lte(locations.dust_storms, input.filter.maxDustStorms));
      }

      if (!!input.filter.minColdWaves && !!input.filter.maxColdWaves) {
        filters.push(gte(locations.cold_waves, input.filter.minColdWaves));
        filters.push(lte(locations.cold_waves, input.filter.maxColdWaves));
      }

      if (!!input.filter.minDifficulty && !!input.filter.maxDifficulty) {
        filters.push(gte(locations.difficulty, input.filter.minDifficulty));
        filters.push(lte(locations.difficulty, input.filter.maxDifficulty));
      }

      const fliteredLocations = await ctx.db.query.locations.findMany({
        limit: 10,
        offset: (input.page - 1) * 10,
        with: {
          namedLoc: true,
        },
        where: and(...filters),
      });
      const countTotal = await ctx.db
        .select({ count: count() })
        .from(locations)
        .where(and(...filters));
      return { locations: fliteredLocations, total: countTotal };
    }),

  getFilterData: publicProcedure.query(async ({ ctx }) => {
    const n = await ctx.db.query.namedLocations.findMany();
    const b = await ctx.db.query.breakthroughs.findMany();
    const v = await ctx.db.query.versions.findMany({
      orderBy: desc(versions.id),
    });
    return { namedLocations: n, breakthroughs: b, versions: v };
  }),

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
      let versionId = oldVersions.find((ver) => ver.name === version)?.id ?? 0;

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
      } else if (input.override) {
        ctx.db
          .delete(breakthroughsInLocations)
          .where(eq(breakthroughsInLocations.ver_id, versionId))
          .then(() => {
            console.log(
              `deleted breakthroughs in locations for the version ${version}`,
            );
            ctx.db
              .delete(versions)
              .where(eq(versions.id, versionId))
              .then(() => {
                console.log(`deleted version ${version}`);
              })
              .catch((err) => {
                console.error(err);
              });
          })
          .catch((err) => {
            console.error(err);
          });
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
        for (let i = 0; i < pendingLocations.length; i += 1000) {
          const batch = pendingLocations.slice(i, i + 1000);
          await ctx.db.insert(locations).values(batch);
          console.log(`added ${batch.length} locations`);
          newLocations.push(...batch);
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
          `added breakthroughs for locations up to ${
            lastLoc
              ? `${lastLoc?.lat_dir} ${lastLoc?.lat_deg} ${lastLoc?.lon_dir} ${lastLoc?.lon_deg}`
              : `${i + pending.length}`
          }`,
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
      const oldBreakthroughs = await ctx.db.query.breakthroughs.findMany();
      if (!oldBreakthroughs.length) {
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
      } else {
        const newBTs = input.names.map((row, i) => ({
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
        }));
        for (const bt of newBTs) {
          if (!oldBreakthroughs.some((b) => b.name_en === bt.name_en)) {
            await ctx.db.insert(breakthroughs).values([bt]);
          } else {
            await ctx.db
              .update(breakthroughs)
              .set(bt)
              .where(eq(breakthroughs.name_en, bt.name_en));
          }
        }
      }
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

  getLocationByCoords: publicProcedure
    .input(
      z.object({
        lat_deg: z.string(),
        lon_deg: z.string(),
        lat_dir: z.string(),
        lon_dir: z.string(),
        versionId: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const location = await ctx.db.query.locations.findFirst({
        where: and(
          eq(locations.lat_deg, input.lat_deg),
          eq(locations.lon_deg, input.lon_deg),
          eq(locations.lat_dir, input.lat_dir),
          eq(locations.lon_dir, input.lon_dir),
        ),
        with: {
          namedLoc: true,
          bts_loc: {
            with: { bt: true, ver: true },
            where: (breakthroughsInLocations, { eq }) =>
              eq(breakthroughsInLocations.ver_id, input.versionId),
          },
        },
      });
      return location;
    }),
});
