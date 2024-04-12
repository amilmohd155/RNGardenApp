import { Feather } from "@expo/vector-icons";
import { UseControllerProps, useController } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

import { InsertPlantFieldValues } from "@/types/form";

const COUNTER_SIZE = 24;

export const Counter = ({
  label,
  unit,
  increment = 1,
  min = 1,
  max = 10,
  ...props
}: {
  label: string;
  unit: string;
  min?: number;
  max?: number;
  increment?: number;
} & UseControllerProps<InsertPlantFieldValues>) => {
  const {
    field: { value, onChange },
  } = useController(props);

  const minus = () => {
    onChange(Math.max(min, (value as number) - increment));
  };

  const add = () => {
    onChange(Math.min(max, (value as number) + increment));
  };

  return (
    <View className="flex-row items-center gap-5 py-1">
      {/* Label */}
      <Text className="text-xl font-bold text-onSurfaceVariant">{label}</Text>
      {/* Counter */}
      <View className="flex-row items-center gap-3">
        {/* Decrement */}
        <Pressable
          hitSlop={10}
          onPress={minus}
          disabled={(value as number) <= min}
          className="rounded-lg bg-[#eef0eb] p-2 disabled:bg-red-100"
        >
          <Feather name="minus" size={COUNTER_SIZE} color="#3e5e5e" />
        </Pressable>
        {/* Count */}
        <Text className="text-xl font-bold text-onSurfaceVariant">{value}</Text>
        {/* Increment */}
        <Pressable
          hitSlop={10}
          onPress={add}
          disabled={(value as number) >= max}
          className="rounded-lg  bg-[#eef0eb] p-2  disabled:bg-red-100"
        >
          <Feather name="plus" size={COUNTER_SIZE} color="#3e5e5e" />
        </Pressable>
      </View>
      {/* Unit */}
      <Text className="text-xl text-onSurfaceVariant/50">{unit}</Text>
    </View>
  );
};
