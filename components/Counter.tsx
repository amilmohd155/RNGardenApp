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
  max = 15,
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
        {/* <Pressable> */}
        <Feather
          name="minus"
          size={COUNTER_SIZE}
          hitSlop={10}
          onPress={minus}
          disabled={(value as number) <= min}
          className="{}-[color]:color-tertiary rounded-lg bg-secondaryContainer p-2 transition-transform active:scale-95 disabled:bg-red-500"
        />
        {/* </Pressable> */}
        {/* Count */}
        <Text className="text-xl font-bold text-onSurface/75">{value}</Text>
        {/* Increment */}
        {/* <Pressable className="group rounded-lg bg-secondaryContainer p-2 transition-transform active:scale-105 disabled:bg-red-500"> */}
        <Feather
          name="plus"
          size={COUNTER_SIZE}
          hitSlop={10}
          onPress={add}
          disabled={(value as number) >= max}
          className="{}-[color]:color-tertiary rounded-lg bg-secondaryContainer p-2 transition-transform active:scale-105 disabled:bg-red-500"
        />
        {/* </Pressable> */}
      </View>
      {/* Unit */}
      <Text className="text-xl text-onSurfaceVariant/50">{unit}</Text>
    </View>
  );
};
