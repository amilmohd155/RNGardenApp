import { Text, View } from "react-native";

import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { blurhash } from "@/constants/values";

type PlantCardProps = {
  name: string;
  location: string;
  rate: string;
  image: string;
};

export const PlantCard = ({ name, location, rate, image }: PlantCardProps) => {
  return (
    <View className="flex-row rounded-xl bg-white justify-between">
      <View className="p-5 flex-1 justify-between">
        <View className="gap-1">
          {/* Plant Name */}
          <Text className="text-[#374544] font-bold text-xl">{name}</Text>
          {/* Location */}
          <Text className="font-semibold text-[#486766]">{location}</Text>
        </View>
        {/* Reminder */}
        <View className="flex-row items-center bg-[#eff6fe] gap-1 p-2 rounded-2xl shrink">
          <Ionicons name="water-outline" size={24} color="#5584cd" />
          <Text className="text-[#5584cd] text-lg font-bold">{`in ${rate} days`}</Text>
        </View>
      </View>
      <Image
        className="w-40 h-40 rounded-tr-xl rounded-br-xl"
        source={image}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
      />
    </View>
  );
};
