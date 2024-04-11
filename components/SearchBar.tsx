import { Ionicons } from "@expo/vector-icons";
import { cva } from "class-variance-authority";
import { TextInput, View } from "react-native";

import Colors from "@/theme/Colors";

export const SearchBar = () => {
  const textInputStyle = cva(
    "tetx-lg {}-[placeholderTextColor]:color-onSecondary/50 text-onSecondary",
  )();

  return (
    <View className="flex-1 flex-row items-center justify-between rounded-lg bg-secondary p-3 shadow-sm">
      <TextInput
        className={textInputStyle}
        placeholder="Search for plants"
        // placeholderTextColor="#48676675"
      />
      <Ionicons name="search-outline" size={24} color={Colors.primary[800]} />
    </View>
  );
};
