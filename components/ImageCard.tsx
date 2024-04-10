import { Ionicons } from "@expo/vector-icons";
import { cva } from "class-variance-authority";
import { UseControllerProps } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

import { InsertPlantFieldValues } from "@/lib/form";

export const ImageCard = (
  props: UseControllerProps<InsertPlantFieldValues>,
) => {
  const iconStyle = cva("{}-[color]: color-inverseOnSurface")();

  return (
    <Pressable className="my-5 items-center rounded-xl bg-inverseSurface py-10 active:bg-inverseSurface/50">
      <Ionicons name="camera" size={50} className={iconStyle} />
      <Text className="text-center text-2xl font-bold text-inverseOnSurface">
        Tap to upload the photo
      </Text>
    </Pressable>
  );
};
