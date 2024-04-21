import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { GestureResponderEvent } from "react-native";
import { SharedValue } from "react-native-reanimated";

type Action = {
  icon: ComponentProps<typeof Ionicons>["name"];
  label?: string;
  size?: number;
  onPress?: (e: GestureResponderEvent) => void;
} & Omit<ComponentProps<typeof Ionicons>, "onPress" | "name">;

export type FABProps = {
  bottom?: number;
  right?: number;
  left?: number;
  top?: number;
  index?: number;
  translateY?: SharedValue<number>;
} & Action;

export type FABGroupProps = {
  //   icon: ComponentProps<typeof Ionicons>["name"];
  //   color?: string;
  actions: Action[];
} & Action;
