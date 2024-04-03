import { Pressable, Text, View } from "react-native";
import { useEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";

type RadioButtonProps = {
  data: { label: string; value: string }[];
  onSelect: (value: string) => void;
  defaultValue?: string;
};

export const RadioButton = ({
  data,
  onSelect,
  defaultValue = data[0].value,
}: RadioButtonProps) => {
  const [userOption, setUserOption] = useState<string>(defaultValue);

  const handleSelection = (value: string) => {
    onSelect(value);
    setUserOption(value);
  };

  return (
    <View className="gap-1">
      {data.map((item) => (
        <Pressable
          key={item.value}
          onPress={() => handleSelection(item.value)}
          className={`flex-row items-center justify-between p-5 rounded-lg active:bg-[##eff3ec50] ${
            userOption === item.value ? "bg-surface" : ""
          }`}
        >
          <Text className="text-lg">{item.label}</Text>
          {userOption === item.value && (
            <Ionicons name="checkmark" size={24} color="green" />
          )}
        </Pressable>
      ))}
    </View>
  );
};
