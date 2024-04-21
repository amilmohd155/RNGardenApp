import { Ionicons } from "@expo/vector-icons";
import { Portal } from "@gorhom/portal";
import { ComponentProps, useCallback, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ViewProps,
  GestureResponderEvent,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type Action = {
  icon: ComponentProps<typeof Ionicons>["name"];
  label?: string;
  size?: number;
  onPress?: (e: GestureResponderEvent) => void;
} & Omit<ComponentProps<typeof Ionicons>, "onPress" | "name">;

type FABProps = {
  bottom?: number;
  right?: number;
} & Action;

const FAB = ({ bottom = 40, right = 40, ...action }: FABProps) => {
  const { icon, label, onPress, size = 32, color, style, ...props } = action;

  return (
    <Animated.View
      style={[
        {
          bottom,
          right,
        },
        style,
      ]}
      className="absolute"
    >
      <Pressable
        onPress={onPress}
        className="flex-row items-center justify-end gap-3 transition-transform active:scale-95"
      >
        {label && (
          <Text className="text-lg font-semibold text-white">{label}</Text>
        )}
        <Ionicons
          name={icon}
          size={size}
          color={color}
          {...props}
          className="rounded-full bg-white p-3"
        />
      </Pressable>
    </Animated.View>
  );
};

export default FAB;
