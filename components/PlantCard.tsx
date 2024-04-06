import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import Animated from "react-native-reanimated";

import { AnimatedImage } from "./AnimatedImage";

import { blurhash } from "@/constants/values";

type PlantCardProps = {
  id: string;
  name: string;
  location: string;
  rate: string;
  image: string;
};

export const PlantCard = ({
  id,
  name,
  location,
  rate,
  image,
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
        <View className="flex-row justify-between rounded-xl bg-white">
          <View className="flex-1 justify-between p-5">
            <View className="gap-1">
              {/* Plant Name */}
              <Text className="text-xl font-bold text-[#374544]">{name}</Text>
              {/* Location */}
              <Text className="font-semibold text-[#486766]">{location}</Text>
            </View>
            {/* Reminder */}
            <View className="shrink flex-row items-center gap-1 rounded-2xl bg-[#eff6fe] p-2">
              <Ionicons name="water-outline" size={24} color="#5584cd" />
              <Text className="text-lg font-bold text-[#5584cd]">{`in ${rate} days`}</Text>
            </View>
          </View>
          <AnimatedImage
            sharedTransitionTag="plant-image"
            className="h-40 w-40 rounded-br-xl rounded-tr-xl"
            source={image}
            placeholder={blurhash}
            contentFit="cover"
            transition={1000}
          />
        </View>
      </Pressable>
    </Link>
  );
};
