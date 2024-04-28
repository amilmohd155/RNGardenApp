import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuid } from "uuid";

import { LightConditionsAsArray } from "@/constants/values";

export const plants = sqliteTable(
  "plants",
  {
    id: text("id")
      .$defaultFn(() => uuid())
      .primaryKey(),
    alias: text("alias").notNull(),
    room: text("room").notNull(),
    period: integer("period").notNull(),
    // task: integer("task", { mode: "timestamp_ms" }).notNull(),
    portion: integer("portion").notNull(),
    lightCondition: text("light_condition", {
      enum: LightConditionsAsArray,
    }),
    notes: text("notes"),
    image: text("image"),
    scientificName: text("scientific_name"),
    description: text("description"),
    descriptionCitation: text("description_source"),
    plantAccessToken: text("plant_access_token"),
    notificationId: text("notification_id"),
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
