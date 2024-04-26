import { eq } from "drizzle-orm";
import { create } from "zustand";

import { usePlantStore } from "./usePlantStore";

import db from "@/db/client";
import { type InsertPlant, plants, SelectPlant } from "@/db/schema";
import {
  getTimestampMsNDaysFromNow,
  removeScheduledNotification,
  schedulePushNotification,
} from "@/utils";

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
      savePlant: async (plant) => {
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

        const notificationId = await schedulePushNotification({
          content: {
            title: `Water ${alias}`,
            body: `It's time to water your ${alias}!`,
            data: { plantId: plant.id },
          },
          trigger: {
            seconds: period * 24 * 60 * 60,
            repeats: true,
            channelId: "default",
          },
        });

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
            notificationId,
          })
          .run();

        // Refetch the plants (usePlantStore)
        usePlantStore.getState().actions.refetch();
      },
      deletePlant: (id) => {
        const data = db
          .selectDistinct({
            notificationId: plants.notificationId,
            image: plants.image,
          })
          .from(plants)
          .where(eq(plants.id, id))
          .get();

        console.log(data);

        if (!data || !data.notificationId) {
          throw new Error("identifier not found");
        }

        removeScheduledNotification(data.notificationId)
          .then(() => {
            db.delete(plants).where(eq(plants.id, id)).run();
            usePlantStore.getState().actions.refetch();
          })
          .catch((error) => {
            console.log("Error deleting plant: ", error);
          });

        // Refetch the plants (usePlantStore)
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

        // Refetch the plants (usePlantStore)
        usePlantStore.getState().actions.refetch();
      },
      editTask: (id: string, period: number) => {
        const task = getTimestampMsNDaysFromNow(period);

        db.update(plants)
          .set({
            task,
          })
          .where(eq(plants.id, id))
          .run();
        usePlantStore.getState().actions.taskSorting();
      },
    },
  };
});

export const useEditPlantActions = () =>
  useEditPlantStore((state) => state.actions);
