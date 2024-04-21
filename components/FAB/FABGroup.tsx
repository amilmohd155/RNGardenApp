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
import FAB from "./FAB";

type Action = {
  icon: ComponentProps<typeof Ionicons>["name"];
  label?: string;
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
    label: "Edit",
    onPress: () => console.log("Edit"),
  },
  {
    icon: "trash-bin",
    color: "rgb(89 116 111)",
    label: "Delete",
    onPress: () => console.log("Delete"),
  },
];

type FABGroupProps = {
  icon: string;
  color: string;
};

const FABGroup = () => {
  const [opened, setOpened] = useState(false);
  const [pointerEvents, setPointerEvents] =
    useState<ViewProps["pointerEvents"]>("none");

  const fabRotate = useSharedValue(0);
  const fabOpacity = useSharedValue(0);
  const fabTranslateY = useSharedValue(0);

  const _open = useCallback(() => {
    setPointerEvents("auto");
    setOpened(true);
    fabTranslateY.value = withTiming(-SIZE * 2);
    fabRotate.value = withSpring((3 * Math.PI) / 4);
    fabOpacity.value = withTiming(DEFAULT_OPACITY);
  }, [fabOpacity, fabRotate, fabTranslateY]);

  const _close = useCallback(() => {
    setPointerEvents("none");
    fabTranslateY.value = withTiming(0);
    fabRotate.value = withSpring(0);
    fabOpacity.value = withTiming(0);
    setTimeout(() => {
      setOpened(false);
    }, 150);
  }, [fabOpacity, fabRotate, fabTranslateY]);

  const handleOnPress = useCallback(() => {
    return opened ? _close() : _open();
  }, [_close, _open, opened]);

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
      <View className="absolute bottom-0 right-0 items-end gap-3">
        {opened &&
          actions.map((action, index) => {
            return (
              <FAB
                key={index}
                icon={action.icon}
                color={action.color}
                label={action.label}
                onPress={() => {}}
                index={index}
                translateY={fabTranslateY}
              />
            );
          })}

        <FAB
          icon={icon}
          size={SIZE}
          color={color}
          onPress={handleOnPress}
          style={rIconStyle}
        />
      </View>
    </Portal>
  );
};
export default FABGroup;
