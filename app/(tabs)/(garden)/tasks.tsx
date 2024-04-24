import React from "react";
import { SectionList, View, Text } from "react-native";

import { PlantCard } from "@/components";
import { SelectPlant } from "@/db/schema";
import { usePlants } from "@/hooks";

type Section = {
  title: string;
  data: SelectPlant[];
};

export default function Tasks() {
  const plant = usePlants();

  const sections: Section[] = [
    // {
    //   title: "Today",
    //   data: plant.filter((item) => item.period === "Today"),
    // },
    // {
    //   title: "Upcoming",
    //   data: plant.filter((item) => item.period === "Upcoming"),
    // },
    { title: "Today's tasks", data: plant },
    { title: "Upcoming tasks", data: plant },
  ];

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
          />
        )}
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
