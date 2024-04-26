import { Ionicons } from "@expo/vector-icons";
import { cva } from "class-variance-authority";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { UseControllerProps, set, useController } from "react-hook-form";
import { Pressable, Text, View, Image } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useFileSystem } from "@/hooks";
import { InsertPlantFieldValues } from "@/types/form";

const labelClassname = cva("text-lg font-bold text-onTertiaryContainer")();

const HEIGHT = 150;

type ImageCardProps = {
  getDetails?: (details: any) => void;
  edit?: boolean;
} & UseControllerProps<InsertPlantFieldValues>;

export const ImageCard = ({
  getDetails,
  edit = false,
  ...props
}: ImageCardProps) => {
  const {
    field: { onChange, value },
  } = useController(props);

  const [image, setImage] = useState<string | null>(value as string | null);

  const initialHeight = useSharedValue(HEIGHT);
  const initialOpacity = useSharedValue(1);
  const selectedHeight = useSharedValue(0);
  const selectedOpacity = useSharedValue(0);

  const { loading, saveImage, deleteImage, getPlantDetails } = useFileSystem();

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = await saveImage(result.assets[0].uri);

      setImage((prev) => {
        if (prev) {
          deleteImage(prev, true);
        }
        return uri ? uri : null;
      });
      onChange(uri);
    }
  }, [deleteImage, onChange, saveImage]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (image) {
          setImage(null);
        }
      };
    }, []),
  );

  const selectedImageViewStyle = useAnimatedStyle(() => {
    selectedOpacity.value = withTiming(value ? 1 : 0, { duration: 500 });
    selectedHeight.value = edit
      ? withTiming(HEIGHT)
      : withTiming(value ? HEIGHT + 60 : 0, {
          duration: 500,
        });
    const marginTop = withTiming(value ? 20 : 0);

    return {
      opacity: selectedOpacity.value,
      height: selectedHeight.value,
      marginTop,
    };
  });

  const initialContainerStyle = useAnimatedStyle(() => {
    initialOpacity.value = withTiming(value ? 0 : 1);
    initialHeight.value = withTiming(value ? 0 : HEIGHT);
    const marginTop = withTiming(value ? 0 : 20);

    return {
      opacity: initialOpacity.value,
      height: initialHeight.value,
      marginTop,
    };
  });

  const handleGetPlantDetails = useCallback(async () => {
    if (!value) return;
    // const details = await getPlantDetails(value as string);
    const details = {
      commonNames: [
        "Rubber Bush",
        "rubber plant",
        "Rubber Fig",
        "India Rubber Tree",
      ],
      description:
        "Ficus elastica, the rubber fig, rubber bush, rubber tree, rubber plant, or Indian rubber bush, Indian rubber tree, is a species of flowering plant in the family Moraceae, native to eastern parts of South and Southeast Asia. It has become naturalized in Sri Lanka, the West Indies, and the US state of Florida. Despite its common names, it is not used in the commercial production of natural rubber.",
      descriptionCitation: "https://en.wikipedia.org/wiki/Ficus_elastica",
      image: {
        citation:
          "//commons.wikimedia.org/w/index.php?title=User:VuThiAnh&action=edit&redlink=1",
        license_name: "CC0",
        license_url: "https://creativecommons.org/publicdomain/zero/1.0/",
        value:
          "https://plant-id.ams3.cdn.digitaloceanspaces.com/knowledge_base/wikidata/c1d/c1d681588863134660c74faf23da502628da2d40.jpg",
      },
      isPlant: true,
      name: "Ficus elastica",
      plantAccessToken: "0VJQ17DS61KlWEj",
      watering: { max: 2, min: 2 },
    };
    getDetails && getDetails(details);
    // console.log(details);
  }, [getDetails, value]);

  return (
    <>
      {value && (
        // After Image selection
        <Animated.View
          style={selectedImageViewStyle}
          // onLayout={(e) => console.log(e.nativeEvent.layout.height)}
        >
          {/* Image */}

          <Image
            source={{ uri: value as string }}
            className="justify-centern items-center rounded-xl"
            height={HEIGHT}
          />
          {/* Pick Image */}
          <Ionicons
            name="camera"
            size={32}
            className="{}-[color]: absolute right-2 top-2 rounded-xl bg-inverseSurface p-2 shadow-xl shadow-black color-inverseOnSurface active:scale-90 active:bg-inverseSurface/50 active:color-inverseOnSurface/75"
            onPress={pickImage}
          />
          {/* Get plant details */}
          {!edit && (
            <Pressable
              onPress={handleGetPlantDetails}
              className="group mt-2 flex-1 flex-row items-center justify-center gap-5 rounded-xl bg-tertiaryContainer transition-all delay-75 active:scale-95 active:bg-tertiaryContainer/50"
            >
              <Ionicons
                name="cloud-upload"
                size={32}
                className="{}-[color]:color-onTertiaryContainer"
              />
              <Text className="text-xl font-bold text-onTertiaryContainer">
                Get plant details
              </Text>
            </Pressable>
          )}
        </Animated.View>
      )}
      {/* Initial selection */}
      <Animated.View style={initialContainerStyle}>
        <Pressable
          onPress={pickImage}
          className="group flex-1 items-center justify-center rounded-xl bg-tertiary transition-all active:scale-95 active:bg-black/50"
        >
          <Ionicons
            name="camera"
            size={50}
            className="{}-[color]: color-onTertiary group-active:color-white/75"
          />
          <Text className="text-center text-2xl font-bold text-onTertiary group-active:text-white/90">
            Tap to upload the photo
          </Text>
        </Pressable>
      </Animated.View>
    </>
  );
};
