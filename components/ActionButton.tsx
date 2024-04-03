import { Pressable, PressableProps, Text } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import React from "react";

export const ActionButton = ({
  containerClassName,
  labelClassname,
  label,
  icon,
  iconColor,
  size = 24,
  ...props
}: {
  label: string;
  iconColor: string;
  labelClassname?: string;
  containerClassName?: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  size?: React.ComponentProps<typeof Ionicons>["size"];
} & PressableProps) => {
  return (
    <Pressable
      {...props}
      className={`flex-1 flex-row items-center rounded-lg p-3 gap-2 justify-center ${containerClassName}`}
    >
      <Text className={`font-semibold text-2xl ${labelClassname}`}>
        {label}
      </Text>
      <Ionicons name={icon} size={size} color={iconColor} />
    </Pressable>
  );
};
