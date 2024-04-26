import { createInsertSchema } from "drizzle-zod";
import { z as zod } from "zod";

import { plants } from "@/db/schema";

export const insertPlantSchema = createInsertSchema(plants).omit({
  id: true,
  task: true,
});

export type InsertPlantFieldValues = zod.infer<typeof insertPlantSchema>;

export const editPlantSchema = createInsertSchema(plants).omit({
  id: true,
  task: true,
  plantAccessToken: true,
  descriptionCitation: true,
  description: true,
  scientificName: true,
});

export type EditPlantFieldValues = zod.infer<typeof editPlantSchema>;
