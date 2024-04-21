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

const DEFAULT_OPACITY = 0.75;
const SIZE = 32;
const icon = "add";
const color = "rgb(89 116 111)";
const actions: Action[] = [
  {
    icon: "add",
    color: "rgb(89 116 111)",
    label: "Add",
    onPress: () => console.log("Add"),
  },
  {
    icon: "pin",
    color: "rgb(89 116 111)",
    // label: "Edit",
    onPress: () => console.log("Edit"),
  },
  {
    icon: "trash-bin",
    color: "rgb(89 116 111)",
    label: "Delete",
    onPress: () => console.log("Delete"),
  },
];

type FABProps = {
  bottom?: number;
  right?: number;
} & Action;

const FAB = ({ bottom = 40, right = 40, ...action }: FABProps) => {
  const { icon, label, onPress, size = 32, ...props } = action;

  return (
    <Pressable
      onPress={onPress}
      style={{
        bottom,
        right,
      }}
      className="absolute flex-row items-center justify-end gap-3 transition-transform active:scale-95"
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
  );
};

export default FAB;
