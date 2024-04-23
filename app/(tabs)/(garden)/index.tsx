import React from "react";
import { View } from "react-native";

import { PlantListPage } from "@/pages";

export default function Garden() {
  return (
    <View className="flex-1 bg-surface px-5">
      <PlantListPage />
    </View>
  );
}
