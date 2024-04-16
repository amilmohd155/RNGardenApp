import BottomSheet from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import LottieView from "lottie-react-native";
import React, { useCallback, useEffect, useRef } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  FilterButton,
  SearchBar,
  PlantCard,
  FilterBottomSheet,
} from "@/components";
import { usePlantStore } from "@/hooks/usePlantStore";

export default function Garden() {
  const insets = useSafeAreaInsets();

  // Bottom Sheet Ref
  const filterSheetRef = useRef<BottomSheet>(null);
  const {
    plants,
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
    <View
      className="bg-surface flex-1 p-5"
      style={{
        paddingTop: insets.top + 10,
      }}
    >
      {/* Title */}
      <View className="py-5">
        <Text className="text-onSurface text-5xl font-bold">My garden</Text>
      </View>
      {/* Search Bar & Filter */}
      <View className="flex-row items-center gap-4 pb-5">
        <SearchBar />
        <FilterButton onPress={() => filterSheetRef.current?.expand()} />
      </View>
      {/* List */}
      <FlashList
        contentContainerStyle={{
          paddingBottom: 80,
        }}
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
          />
        )}
        keyExtractor={(item) => item.id}
        estimatedItemSize={140}
        ItemSeparatorComponent={Seperator}
        ListEmptyComponent={EmptyListComponent}
      />
      {/* Filter Bottom Sheet */}
      <FilterBottomSheet
        ref={filterSheetRef}
        onSortChange={handleSortChange}
        onStatusChange={(val) => console.log("onStatusChange", val)}
      />
    </View>
  );
}

const Seperator = () => {
  return <View className="h-5" />;
};

const EmptyListComponent = () => {
  return (
    <View className="my-28 flex-1 items-center justify-center gap-5">
      <LottieView
        style={{ width: 200, height: 200 }}
        autoPlay
        loop
        source={require("@/assets/anim/empty.json")}
      />
      <Text className="text-onSurface text-center text-xl font-bold">
        {"Looks like you have no plants! \n Click on the plus icon to add one."}
      </Text>
    </View>
  );
};
