import { eq } from "drizzle-orm";
import { create } from "zustand";

import { usePlantStore } from "./usePlantStore";

import db from "@/db/client";
import { type InsertPlant, plants } from "@/db/schema";

type EditPlantStore = {
  actions: {
    savePlant: (plant: InsertPlant) => void;
    deletePlant: (id: string) => void;
  };
};

const useEditPlantStore = create<EditPlantStore>()((set) => {
  return {
    actions: {
      savePlant: (plant) => {
        const {
          alias,
          room,
          period,
          portion,
          lightCondition,
          notes,
          image,
          scientificName,
          description,
          descriptionCitation,
          plantAccessToken,
        } = plant;
        db.insert(plants)
          .values({
            alias,
            room,
            period,
            portion,
            lightCondition,
            notes,
            image,
            description,
            descriptionCitation,
            plantAccessToken,
            scientificName,
          })
          .run();

        // Refetch the plants (usePlantStore)
        usePlantStore.getState().actions.refetch();
      },
      deletePlant: (id) => {
        db.delete(plants).where(eq(plants.id, id)).run();
        // Refetch the plants (usePlantStore)
        usePlantStore.getState().actions.refetch();
      },
    },
  };
});

export const useEditPlantActions = () =>
  useEditPlantStore((state) => state.actions);
