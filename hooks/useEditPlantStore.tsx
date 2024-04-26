import { eq } from "drizzle-orm";
import { create } from "zustand";

import { usePlantStore } from "./usePlantStore";

import db from "@/db/client";
import { type InsertPlant, plants, SelectPlant } from "@/db/schema";
import { getTimestampMsNDaysFromNow } from "@/utils";

type EditPlantStore = {
  actions: {
    savePlant: (plant: Omit<InsertPlant, "task">) => void;
    deletePlant: (id: string) => void;
    editPlant: (
      plant: Partial<
        Omit<
          SelectPlant,
          | "task"
          | "plantAccessToken"
          | "descriptionCitation"
          | "description"
          | "scientificName"
        >
      >,
    ) => void;
    editTask: (id: string, period: number) => void;
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

        const task = getTimestampMsNDaysFromNow(period);

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
            task,
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
      editPlant: (plant) => {
        db.update(plants)
          .set({
            alias: plant.alias,
            room: plant.room,
            period: plant.period,
            portion: plant.portion,
            lightCondition: plant.lightCondition,
            notes: plant.notes,
            image: plant.image,
            // description: plant.description,
            // descriptionCitation: plant.descriptionCitation,
            // plantAccessToken: plant.plantAccessToken,
            // scientificName: plant.scientificName,
          })
          .where(eq(plants.id, plant.id!))
          .run();
        usePlantStore.getState().actions.taskSorting();
      },
      editTask: (id: string, period: number) => {
        const task = getTimestampMsNDaysFromNow(period);

        db.update(plants)
          .set({
            task,
          })
          .where(eq(plants.id, id))
          .run();
        usePlantStore.getState().actions.refetch();
      },
    },
  };
});

export const useEditPlantActions = () =>
  useEditPlantStore((state) => state.actions);
