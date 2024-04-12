import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import Animated from "react-native-reanimated";

// import { AnimatedImage } from "./AnimatedImage";

import { blurhash } from "@/constants/values";
import { SelectPlant } from "@/db/schema";
import Colors from "@/theme/Colors";
import { useState } from "react";

type PlantCardProps = Omit<
  SelectPlant,
  "lightCondition" | "notes" | "description"
>;
// {
//   id: string;
//   scientificName: string | null;
//   alias: string;
//   room: string;
//   period: number;
//   image: string | null;
//   quantity: number | null;
// }

export const PlantCard = ({
  id,
  scientificName,
  alias,
  room,
  period,
  image = "https://picsum.photos/seed/696/3000/2000",
  portion: quantity,
}: PlantCardProps) => {
  const [watered, setWatered] = useState(false);

  return (
    <Link
      href={{
        pathname: "/(plant)/[id]",
        params: { id },
      }}
      asChild
    >
      <Pressable>
        <View className="flex-row justify-between rounded-xl bg-secondary">
          <View className="justify-between p-5">
            <View className="gap-1">
              {/* Scientific Name */}
              {scientificName && (
                <Text className="text-sm font-bold italic text-onTertiary/50">
                  {scientificName}
                </Text>
              )}

              {/* Plant Name */}
              <Text className="text-xl font-bold text-onSecondary">
                {alias}
              </Text>
              {/* Location */}
              <Text className="font-semibold text-onSecondary/75">{room}</Text>
            </View>
            {/* Reminder */}
            <View className="shrink flex-row items-center gap-1 rounded-2xl border-2 border-outline bg-tertiary px-3 py-2">
              <Ionicons
                name="water-outline"
                size={24}
                color={Colors.onTertiaryContainer}
              />
              <Text className="text-lg font-bold text-onTertiary">{`${quantity}ml in ${period} days`}</Text>
            </View>
          </View>
          <Animated.View
            sharedTransitionTag={`plant-image-${id}`}
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
          {/* Watered */}
          <Pressable
            onPress={() => setWatered(!watered)}
            className="absolute bottom-0 right-0 w-40 flex-row items-center gap-2 rounded-br-xl  bg-primary/50 px-4 py-3 active:bg-tertiary"
          >
            <MaterialCommunityIcons
              name="watering-can"
              size={24}
              className="{}-[color]: color-onPrimary"
            />
            <Text className="text-xl font-semibold text-onPrimary">
              {watered ? "Watered" : "Not Watered"}
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </Link>
  );
};
