import { Controller, UseControllerProps, useController } from "react-hook-form";
import {
  TextInput as DefaultTextInput,
  Text,
  TextInputProps,
  View,
} from "react-native";

import { PlantFV } from "@/lib/Form";
import React from "react";

export const TextInput = ({
  label,
  ...props
}: { label: string } & UseControllerProps<PlantFV> & TextInputProps) => {
  const {
    field: { value, onChange, ...field },
    fieldState,
    formState,
  } = useController<PlantFV>(props);

  return (
    <View className="gap-2">
      <Text className="text-xl font-bold">{label}</Text>
      <DefaultTextInput
        {...field}
        {...props}
        className="border-[#ece5e5] focus:border-primary border-2 p-3 rounded-lg text-lg"
        placeholderClassName="text-[#9c9b9c]"
        onChangeText={onChange}
        value={value?.toString()}
      />
    </View>
  );
};
