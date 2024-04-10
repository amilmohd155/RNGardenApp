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
  const insets = useSafeAreaInsets();

  // Bottom Sheet Ref
  const filterSheetRef = useRef<BottomSheet>(null);

  return (
    <View
      className="flex-1 bg-surface p-5"
      style={{
        paddingTop: insets.top + 10,
      }}
    >
      {/* List */}
      <FlashList
        contentContainerStyle={{
          paddingBottom: 80,
        }}
        showsVerticalScrollIndicator={false}
        data={DATA}
        ListHeaderComponent={() => (
          <>
            {/* Title */}
            <View className="py-5">
              <Text className="text-onSurface text-5xl font-bold">
                My garden
              </Text>
            </View>
            {/* Search Bar & Filter */}
            <View className="flex-row items-center gap-4 pb-5">
              <SearchBar />
              <FilterButton onPress={() => filterSheetRef.current?.expand()} />
            </View>
          </>
        )}
        renderItem={({ item }) => (
          <PlantCard
            id={item.id}
            key={item.id}
            period={item.period}
            room={item.room}
            alias={item.alias}
            scientificName={item.scientificName}
            quantity={item.quantity}
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
