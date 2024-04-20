import { Ionicons } from "@expo/vector-icons";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { ComponentProps, useCallback, useState } from "react";
import { View, Text, Pressable, ViewProps } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { FullWindowOverlay } from "react-native-screens";

type Action = {
  icon: ComponentProps<typeof Ionicons>["name"];
  label?: string;
  onPress?: () => void;
} & Omit<ComponentProps<typeof Ionicons>, "onPress" | "name">;

const size = 32;
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

const DEFAULT_OPACITY = 0.75;

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

const FAB = () => {
  const [opened, setOpened] = useState(false);
  const [pointerEvents, setPointerEvents] =
    useState<ViewProps["pointerEvents"]>("none");

  const fabRotate = useSharedValue(0);
  const fabOpacity = useSharedValue(0);
  const fabTranslateY = useSharedValue(0);

  const handleOnPress = useCallback(() => {
    return opened ? _close() : _open();
  }, [opened]);

  const _open = () => {
    setPointerEvents("auto");
    setOpened(true);
    fabTranslateY.value = withTiming(-size * 2);
    fabRotate.value = withSpring((3 * Math.PI) / 4);
    fabOpacity.value = withTiming(DEFAULT_OPACITY);
  };

  const _close = () => {
    setPointerEvents("none");
    fabTranslateY.value = withTiming(0);
    fabRotate.value = withSpring(0);
    fabOpacity.value = withTiming(0);
    setTimeout(() => {
      setOpened(false);
    }, 150);
  };

  const backdropGesture = Gesture.Tap().onFinalize(() => {
    runOnJS(handleOnPress)();
  });

  const rBackdropStyle = useAnimatedStyle(() => {
    return {
      opacity: fabOpacity.value,
      flex: 1,
    };
  });

  const rIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${fabRotate.value}rad` }],
    };
  });

  return (
    <Portal>
      <GestureDetector gesture={backdropGesture}>
        <Animated.View
          style={rBackdropStyle}
          className="absolute bottom-0 left-0 right-0 top-0 bg-black"
          pointerEvents={pointerEvents}
        />
      </GestureDetector>
      <View className="absolute bottom-10 right-10 items-end gap-3">
        {opened &&
          actions.map((action, index) => (
            <SubButton
              action={action}
              key={index}
              index={index}
              translateY={fabTranslateY}
            />
          ))}

        <AnimatedIcon
          style={rIconStyle}
          onPress={handleOnPress}
          name={icon}
          size={size}
          color={color}
          className="absolute bottom-0 right-0 rounded-full bg-white p-3 text-center"
        />
      </View>
    </Portal>
  );
};
export default FAB;

const SubButton = ({
  translateY,
  index,
  action,
}: {
  index: number;
  translateY: SharedValue<number>;
  action: Action;
}) => {
  const { icon, label, onPress, ...props } = action;

  const derivedTranslateY = useDerivedValue(() => {
    return translateY.value * (index + 1);
  });

  const rSubButtonStyle = useAnimatedStyle(() => {
    return {
      // opacity: interpolate(derivedTranslateY.value, [0, -40], [0, 1]),
      transform: [{ translateY: derivedTranslateY.value }],
    };
  });

  return (
    <Animated.View
      className="absolute bottom-0 right-0"
      style={rSubButtonStyle}
    >
      <Pressable
        onPress={onPress}
        className="flex-row items-center justify-end gap-3"
      >
        {label && (
          <Text className="text-lg font-semibold text-white">{label}</Text>
        )}
        <Ionicons
          name={icon}
          size={32}
          color={color}
          {...props}
          className="rounded-full bg-white p-3"
        />
      </Pressable>
    </Animated.View>
  );
};
