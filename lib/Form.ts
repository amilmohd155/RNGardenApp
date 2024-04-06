import { createInsertSchema } from "drizzle-zod";
import { z as zod } from "zod";

import { plants } from "@/db/schema";

// export const insertPlantSchema = zod.object({
//   alias: zod
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
//   light: zod.enum(LightConditionsAsArray).optional(),
//   notes: zod.string().trim().optional(),
// });

export const insertPlantSchema = createInsertSchema(plants);

export type InsertPlantFieldValues = zod.infer<typeof insertPlantSchema>;
