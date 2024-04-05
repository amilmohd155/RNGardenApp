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
    formState,
    field,
    fieldState: { error },
  } = useController<InsertPlantFieldValues>(props);

  const handleTextChange = (text: string) => {
    setCount(text.length);
    field.onChange(text);
  };

  return (
    <View className="gap-2 mb-5">
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-bold">{label}</Text>
        {error && <Text className="text-red-500 text-sm italic">Required</Text>}
      </View>
      <TextInput
        {...field}
        {...props}
        maxLength={maxLength}
        onChangeText={handleTextChange}
        className="border-[#ece5e5] focus:border-primary border-2 p-5 rounded-lg text-lg text-pretty align-top"
        value={field.value?.toString()}
      />
      {/* Helper */}
      <Text
        className={`-mt-8 italic text-right me-5 ${
          count >= maxLength ? "text-red-500" : "text-gray-500"
        }`}
      >{`${count}/${maxLength}`}</Text>
    </View>
  );
};
