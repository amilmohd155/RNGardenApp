import { useState } from "react";
import { UseControllerProps, useController } from "react-hook-form";
import { Text, TextInput, TextInputProps, View } from "react-native";

import { InsertPlantFieldValues } from "@/lib/form";

export const TextArea = ({
  label,
  maxLength = 200,
  ...props
}: { label: string } & TextInputProps &
  UseControllerProps<InsertPlantFieldValues>) => {
  const [count, setCount] = useState(0);

  const {
    field,
    fieldState: { error },
  } = useController<InsertPlantFieldValues>(props);

  const handleTextChange = (text: string) => {
    setCount(text.length);
    field.onChange(text);
  };

  return (
    <View className="mb-5 gap-2">
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-bold">{label}</Text>
        {error && <Text className="text-sm italic text-red-500">Required</Text>}
      </View>
      <TextInput
        {...field}
        {...props}
        maxLength={maxLength}
        onChangeText={handleTextChange}
        className="text-pretty rounded-lg border-2 border-[#ece5e5] p-5 align-top text-lg focus:border-primary"
        value={field.value?.toString()}
      />
      {/* Helper */}
      <Text
        className={`-mt-8 me-5 text-right italic ${
          count >= maxLength ? "text-red-500" : "text-gray-500"
        }`}
      >{`${count}/${maxLength}`}</Text>
    </View>
  );
};
