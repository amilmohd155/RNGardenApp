import React from "react";
import { UseControllerProps, useController } from "react-hook-form";
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
  } = useController<InsertPlantFieldValues>(props);

  return (
    <View className="gap-2">
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-bold">{label}</Text>
        {error && <Text className="text-sm italic text-red-500">Required</Text>}
      </View>

      <DefaultTextInput
        {...field}
        {...props}
        className={`rounded-lg border-2 p-3 text-lg focus:border-primary ${
          error ? "border-red-500" : "border-[#ece5e5]"
        }`}
        placeholderClassName="text-[#9c9b9c]"
        onChangeText={onChange}
        value={value?.toString()}
      />
    </View>
  );
};
