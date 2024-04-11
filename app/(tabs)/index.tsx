import BottomSheet from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
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
import { DATA } from "@/constants/SampleData";
import { usePlantStore, usePlants } from "@/hooks/usePlantStore";

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
        data={plants}
        ListHeaderComponent={() => (
          <>
            {/* Title */}
            <View className="py-5">
              <Text className="text-5xl font-bold text-onSurface">
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
            portion={item.portion}
            image={item.image}
          />
        )}
        estimatedItemSize={140}
        ItemSeparatorComponent={() => <View className="h-5" />}
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

const EmptyListComponent = () => {
  return (
    <View className="my-28 flex-1 items-center justify-center gap-5">
      <LottieView
        style={{ width: 200, height: 200 }}
        autoPlay
        loop
        source={require("@/assets/anim/empty.json")}
      />
      <Text className="text-center text-xl font-bold text-onSurface">
        {"Looks like you have no plants! \n Click on the plus icon to add one."}
      </Text>
      {/* <Link href="/(tabs)/add" className="text-xl text-primary">
        Add new plant
      </Link> */}
    </View>
  );
};
