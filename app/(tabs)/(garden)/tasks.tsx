import React from "react";
import { SectionList, View, Text } from "react-native";

import { EmptyTaskListComponent, PlantCard } from "@/components";
import { SelectPlant } from "@/db/schema";
import { usePlantActions, usePlants } from "@/hooks";

type Section = {
  title: string;
  data: SelectPlant[];
};

export default function Tasks() {
  const plants = usePlants();

  const sortedTasks = usePlantActions().taskSorting();

  const sections: Section[] = plants.length
    ? [
        { title: "Today's tasks", data: plants },
        { title: "Upcoming tasks", data: plants },
      ]
    : [];

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
        renderSectionHeader={({ section: { title } }) => (
          <View className="flex-1 rounded-xl">
            <Text className="text-2xl font-bold text-neutral-500">{title}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View className="h-5" />}
        SectionSeparatorComponent={() => <View className="h-5" />}
        ListFooterComponent={() => <View className="h-10" />}
      />
    </View>
  );
}
