import { Portal } from "@gorhom/portal";
import { memo, useCallback, useState } from "react";
import { View, ViewProps } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import FAB from "./FAB";
import { FABGroupProps } from "./FAB.type";

const DEFAULT_OPACITY = 0.75;
const SIZE = 32;

const FABGroupComponent = ({
  icon,
  color,
  actions,
  ...props
}: FABGroupProps) => {
  const [opened, setOpened] = useState(false);
  const [pointerEvents, setPointerEvents] =
    useState<ViewProps["pointerEvents"]>("none");

  const fabRotate = useSharedValue(0);
  const fabOpacity = useSharedValue(0);
  const fabTranslateY = useSharedValue(0);

  const _open = useCallback(() => {
    setPointerEvents("auto");
    setOpened(true);
    fabTranslateY.value = withSpring(-SIZE * 2);
    fabRotate.value = withSpring((3 * Math.PI) / 4);
    fabOpacity.value = withTiming(DEFAULT_OPACITY);
  }, [fabOpacity, fabRotate, fabTranslateY]);

  const _close = useCallback(() => {
    setPointerEvents("none");
    fabTranslateY.value = withSpring(0);
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
                {...action}
                key={index}
                index={index}
                translateY={fabTranslateY}
              />
            );
          })}

        <FAB
          {...props}
          color={color}
          icon={icon}
          onPress={handleOnPress}
          style={rIconStyle}
        />
      </View>
    </Portal>
  );
};

const FABGroup = memo(FABGroupComponent);

export default FABGroup;
