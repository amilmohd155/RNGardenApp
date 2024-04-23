import Colors from "@/theme/Colors";
import { BlurView } from "expo-blur";
import { router, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "nativewind";
import { useCallback, useEffect } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function EditPlantScreen() {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const { id } = useLocalSearchParams();

  const scrollView = useSharedValue(0);
  const layoutY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollView.value = event.contentOffset.y;
    },
  });

  const handleDismiss = useCallback(() => {
    router.back();
  }, []);

  const rStickyHeaderStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollView.value,
      [layoutY.value, 200],
      [
        "transparent",
        colorScheme === "dark" ? Colors.tertiary[800] : Colors.tertiary[500],
      ],
    );

    return {
      backgroundColor,
    };
  });

  const rBlurViewStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollView.value, [0, 200], [200, 0]),
      opacity: interpolate(scrollView.value, [0, 200], [1, 0]),
    };
  });

  return (
    <View className="flex-1">
      <Animated.View style={rBlurViewStyle} className="bg-transparent">
        <BlurView
          tint="dark"
          experimentalBlurMethod="none"
          intensity={100}
          className="absolute bottom-0 left-0 right-0 top-0"
        />
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={0}
        showsVerticalScrollIndicator={false}
        className="-mt-8 flex-1 rounded-t-3xl bg-surfaceBright"
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <View key={index} className="mt-5 justify-center gap-10 p-5">
            <Text className="text-lg font-bold text-primaryContainer">
              Title
            </Text>
            <TextInput value="Hellow world" />
          </View>
        ))}
      </Animated.ScrollView>

      <Animated.View
        onLayout={(e) => {
          "worklet";
          layoutY.value = e.nativeEvent.layout.y;
        }}
        style={[
          {
            top: 0,
            paddingTop: insets.top + 20,
            paddingBottom: 32,
          },
          rStickyHeaderStyle,
        ]}
        className="absolute left-0 right-0 z-10 flex-row gap-5 rounded-b-3xl px-5"
      >
        <Pressable
          onPress={handleDismiss}
          className="flex-1 items-center rounded-lg bg-neutral-200 p-5"
        >
          <Text className="text-xl font-bold text-primaryContainer">
            Cancel
          </Text>
        </Pressable>
        <Pressable
          onPress={handleDismiss}
          className="flex-1 items-center rounded-lg bg-primaryContainer p-5"
        >
          <Text className="text-xl font-bold text-onPrimaryContainer">
            Save
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
