import { createInsertSchema } from "drizzle-zod";
import { z as zod } from "zod";

import { FIELD_REQUIRED_STR } from "@/constants/values";
import { plants } from "@/db/schema";

// export const insertPlantSchema = createInsertSchema(plants, {
//   alias: (schema) =>
//     schema.alias.min(1, { message: FIELD_REQUIRED_STR }).trim(),
//   room: (schema) => schema.room.min(1, { message: FIELD_REQUIRED_STR }).trim(),
//   period: (schema) => schema.period.int().positive(),
//   portion: (schema) => schema.portion.int().positive(),
//   notes: (schema) => schema.notes.trim().optional(),
// });

// export const insertPlantSchema = zod.object({
//   plantName: zod
//     .string({
//       invalid_type_error: "Please enter a valid plant name",
//       required_error: FIELD_REQUIRED_STR,
//     })
//     .min(1, { message: FIELD_REQUIRED_STR })
//     .trim(),
//   room: zod
//     .string({
//       invalid_type_error: "Please enter a valid room",
//       required_error: FIELD_REQUIRED_STR,
//     })
//     .min(1, { message: FIELD_REQUIRED_STR })
//     .trim(),
//   period: zod.coerce.number().int().positive(),
//   portion: zod.coerce.number().int().positive(),
//   light: zod.enum(lightConditions).optional(),
//   notes: zod.string().trim().optional(),
// });

export type InsertPlantFieldValues = zod.infer<typeof insertPlantSchema>;
