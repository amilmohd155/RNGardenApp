import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PagerView from "react-native-pager-view";

import { FilterButton, SearchBar, FilterBottomSheet } from "@/components";
import { usePlantStore } from "@/hooks/usePlantStore";
import { PlantListPage } from "@/pages";

export default function Garden() {
  const insets = useSafeAreaInsets();

  // Bottom Sheet Ref
  const filterSheetRef = useRef<BottomSheet>(null);
  const {
    actions: { sortPlants },
  } = usePlantStore();

  const handleSortChange = useCallback(
    (value: string) => {
      sortPlants(value);
    },
    [sortPlants],
  );

  // * Render
  return (
    <View className="flex-1 bg-surface px-5">
      <PlantListPage />
    </View>
    // <View
    //   className="flex-1 bg-surface p-5"
    //   style={{
    //     paddingTop: insets.top + 10,
    //   }}
    // >
    //   {/* Title */}
    //   <View className="py-5">
    //     <Text className="text-5xl font-bold text-onSurface">My garden</Text>
    //   </View>
    //   {/* Search Bar & Filter */}
    //   <View className="flex-row items-center gap-4 pb-5">
    //     <SearchBar />
    //     <FilterButton onPress={() => filterSheetRef.current?.expand()} />
    //   </View>
    //   {/* List */}

    //   {/* Filter Bottom Sheet */}
    //   <FilterBottomSheet
    //     ref={filterSheetRef}
    //     onSortChange={handleSortChange}
    //     onStatusChange={(val) => console.log("onStatusChange", val)}
    //   />
    // </View>
  );
}
