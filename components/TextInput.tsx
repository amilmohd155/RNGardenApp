import React, { useEffect } from "react";
import { Controller, UseControllerProps, useController } from "react-hook-form";
import {
  TextInput as DefaultTextInput,
  Text,
  TextInputProps,
  View,
} from "react-native";

import { InsertPlantFieldValues } from "@/lib/form";

export const TextInput = ({
  label,
  ...props
}: { label: string } & UseControllerProps<InsertPlantFieldValues> &
  TextInputProps) => {
  const {
    field: { value, onChange, ...field },
    fieldState: { error },
    formState,
  } = useController<InsertPlantFieldValues>(props);

  return (
    <View className="gap-2">
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-bold">{label}</Text>
        {error && <Text className="text-red-500 text-sm italic">Required</Text>}
      </View>

      <DefaultTextInput
        {...field}
        {...props}
        className={`focus:border-primary border-2 p-3 rounded-lg text-lg ${
          error ? "border-red-500" : "border-[#ece5e5]"
        }`}
        placeholderClassName="text-[#9c9b9c]"
        onChangeText={onChange}
        value={value?.toString()}
      />
    </View>
  );
};
