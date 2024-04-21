import { Ionicons } from "@expo/vector-icons";
import { ComponentProps, useMemo } from "react";
import { Text, Pressable, GestureResponderEvent } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
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
  left?: number;
  top?: number;
  index?: number;
  translateY?: SharedValue<number>;
} & Action;

const FAB = ({
  translateY,
  index = 0,
  bottom = 40,
  right = 40,
  top,
  left,
  ...action
}: FABProps) => {
  const { icon, label, onPress, size = 32, color, style, ...props } = action;

  const derivedTranslateY = useDerivedValue(() => {
    return translateY ? translateY.value * (index + 1) : 0;
  });

  const rStyle = useAnimatedStyle(() => {
    // console.log("index", index, derivedTranslateY.value);

    return {
      // opacity: interpolate(derivedTranslateY.value, [0, -40], [0, 1]),
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
          color={color}
          {...props}
          className="rounded-full bg-white p-3"
        />
      </Pressable>
    </Animated.View>
  );
};

export default FAB;
