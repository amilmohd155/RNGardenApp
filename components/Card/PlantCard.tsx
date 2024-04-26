import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { memo, useCallback } from "react";
import { Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { RotatingBorderIcon } from "../RotatingBorderIcon";

import { SelectPlant } from "@/db/schema";
import { useEditPlantActions } from "@/hooks";
import { getDaysLeft } from "@/utils";

type PlantCardProps = {
  id: string;
  // onDismiss?: (id: string) => boolean;
} & Omit<
  SelectPlant,
  | "lightCondition"
  | "notes"
  | "description"
  | "descriptionCitation"
  | "plantAccessToken"
  // | "task"
>;

const PlantCardComponent = ({
  id,
  scientificName,
  alias,
  room,
  period,
  image = "https://picsum.photos/seed/696/3000/2000",
  portion: quantity,
  task,
  // onDismiss,
}: PlantCardProps) => {
  const { colorScheme } = useColorScheme();

  const size = useSharedValue(140);
  const wateredColor = useSharedValue(0);
  const translateX = useSharedValue(0);
  const isDragging = useSharedValue(false);

  const { editTask } = useEditPlantActions();

  const handleWatering = useCallback(() => {
    editTask(id, period);
  }, [editTask, id, period]);

  const longPressGesture = Gesture.LongPress()
    .onStart(() => {
      isDragging.value = true;
    })
    .minDuration(500);

  const tapGesture = Gesture.Tap().onEnd(() => {
    // router.push(`/(plant)/${id}`);
    runOnJS(router.navigate)(`/(plant)/${id}`);
    // router.navigate(`/(plant)/${id}`);
  });

  const panGesture = Gesture.Pan()
    .manualActivation(true)
    .onTouchesMove((_e, state) => {
      if (isDragging.value) {
        state.activate();
      } else {
        state.fail();
      }
    })
    .onChange((event) => {
      if (!wateredColor.value && !(event.translationX > 0)) {
        translateX.value = event.translationX;
      }
    })
    .onEnd((event) => {
      const shouldBeWatered = translateX.value < -size.value * 0.7;

      if (shouldBeWatered) {
        translateX.value = withTiming(0);
        wateredColor.value = withTiming(1, {}, (isFinished) => {
          if (isFinished) {
            runOnJS(handleWatering)();
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    })
    .onFinalize(() => {
      isDragging.value = false;
    })
    .simultaneousWithExternalGesture(longPressGesture);

  const composedGesture = Gesture.Race(
    tapGesture,
    panGesture,
    longPressGesture,
  );

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

  return (
    <Animated.View className="justify-center">
      <RotatingBorderIcon
        translateX={translateX}
        layoutHeight={size.value * 0.7}
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
            <View className="shrink flex-row items-center gap-1 rounded-2xl bg-tertiary px-3 py-2">
              <Ionicons
                name="water-outline"
                size={24}
                className="{}-[color]:color-onTertiary"
              />
              <Text className="text-lg font-bold text-onTertiary">{`${quantity}ml ${getDaysLeft(task)}`}</Text>
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

export const PlantCard = memo(PlantCardComponent);
