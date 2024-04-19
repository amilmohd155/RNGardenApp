import { createInsertSchema } from "drizzle-zod";
import { z as zod } from "zod";

import { plants } from "@/db/schema";

export const insertPlantSchema = createInsertSchema(plants).omit({
  description: true,
  id: true,
});

export type InsertPlantFieldValues = zod.infer<typeof insertPlantSchema>;
