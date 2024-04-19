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
const iconClassName = cva("{}-[color]: color-inverseOnSurface")();

const HEIGHT = 150;

type ImageCardProps = {
  getDetails: (details: any) => void;
} & UseControllerProps<InsertPlantFieldValues>;

export const ImageCard = ({ getDetails, ...props }: ImageCardProps) => {
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
          deleteImage(prev);
        }
        return uri;
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

  const selectedImageStyle = useAnimatedStyle(() => {
    selectedOpacity.value = withTiming(value ? 1 : 0, { duration: 500 });
    selectedHeight.value = withTiming(value ? HEIGHT + 60 : 0, {
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
    getDetails(details);
    // console.log(details);
  }, [getDetails, value]);

  return (
    <>
      {/* After Image selection */}
      <Animated.View
        style={selectedImageStyle}
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
          className="{}-[color]: absolute right-2 top-2 rounded-xl bg-inverseSurface p-2 shadow-xl shadow-black color-inverseOnSurface active:bg-inverseSurface/50"
          onPress={pickImage}
        />
        {/* Get plant details */}
        <Pressable
          onPress={handleGetPlantDetails}
          className="mt-2 flex-1 flex-row items-center justify-center gap-5 rounded-xl bg-tertiaryContainer px-5 py-3 active:bg-primary-900"
        >
          <Ionicons name="cloud-upload" size={32} className={iconClassName} />
          <Text className={labelClassname}>Get plant details</Text>
        </Pressable>
      </Animated.View>
      {/* Initial selection */}
      <Animated.View style={initialContainerStyle}>
        <Pressable
          onPress={pickImage}
          className="flex-1 items-center justify-center rounded-xl bg-inverseSurface active:bg-inverseSurface/50"
        >
          <Ionicons name="camera" size={50} className={iconClassName} />
          <Text className="text-center text-2xl font-bold text-inverseOnSurface">
            Tap to upload the photo
          </Text>
        </Pressable>
      </Animated.View>
    </>
  );
};
