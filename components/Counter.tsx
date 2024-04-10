import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Controller, UseControllerProps, useController } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

import { InsertPlantFieldValues } from "@/lib/form";

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
  const [count, setCount] = useState(props.defaultValue as number);

  const { field, fieldState, formState } = useController(props);

  const minus = () => {
    setCount((prev) => {
      const value = Math.max(min, prev - increment);
      field.onChange(value);
      return value;
    });
  };

  const add = () => {
    setCount((prev) => {
      const value = prev + increment;
      field.onChange(value);
      return value;
    });
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
          disabled={count <= min}
          className="rounded-lg bg-[#eef0eb] p-2 disabled:bg-red-100"
        >
          <Feather name="minus" size={COUNTER_SIZE} color="#3e5e5e" />
        </Pressable>
        {/* Count */}
        <Text className="text-xl font-bold text-onSurfaceVariant">
          {field.value}
        </Text>
        {/* Increment */}
        <Pressable
          hitSlop={10}
          onPress={add}
          disabled={count >= max}
          className="rounded-lg  bg-[#eef0eb] p-2  disabled:bg-red-100"
        >
          <Feather name="plus" size={COUNTER_SIZE} color="#3e5e5e" />
        </Pressable>
      </View>
      {/* Unit */}
      <Text className="text-xl text-[#212121]">{unit}</Text>
    </View>
  );
};
