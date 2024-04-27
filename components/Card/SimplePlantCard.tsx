import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { View, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

import { SelectPlant } from "@/db/schema";
import { getDaysLeftAsString } from "@/utils";

type Props = {
  plant: Omit<
    SelectPlant,
    | "lightCondition"
    | "notes"
    | "description"
    | "descriptionCitation"
    | "plantAccessToken"
    | "notificationId"
  >;
};

export const SimplePlantCard = ({
  plant: { id, scientificName, alias, room, portion: quantity, image, task },
}: Props) => {
  const gesture = Gesture.Tap().onEnd(() => {
    runOnJS(router.navigate)(`/(plant)/${id}`);
  });

  console.log("SimplePlantCard", task);

  return (
    <View className="justify-center">
      <GestureDetector gesture={gesture}>
        <View className="flex-row justify-between rounded-xl bg-neutral-400">
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
            <View className="shrink flex-row items-center gap-1 rounded-2xl bg-tertiary px-3 py-2">
              <Ionicons
                name="water-outline"
                size={24}
                className="{}-[color]:color-onTertiary"
              />
              <Text className="text-lg font-bold text-onTertiary">{`${quantity}ml ${getDaysLeftAsString(task)}`}</Text>
            </View>
          </View>

          <Image
            className=" h-40 w-44 rounded-br-xl rounded-tr-xl object-cover"
            source={{ uri: image ? image : undefined }}
          />
        </View>
      </GestureDetector>
    </View>
  );
};
