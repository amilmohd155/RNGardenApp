import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import {
  Canvas,
  Circle,
  Paint,
  Path,
  Skia,
  SweepGradient,
  Vector,
  center,
  useTiming,
  vec,
} from "@shopify/react-native-skia";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { LayoutChangeEvent, Pressable, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { RotatingBorderIcon } from "./RotatingBorderIcon";

import { blurhash } from "@/constants/values";
import { SelectPlant } from "@/db/schema";
import Colors from "@/theme/Colors";

type PlantCardProps = Omit<
  SelectPlant,
  "lightCondition" | "notes" | "description"
>;

const TRANSLATE_X_THRESHOLD = SCREEN_WIDTH * 0.3;

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
  const [layoutHeight, setLayoutHeight] = useState(0);

  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onStart((event) => {
      // translateX.value = event.translationX;
    })
    .onBegin((event) => {
      // console.log("onBegin", event.translationX);
    })
    .onChange((event) => {
      // console.log("onChange", event.translationX);
      translateX.value = event.translationX;
    })
    .onUpdate((event) => {
      // console.log("onUpdate", event.translationX);
      // translateX.value = event.translationX;
    })
    .onEnd((event) => {
      const shouldBeDismissed = translateX.value > TRANSLATE_X_THRESHOLD;

      const shouldBeWatered = translateX.value < -TRANSLATE_X_THRESHOLD;

      // if (shouldBeDismissed) {
      //   translateX.value = withTiming(SCREEN_WIDTH);
      // } else {
      //   translateX.value = withTiming(0);
      // }
      // translateX.value = withTiming(0);
    });

  const panStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  function onLayout(event: LayoutChangeEvent): void {
    const { height } = event.nativeEvent.layout;
    setLayoutHeight(height);
  }

  return (
    <Link
      href={{
        pathname: "/(plant)/[id]",
        params: { id },
      }}
      asChild
    >
      <Pressable className="justify-center" onLayout={onLayout}>
        <RotatingBorderIcon
          translateX={translateX}
          layoutHeight={layoutHeight}
          svg={require("@/assets/icons/trash.svg")}
        />
        <RotatingBorderIcon
          translateX={translateX}
          layoutHeight={layoutHeight}
          svg={require("@/assets/icons/watering.svg")}
          right
        />
        {/* <MaterialCommunityIcons
          name="trash-can"
          size={50}
          className="{}-[color]: absolute left-10 rounded-full border-4 bg-green-950 p-5 text-center color-black"
        />
        <MaterialCommunityIcons
          name="watering-can"
          size={50}
          className="{}-[color]: absolute right-10 rounded-full border-4 bg-green-950 p-5 text-center color-black"
        /> */}
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[panStyle]}
            className="flex-row justify-between rounded-xl bg-secondary"
          >
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
                <Text className="font-semibold text-onSecondary/75">
                  {room}
                </Text>
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
              className="absolute bottom-0 right-0 w-40 flex-row items-center gap-2 rounded-br-xl bg-primary/50 px-4 py-3 active:bg-tertiary"
            >
              <MaterialCommunityIcons
                name="watering-can"
                size={24}
                className="{}-[color]: color-white"
              />
              <Text className="text-xl font-semibold text-white">
                {watered ? "Watered" : "Not Watered"}
              </Text>
            </Pressable>
          </Animated.View>
        </GestureDetector>
      </Pressable>
    </Link>
  );
};
