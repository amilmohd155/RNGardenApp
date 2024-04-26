import { FlashList } from "@shopify/flash-list";
import React from "react";
import { View } from "react-native";

import { PlantCard, EmptyPlantListComponent } from "@/components";
import { usePlantStore } from "@/hooks";
import { getTimestampMsNDaysFromNow } from "@/utils";

export default function Garden() {
  const { plants } = usePlantStore();

  return (
    <View className="flex-1 px-5">
      <FlashList
        showsVerticalScrollIndicator={false}
        data={plants}
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
        ItemSeparatorComponent={() => <View className="h-5" />}
        keyExtractor={(item) => item.id}
        estimatedItemSize={140}
        ListEmptyComponent={EmptyPlantListComponent}
      />
    </View>
  );
}
