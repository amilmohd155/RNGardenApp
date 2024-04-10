import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import Animated from "react-native-reanimated";

// import { AnimatedImage } from "./AnimatedImage";

import { blurhash } from "@/constants/values";
import Colors from "@/theme/Colors";

type PlantCardProps = {
  id: string;
  scientificName?: string;
  alias: string;
  room: string;
  period: number;
  image: string;
  quantity: number;
};

export const PlantCard = ({
  id,
  scientificName,
  alias,
  room,
  period,
  image,
  quantity,
}: PlantCardProps) => {
  return (
    <Link
      href={{
        pathname: "/(plant)/[id]",
        params: { id },
      }}
      asChild
    >
      <Pressable>
        <View className="bg-secondary flex-row justify-between rounded-xl">
          <View className="justify-between p-5">
            <View className="gap-1">
              {/* Scientific Name */}
              {scientificName && (
                <Text className="text-onTertiaryContainer text-sm font-bold italic">
                  {scientificName}
                </Text>
              )}

              {/* Plant Name */}
              <Text className="text-onSecondary text-xl font-bold">
                {alias}
              </Text>
              {/* Location */}
              <Text className="text-onSecondaryContainer/75 font-semibold">
                {room}
              </Text>
            </View>
            {/* Reminder */}
            <View className="bg-tertiary shrink flex-row items-center gap-1 rounded-2xl p-2">
              <Ionicons
                name="water-outline"
                size={24}
                color={Colors.onTertiaryContainer}
              />
              <Text className="text-onTertiary text-lg font-bold">{`${quantity}ml in ${period} days`}</Text>
            </View>
          </View>
          <Animated.View
            sharedTransitionTag="plant-image"
            className="h-40 w-40"
          >
            <Image
              className="flex-1 rounded-br-xl rounded-tr-xl"
              source={image}
              placeholder={blurhash}
              contentFit="cover"
              transition={1000}
            />
          </Animated.View>
        </View>
      </Pressable>
    </Link>
  );
};
