import { Ionicons } from "@expo/vector-icons";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { LayoutChangeEvent, Text, View, Image } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { RotatingBorderIcon } from "./RotatingBorderIcon";

import { blurhash } from "@/constants/values";
import { SelectPlant } from "@/db/schema";
import Colors from "@/theme/Colors";

type PlantCardProps = {
  id: string;
  onDismiss?: (id: string) => void;
} & Omit<SelectPlant, "lightCondition" | "notes" | "description">;

export const PlantCard = ({
  id,
  scientificName,
  alias,
  room,
  period,
  image = "https://picsum.photos/seed/696/3000/2000",
  portion: quantity,
  onDismiss,
}: PlantCardProps) => {
  const { colorScheme } = useColorScheme();

  const [watered, setWatered] = useState(false);

  const itemHeight = useSharedValue(140);
  const wateredColor = useSharedValue(0);
  const translateX = useSharedValue(0);
  const marginBottom = useSharedValue(10);
  const containerOpacity = useSharedValue(1);

  const tapGesture = Gesture.Tap()
    .runOnJS(true)
    .onEnd(() => {
      router.navigate({
        pathname: "/(plant)/[id]",
        params: { id },
      });
    });

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      if (!wateredColor.value) {
        translateX.value = event.translationX;
      } else if (event.translationX > 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd((event) => {
      const shouldBeDismissed = translateX.value > itemHeight.value * 0.7;
      // console.log("shouldBeDismissed", shouldBeDismissed);

      const shouldBeWatered = translateX.value < -itemHeight.value * 0.7;
      // console.log("shouldBeWatered", shouldBeWatered);

      if (shouldBeDismissed) {
        translateX.value = withTiming(SCREEN_WIDTH);
        itemHeight.value = withTiming(0, { duration: 100 });
        marginBottom.value = withTiming(0, { duration: 100 });
        containerOpacity.value = withTiming(
          0,
          { duration: 100 },
          (isFinished) => {
            if (isFinished && onDismiss) {
              runOnJS(onDismiss)(id);
            }
          },
        );
      } else if (shouldBeWatered) {
        wateredColor.value = withTiming(1);
        translateX.value = withTiming(0);
      } else {
        translateX.value = withTiming(0);
      }
    });

  const composedGesture = Gesture.Race(tapGesture, panGesture);

  const panStyle = useAnimatedStyle(() => {
    const colors =
      colorScheme === "dark" ? ["#D5F2FF", "#38ACDD"] : ["#FFC107", "#FF9800"];

    const backgroundColor = interpolateColor(
      wateredColor.value,
      [0, 1],
      colors,
      "RGB",
      {
        gamma: 2.2,
      },
    );
    return {
      backgroundColor,
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  function onLayout(event: LayoutChangeEvent): void {
    const { height } = event.nativeEvent.layout;
    // console.log("height", height);
  }

  const containerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      opacity: containerOpacity.value,
      marginBottom: marginBottom.value,
    };
  });

  return (
    <Animated.View
      style={[containerStyle]}
      className="justify-center"
      onLayout={onLayout}
    >
      <RotatingBorderIcon
        translateX={translateX}
        layoutHeight={itemHeight.value * 0.7}
        svg={require("@/assets/icons/trash.svg")}
        colors={["#FFC107", "#FF9800"]}
      />
      <RotatingBorderIcon
        translateX={translateX}
        layoutHeight={itemHeight.value * 0.7}
        svg={require("@/assets/icons/watering.svg")}
        right
        colors={["#FF0000", "#00FF00", "#0000FF", "#FF0000"]}
      />

      <GestureDetector gesture={composedGesture}>
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

          <Animated.Image
            sharedTransitionTag={`plant-image-${id}`}
            className=" h-40 w-44 rounded-br-xl rounded-tr-xl object-cover"
            source={{ uri: image ? image : undefined }}
          />
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};
