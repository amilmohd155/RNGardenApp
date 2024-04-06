import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { randomUUID } from "expo-crypto";

import { LightConditionsAsArray } from "@/constants/values";

export const plants = sqliteTable(
  "plants",
  {
    id: text("id")
      .$defaultFn(() => randomUUID())
      .primaryKey(),
    alias: text("alias").notNull(),
    scientificName: text("scientific_name"),
    room: text("room").notNull(),
    period: integer("period").notNull(),
    portion: integer("portion").notNull(),
    lightCondition: text("light_condition", {
      enum: LightConditionsAsArray,
    }),
    notes: text("notes"),
  },
  (table) => {
    return {
      aliasIdx: index("alias_idx").on(table.alias),
      scientificNameIdx: index("scientific_name_idx").on(table.scientificName),
      roomIdx: index("room_idx").on(table.room),
    };
  },
);

export type InsertPlant = typeof plants.$inferInsert;
export type SelectPlant = typeof plants.$inferSelect;
