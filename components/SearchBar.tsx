import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

import Colors from "@/theme/Colors";

export const SearchBar = () => {
  return (
    <View className="flex-1 flex-row items-center justify-between rounded-lg bg-white p-3 shadow-sm">
      <TextInput
        className="text-lg"
        placeholder="Search for plants"
        placeholderTextColor="#48676675"
      />
      <Ionicons name="search-outline" size={24} color={Colors.primary[800]} />
    </View>
  );
};
