import { asc, eq, ilike, like } from "drizzle-orm";
import { create } from "zustand";

import db from "@/db/client";
import { SelectPlant, plants } from "@/db/schema";

type PlantStore = {
  plants: SelectPlant[];
  actions: {
    refetch: () => void;
    getById: (id: string) => SelectPlant | undefined;
    sortPlants: (sortBy: string) => void;
    searchPlants: (search: string) => void;
  };
};

export const usePlantStore = create<PlantStore>()((set) => {
  const fetchStatement = db.select().from(plants);

  try {
    return {
      plants: db.select().from(plants).all(),
      actions: {
        refetch: () => {
          const result = db.select().from(plants).all();
          console.log("Refetching plants");

          set({ plants: result });
        },
        getById: (id) => {
          const result = db
            .selectDistinct()
            .from(plants)
            .where(eq(plants.id, id))
            .get();
          return result;
        },
        sortPlants: (sortBy: string) => {
          switch (sortBy) {
            case "alias":
              set({
                plants: fetchStatement.orderBy(asc(plants.alias)).all(),
              });
              break;
            case "room":
              set({
                plants: fetchStatement.orderBy(asc(plants.room)).all(),
              });
              break;
            case "period":
              set({
                plants: fetchStatement.orderBy(asc(plants.period)).all(),
              });
              break;
          }
        },
        searchPlants: (search: string) => {
          const result = db
            .select()
            .from(plants)
            .where(like(plants.alias, `%${search.toLowerCase()}%`))
            .all();

          set({ plants: result });
        },
      },
    };
  } catch (error) {
    console.error(error);
    return {
      plants: [],
      actions: {
        refetch: () => set({ plants: fetchStatement.all() }),
        getById: () => {
          console.error("No plant found");
          return undefined;
        },
        sortPlants: () => {
          console.error("No plant found");
        },
        searchPlants: () => {
          console.error("No plant found");
        },
      },
    };
  }
});

export const usePlants = () => usePlantStore((state) => state.plants);
export const usePlantActions = () => usePlantStore((state) => state.actions);
