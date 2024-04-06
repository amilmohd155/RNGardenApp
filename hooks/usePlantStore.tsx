import { desc } from "drizzle-orm";
import { create } from "zustand";

import db from "@/db/client";
import { SelectPlant, plants } from "@/db/schema";

type PlantStore = {
  plants: SelectPlant[];
  actions: {
    refetch: () => void;
  };
};

export const usePlantStore = create<PlantStore>()((set) => {
  const fetchStatement = db.select().from(plants).orderBy(desc(plants.alias));

  try {
    return {
      plants: fetchStatement.all(),
      actions: {
        refetch: () => {
          const result = fetchStatement.all();
          console.log("Refetching plants", result);

          // return set({ plants: result });
        },
      },
    };
  } catch (error) {
    console.error(error);
    return {
      plants: [],
      actions: {
        refetch: () => set({ plants: fetchStatement.all() }),
      },
    };
  }
});

export const usePlants = () => usePlantStore((state) => state.plants);
export const usePlantActions = () => usePlantStore((state) => state.actions);
