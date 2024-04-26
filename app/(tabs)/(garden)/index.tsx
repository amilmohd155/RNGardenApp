import { FlashList } from "@shopify/flash-list";
import React from "react";
import { View } from "react-native";

import { SimplePlantCard, EmptyPlantListComponent } from "@/components";
import { usePlantStore } from "@/hooks";

import * as Notifications from "expo-notifications";

export default function Garden() {
  const { plants } = usePlantStore();

  // console.log("plants", plants);

  // Notifications.getAllScheduledNotificationsAsync().then((val) => {
  //   console.log(
  //     "scheduled Notification",
  //     val.map((v) => v.identifier),
  //   );
  // });

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
