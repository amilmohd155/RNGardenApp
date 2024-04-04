import { z as zod } from "zod";

const lightConditions = [
  "Bright Indirect",
  "Bright Direct",
  "Low Light",
] as const;

const FIELD_REQUIRED_STR = "This field is required";

export const plantSchema = zod.object({
  plantName: zod
    .string({
      invalid_type_error: "Please enter a valid plant name",
      required_error: FIELD_REQUIRED_STR,
    })
    .min(1, { message: FIELD_REQUIRED_STR })
    .trim(),
  room: zod
    .string({
      invalid_type_error: "Please enter a valid room",
      required_error: FIELD_REQUIRED_STR,
    })
    .min(1, { message: FIELD_REQUIRED_STR })
    .trim(),
  period: zod.coerce.number().int().positive(),
  portion: zod.coerce.number().int().positive(),
  light: zod.enum(lightConditions).optional(),
  notes: zod.string().trim().optional(),
});

export type PlantFV = zod.infer<typeof plantSchema>;
