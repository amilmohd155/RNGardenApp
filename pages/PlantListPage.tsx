import { FlashList } from "@shopify/flash-list";
import { useCallback } from "react";
import { View } from "react-native";

import { EmptyPlantListComponent, PlantCard } from "@/components";
import { useEditPlantActions, usePlantStore } from "@/hooks";

export const PlantListPage = () => {
  const { deletePlant } = useEditPlantActions();

  const { plants } = usePlantStore();

  const handleOnDismiss = useCallback(
    (id: string) => {
      deletePlant(id);
    },
    [deletePlant],
  );

  return (
    <View className="flex-1">
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
            onDismiss={handleOnDismiss}
          />
        )}
        keyExtractor={(item) => item.id}
        estimatedItemSize={140}
        ListEmptyComponent={EmptyPlantListComponent}
      />
    </View>
  );
};
