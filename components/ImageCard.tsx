import { Ionicons } from "@expo/vector-icons";
import { cva } from "class-variance-authority";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useCallback } from "react";
import { UseControllerProps, useController } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

import { useFileSystem } from "@/hooks";
import { InsertPlantFieldValues } from "@/types/form";

const pressableClassName = cva(
  "flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-tertiary px-5 py-3 shadow-xl active:bg-primary-900",
)();
const labelClassname = cva("text-lg font-bold text-onTertiaryContainer")();
const iconClassName = cva("{}-[color]: color-inverseOnSurface")();

export const ImageCard = (
  props: UseControllerProps<InsertPlantFieldValues>,
) => {
  const {
    field: { onChange, value },
  } = useController({ ...props });

  const { loading, saveImage, getPlantDetails } = useFileSystem();

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // const uri = await saveImage(result.assets[0].uri);
      onChange(result.assets[0].uri);
    }
  }, [onChange, saveImage]);

  return (
    <>
      {value ? (
        <View className="my-5 gap-2">
          <Image
            source={value}
            className="h-[150] flex-1 items-center justify-center overflow-hidden rounded-xl"
            contentFit="cover"
            contentPosition="center"
          />
          <View className="flex-row gap-5">
            <Pressable className={pressableClassName} onPress={pickImage}>
              <Ionicons name="camera" size={32} className={iconClassName} />
              <Text className={labelClassname}>Change photo</Text>
            </Pressable>
            <Pressable className={pressableClassName}>
              <Ionicons
                onPress={pickImage}
                name="cloud-upload"
                size={32}
                className={iconClassName}
              />
              <Text className={labelClassname}>Get plant details</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <Pressable
          onPress={pickImage}
          className="my-5 h-[150] items-center justify-center rounded-xl bg-inverseSurface active:bg-inverseSurface/50"
        >
          <Ionicons name="camera" size={50} className={iconClassName} />
          <Text className="text-center text-2xl font-bold text-inverseOnSurface">
            Tap to upload the photo
          </Text>
        </Pressable>
      )}
    </>
  );
};
