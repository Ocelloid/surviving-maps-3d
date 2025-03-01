import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
  (name) => `surviving-maps-3d_${name}`,
);

export const locations = createTable("location", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  lat_dir: varchar("lat_dir", { length: 1 }),
  lat_deg: varchar("lat_deg", { length: 3 }),
  lon_dir: varchar("lon_dir", { length: 1 }),
  lon_deg: varchar("lon_deg", { length: 3 }),
  altitude: integer("altitude"),
  named_loc_id: integer("named_loc_id"),
  map_name: varchar("map_name", { length: 256 }),
  topography: varchar("topography", { length: 256 }),
  concrete: integer("concrete"),
  water: integer("water"),
  metals: integer("metals"),
  rare_metals: integer("rare_metals"),
  temperature: integer("temperature"),
  meteors: integer("meteors"),
  dust_devils: integer("dust_devils"),
  dust_storms: integer("dust_storms"),
  cold_waves: integer("cold_waves"),
  difficulty: integer("difficulty"),
});

export const locationsRelations = relations(locations, ({ one }) => ({
  namedLoc: one(namedLocations, {
    fields: [locations.named_loc_id],
    references: [namedLocations.id],
  }),
}));

export const namedLocations = createTable("named_location", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name_en: varchar("name_en", { length: 256 }),
  name_br: varchar("name_br", { length: 256 }),
  name_fr: varchar("name_fr", { length: 256 }),
  name_ge: varchar("name_ge", { length: 256 }),
  name_po: varchar("name_po", { length: 256 }),
  name_ru: varchar("name_ru", { length: 256 }),
  name_sc: varchar("name_sc", { length: 256 }),
  name_sp: varchar("name_sp", { length: 256 }),
});

export const namedLocationsRelations = relations(
  namedLocations,
  ({ many }) => ({
    coordinates: many(locations),
  }),
);

export const breakthroughs = createTable("breakthrough", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name_en: varchar("name_en", { length: 256 }),
  name_br: varchar("name_br", { length: 256 }),
  name_fr: varchar("name_fr", { length: 256 }),
  name_ge: varchar("name_ge", { length: 256 }),
  name_po: varchar("name_po", { length: 256 }),
  name_ru: varchar("name_ru", { length: 256 }),
  name_sc: varchar("name_sc", { length: 256 }),
  name_sp: varchar("name_sp", { length: 256 }),
  desc_en: text("desc_en"),
  desc_br: text("desc_br"),
  desc_fr: text("desc_fr"),
  desc_ge: text("desc_ge"),
  desc_po: text("desc_po"),
  desc_ru: text("desc_ru"),
  desc_sc: text("desc_sc"),
  desc_sp: text("desc_sp"),
});

export const versions = createTable("version", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: varchar("name", { length: 256 }),
});

export const breakthroughsInLocations = createTable(
  "breakthrough_in_location",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    bt_id: integer("bt_id").notNull(),
    loc_id: integer("loc_id").notNull(),
    ver_id: integer("ver_id").notNull(),
  },
);

export const breakthroughsInLocationsRelations = relations(
  breakthroughsInLocations,
  ({ one }) => ({
    bt: one(breakthroughs, {
      fields: [breakthroughsInLocations.bt_id],
      references: [breakthroughs.id],
    }),
    loc: one(locations, {
      fields: [breakthroughsInLocations.loc_id],
      references: [locations.id],
    }),
    ver: one(versions, {
      fields: [breakthroughsInLocations.ver_id],
      references: [versions.id],
    }),
  }),
);

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
