import React, { useEffect } from "react";
import { SectionList, View, Text } from "react-native";

import { EmptyTaskListComponent, PlantCard } from "@/components";
import { SelectPlant } from "@/db/schema";
import { usePlantActions, useTasks } from "@/hooks";

type Section = {
  title: string;
  data: SelectPlant[];
};

export default function Tasks() {
  const tasks = useTasks();
  const { taskSorting } = usePlantActions();

  useEffect(() => {
    taskSorting();
  }, [taskSorting]);

  const sections: Section[] = tasks && tasks.length ? tasks : [];

  return (
    <View className="flex-1 px-5 pb-10">
      <SectionList
        sections={sections}
        renderItem={({ item }) => (
          <PlantCard
            id={item.id}
            period={item.period}
            room={item.room}
            alias={item.alias}
            scientificName={item.scientificName}
            portion={item.portion}
            image={item.image}
            task={item.task}
          />
        )}
        ListEmptyComponent={<EmptyTaskListComponent />}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({ section: { title, data } }) => (
          <SectionHeader title={title} data={data} />
        )}
        ItemSeparatorComponent={() => <View className="h-5" />}
        SectionSeparatorComponent={() => <View className="h-5" />}
        ListFooterComponent={() => <View className="h-10" />}
      />
    </View>
  );
}

const SectionHeader = ({ title, data }: { title: string; data: any[] }) => {
  if (!data || !data.length) {
    return (
      <View className="flex-1 rounded-xl">
        <Text className="text-2xl font-bold text-neutral-500">{title}</Text>
        <View className="my-14 items-center justify-center">
          <Text className="text-center text-2xl leading-10 text-tertiary">
            {
              "🌱🌱🌱 \n  Plants happy for today!!! \n No watering needed today."
            }
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 rounded-xl">
      <Text className="text-2xl font-bold text-neutral-500">{title}</Text>
    </View>
  );
};
