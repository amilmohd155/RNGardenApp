import BottomSheet from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import React, { useRef } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  FilterButton,
  SearchBar,
  PlantCard,
  FilterBottomSheet,
} from "@/components";
import { DATA } from "@/constants/SampleData";

export default function Garden() {
  const inset = useSafeAreaInsets();

  // Bottom Sheet Ref
  const filterSheetRef = useRef<BottomSheet>(null);

  return (
    <View className="flex-1 bg-surface p-5" style={{ paddingTop: inset.top }}>
      {/* Title */}
      <View className="py-5">
        <Text className="text-5xl font-bold text-[#374544]">My garden</Text>
      </View>
      {/* Search Bar & Filter */}
      <View className="flex-row items-center gap-4 pb-5">
        <SearchBar />
        <FilterButton onPress={() => filterSheetRef.current?.expand()} />
      </View>
      {/* List */}
      <FlashList
        data={DATA}
        renderItem={({ item }) => (
          <PlantCard
            id={item.id}
            key={item.id}
            rate={item.rate}
            location={item.location}
            name={item.name}
            image={item.image}
          />
        )}
        estimatedItemSize={DATA.length}
        ItemSeparatorComponent={() => <View className="h-5" />}
      />
      {/* Filter Bottom Sheet */}
      <FilterBottomSheet ref={filterSheetRef} />
    </View>
  );
}
