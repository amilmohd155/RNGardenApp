import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { PlantCard } from "@/components/PlantCard";
import { DATA } from "@/constants/SampleData";

export default function Garden() {
  const inset = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-surface p-5" style={{ paddingTop: inset.top }}>
      {/* Title */}
      <View className="py-5">
        <Text className="text-5xl font-bold text-[#374544]">My garden</Text>
      </View>
      {/* Search Bar & Filter */}
      <View className="flex-row items-center gap-4 pb-5">
        <View className="flex-1 flex-row items-center justify-between rounded-lg bg-white p-3 shadow-sm">
          <TextInput
            className="text-lg"
            placeholder="Search for plants"
            placeholderTextColor="#48676675"
          />
          <Ionicons name="search-outline" size={24} color="#486766" />
        </View>
        <Ionicons
          name="filter"
          size={24}
          color="#486766"
          className="rounded-lg bg-white p-3 "
        />
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
    </View>
  );
}
