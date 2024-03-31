import { StyleSheet, Text, TextInput, View } from "react-native";

import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { PlantCard } from "@/components/PlantCard";
import { SafeAreaView } from "react-native-safe-area-context";

const DATA = [
  {
    name: "Beavertail Cactus",
    location: "Bedroom's windowsill",
    rate: "2",
    image: "https://picsum.photos/seed/696/3000/2000",
  },
  {
    name: "Vatikalive Canna",
    location: "Kitchen's windowsill",
    rate: "1",
    image: "https://picsum.photos/seed/698/3000/2000",
  },
];

export default function Garden() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 bg-[#eff3ec] p-5">
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
              key={item.name}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
