import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, PressableProps, Text } from "react-native";

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
      className={`flex-1 flex-row items-center justify-center gap-2 rounded-lg p-3 ${containerClassName}`}
    >
      <Text className={`text-2xl font-semibold ${labelClassname}`}>
        {label}
      </Text>
      <Ionicons name={icon} size={size} color={iconColor} />
    </Pressable>
  );
};
