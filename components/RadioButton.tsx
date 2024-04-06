import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export type RadioOption = {
  label: string;
  value: string;
};

type RadioButtonProps = {
  data: RadioOption[];
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
          className={`flex-row items-center justify-between rounded-lg p-5 active:bg-[##eff3ec50] ${
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
