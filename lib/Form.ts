import { z as zod } from "zod";

const lightConditions = [
  "Bright Indirect",
  "Bright Direct",
  "Low Light",
] as const;

export const plantSchema = zod.object({
  plantName: zod.string().trim(),
  room: zod.string().trim(),
  period: zod.coerce.number().int().positive(),
  portion: zod.coerce.number().int().positive(),
  light: zod.enum(lightConditions).optional(),
  notes: zod.string().trim().optional(),
});

export type PlantFV = zod.infer<typeof plantSchema>;
