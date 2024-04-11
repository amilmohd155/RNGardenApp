import { Ionicons } from "@expo/vector-icons";
import { cva } from "class-variance-authority";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useEffect, useState } from "react";
import { UseControllerProps, useController } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

import { InsertPlantFieldValues } from "@/lib/form";

export const ImageCard = (
  props: UseControllerProps<InsertPlantFieldValues>,
) => {
  const iconStyle = cva("{}-[color]: color-inverseOnSurface")();

  const {
    field: { onChange, value },
  } = useController({ ...props });

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  }, [onChange]);

  return (
    <>
      {value ? (
        <View className="my-5 h-[150] flex-1 items-center justify-center overflow-hidden rounded-xl">
          <Image
            source={value}
            className="h-full w-full"
            contentFit="cover"
            contentPosition="center"
          />
          <Ionicons
            onPress={pickImage}
            name="camera"
            size={32}
            color="#fff"
            className="absolute right-1 top-1 rounded-xl bg-primary-950 p-2 shadow-xl active:bg-primary-900"
          />
        </View>
      ) : (
        <Pressable
          onPress={pickImage}
          className="my-5 h-[150] items-center justify-center rounded-xl bg-inverseSurface active:bg-inverseSurface/50"
        >
          <Ionicons name="camera" size={50} className={iconStyle} />
          <Text className="text-center text-2xl font-bold text-inverseOnSurface">
            Tap to upload the photo
          </Text>
        </Pressable>
      )}
    </>
  );
};
