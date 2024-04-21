import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { Text, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

import { FABProps } from "./FAB.type";

const FAB = ({
  translateY,
  index = 0,
  bottom = 30,
  right = 30,
  top,
  left,
  ...action
}: FABProps) => {
  const { icon, label, onPress, size = 32, style, ...props } = action;

  const derivedTranslateY = useDerivedValue(() => {
    return translateY ? translateY.value * (index + 1) : 0;
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: derivedTranslateY.value }],
    };
  });

  const viewStyle = useMemo(() => {
    return [
      {
        top,
        bottom,
        right,
        left,
      },
      style,
      rStyle,
    ];
  }, [top, bottom, right, left, style, rStyle]);

  return (
    <Animated.View style={[viewStyle]} className="absolute">
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
          {...props}
          className="rounded-full bg-[#eff3ec] p-3"
        />
      </Pressable>
    </Animated.View>
  );
};

export default FAB;
