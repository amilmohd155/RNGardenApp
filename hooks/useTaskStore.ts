import { create } from "zustand";

import { TASK_HEADINGS } from "@/constants/enum";
import db from "@/db/client";
import { SelectPlant, plants } from "@/db/schema";
import { getDaysLeft } from "@/utils";

type TaskStore = {
  tasks: { title: TASK_HEADINGS; data: SelectPlant[] }[];
  actions: {
    refetchTasks: () => void;
  };
};

export const useTaskStore = create<TaskStore>()((set, get) => {
  const createTasks = () => {
    const todayTasks: SelectPlant[] = [];
    const upcomingTasks: SelectPlant[] = [];
    const overdueTasks: SelectPlant[] = [];

    const plant = db.select().from(plants).all();

    plant.forEach((plant) => {
      const diff = getDaysLeft(plant.task);

      if (diff === 0) {
        todayTasks.push(plant);
      } else if (diff > 0) {
        upcomingTasks.push(plant);
      } else {
        overdueTasks.push(plant);
      }
    });

    const tasks = [
      { title: TASK_HEADINGS.TODAY, data: todayTasks },
      { title: TASK_HEADINGS.UPCOMING, data: upcomingTasks },
    ];

    if (overdueTasks.length) {
      tasks.unshift({ title: TASK_HEADINGS.OVERDUE, data: overdueTasks });
    }
    const refinedTask = tasks.some((task) => task.data.length > 0) ? tasks : [];

    return refinedTask;
  };

  return {
    tasks: createTasks(),
    actions: {
      refetchTasks: () => {
        set({ tasks: createTasks() });
      },
    },
  };
});

export const useTasks = () => useTaskStore((state) => state.tasks);
export const useTaskActions = () => useTaskStore((state) => state.actions);
