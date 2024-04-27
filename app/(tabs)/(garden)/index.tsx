import { FlashList } from "@shopify/flash-list";
import React from "react";
import { View } from "react-native";

import { SimplePlantCard, EmptyPlantListComponent } from "@/components";
import { usePlantStore } from "@/hooks";

export default function Garden() {
  const { plants } = usePlantStore();

  return (
    <View className="flex-1 px-5">
      <FlashList
        showsVerticalScrollIndicator={false}
        data={plants}
        renderItem={({ item }) => <SimplePlantCard plant={item} />}
        ItemSeparatorComponent={() => <View className="h-5" />}
        keyExtractor={(item) => item.id}
        estimatedItemSize={140}
        ListEmptyComponent={EmptyPlantListComponent}
      />
    </View>
  );
}
