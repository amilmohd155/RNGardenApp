import { z as zod } from "zod";

export const plantSchema = zod.object({
  plantName: zod.string(),
  room: zod.string(),
  period: zod.coerce.number().int().positive(),
  portion: zod.coerce.number().int().positive(),
  light: zod.enum(["low", "medium", "high"]).optional(),
  notes: zod.string().optional(),
});

export type PlantFV = zod.infer<typeof plantSchema>;
