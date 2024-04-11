import { cva } from "class-variance-authority";
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

  const textInputStyle = cva(
    `rounded-lg border-2 p-3 text-lg text-onSurfaceVariant {}-[placeholderTextColor]:color-onSurfaceVariant/50 ${
      error ? "border-error-500" : "border-outline"
    }`,
  )();

  return (
    <View className="gap-2">
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-bold text-onSurfaceVariant">{label}</Text>
        {error && (
          <Text className="text-sm italic text-error-500">Required</Text>
        )}
      </View>

      <DefaultTextInput
        {...field}
        {...props}
        className={textInputStyle}
        onChangeText={onChange}
        value={value?.toString()}
      />
    </View>
  );
};
