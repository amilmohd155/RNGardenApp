import BottomSheet from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { useRef, useCallback } from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FilterBottomSheet, FilterButton } from "./Filter";
import SearchBar from "./SearchBar";

import { usePlantStore } from "@/hooks";

export const GardenHeader = () => {
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

  return (
    <View
      className="px-5"
      style={{
        paddingTop: insets.top + 10,
      }}
    >
      {/* Title */}
      <View className="py-5">
        <Text className="text-5xl font-bold text-onSurface">My garden</Text>
      </View>
      {/* Search Bar & Filter */}
      <View className="flex-row items-center gap-4 pb-5">
        <SearchBar />
        <FilterButton onPress={() => filterSheetRef.current?.expand()} />
      </View>
      {/* List */}

      {/* Filter Bottom Sheet */}
      <Portal>
        <FilterBottomSheet
          ref={filterSheetRef}
          onSortChange={handleSortChange}
          onStatusChange={(val) => console.log("onStatusChange", val)}
        />
      </Portal>
    </View>
  );
};
