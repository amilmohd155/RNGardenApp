import { asc, eq, like, sql } from "drizzle-orm";
import { create } from "zustand";

import db from "@/db/client";
import { SelectPlant, plants } from "@/db/schema";

type PlantStore = {
  plants: SelectPlant[];
  tasks?: { title: string; data: SelectPlant[] }[];
  actions: {
    refetch: () => void;
    getById: (id: string) => SelectPlant | undefined;
    sortPlants: (sortBy: string) => void;
    searchPlants: (search: string) => void;
    taskSorting: () => void;
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
        taskSorting: () => {
          const today = new Date().toLocaleDateString("en-GB");

          const todayTasks = db
            .select()
            .from(plants)
            .where(sql`${plants.task} = ${today}`)
            .orderBy(asc(plants.task))
            .all();

          const upcomingTasks = db
            .select()
            .from(plants)
            .where(sql`task > ${today}`)
            .orderBy(asc(plants.task))
            .all();

          set({
            tasks: [
              {
                title: "Today's tasks",
                data: todayTasks,
              },
              {
                title: "Upcoming tasks",
                data: upcomingTasks,
              },
            ],
          });
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
          console.error("Get By ID::No plant found");
          return undefined;
        },
        sortPlants: () => {
          console.error("Sort Plants::No plant found");
        },
        searchPlants: () => {
          console.error("Search Plants::No plant found");
        },
        taskSorting: () => {
          console.error("Task Sorting::No plant found");
        },
      },
    };
  }
});

export const usePlants = () => usePlantStore((state) => state.plants);
export const useTasks = () => usePlantStore((state) => state.tasks);
export const usePlantActions = () => usePlantStore((state) => state.actions);
