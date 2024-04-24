import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { Animated, View, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export const CustomTabBar = (props: MaterialTopTabBarProps) => {
  const { state, descriptors, navigation, position } = props;

  return (
    <View className="mx-10 mb-5 w-3/5 min-w-fit flex-row gap-1 self-center rounded-full bg-neutral-700 px-1">
      {state.routes.map((route, index) => (
        <TabBarComponent
          key={route.key}
          index={index}
          state={state}
          descriptors={descriptors}
          navigation={navigation}
          position={position}
        />
      ))}
    </View>
  );
};

const TabBarComponent = (
  props: {
    index: number;
  } & Pick<
    MaterialTopTabBarProps,
    "state" | "descriptors" | "navigation" | "position"
  >,
) => {
  const { state, descriptors, index, navigation, position } = props;
  const route = state.routes[index];
  const { options } = descriptors[route.key];
  const label = options.title;
  const isFocused = state.index === index;

  const focusAnim = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [0, 1, 0],
  });

  const onTabSelected = () => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const gesture = Gesture.Tap()
    .runOnJS(true)
    .onFinalize(() => {
      onTabSelected();
    });

  return (
    <GestureDetector key={label} gesture={gesture}>
      <Animated.View
        style={{
          backgroundColor: focusAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ["transparent", "rgb(94 202 141)"],
          }),
        }}
        className="my-1 flex-1 items-center rounded-full py-3"
      >
        <Text className="text-xl font-semibold text-neutral-50">{label}</Text>
      </Animated.View>
    </GestureDetector>
  );
};
