import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StyleSheet, Text, TextInput, View } from "react-native";

import Colors from "@/constants/Colors";
import { DATA } from "@/constants/SampleData";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { PlantCard } from "@/components/PlantCard";
import { StatusBar } from "expo-status-bar";

export default function Garden() {
  const inset = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-surface p-5" style={{ paddingTop: inset.top }}>
      {/* Title */}
      <View className="py-5">
        <Text className="text-[#374544] font-bold text-5xl">My garden</Text>
      </View>
      {/* Search Bar & Filter */}
      <View className="flex-row gap-4 items-center pb-5">
        <View className="flex-1 flex-row bg-white p-3 rounded-lg shadow-sm items-center justify-between">
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
          className="bg-white p-3 rounded-lg "
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
