import { Ionicons } from "@expo/vector-icons";
import { cva } from "class-variance-authority";
import React from "react";
import { Pressable, PressableProps, Text } from "react-native";

export const ActionButton = ({
  containerClassName,
  labelClassname,
  iconClassName = "{}-[color]: color-black",
  label,
  icon,
  size = 24,
  ...props
}: {
  label: string;
  iconClassName?: string;
  labelClassname?: string;
  containerClassName?: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  size?: React.ComponentProps<typeof Ionicons>["size"];
} & PressableProps) => {
  return (
    <Pressable
      {...props}
      className={`flex-row items-center justify-center gap-2 rounded-lg p-3 ${containerClassName}`}
    >
      <Text className={`text-2xl font-semibold ${labelClassname}`}>
        {label}
      </Text>
      <Ionicons name={icon} size={size} className={iconClassName} />
    </Pressable>
  );
};
