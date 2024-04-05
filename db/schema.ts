import { createId } from "@paralleldrive/cuid2";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";

import { LightConditionsAsArray } from "@/constants/values";

export const plants = sqliteTable("plants", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  alias: text("alias").notNull(),
  scientificName: text("scientific_name"),
  room: text("room").notNull(),
  period: integer("period").notNull(),
  portion: integer("portion").notNull(),
  light: text("light_condition", {
    enum: LightConditionsAsArray,
  }).notNull(),
  notes: text("notes"),
});

export const insertPlantSchema = createInsertSchema(plants);

export type InsertPlant = typeof plants.$inferInsert;
