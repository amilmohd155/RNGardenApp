import LottieView from "lottie-react-native";
import { View, Text } from "react-native";

export const EmptyPlantListComponent = () => {
  return (
    <View className="my-28 flex-1 items-center justify-center gap-2">
      <LottieView
        style={{ width: 200, height: 200 }}
        autoPlay
        loop
        source={require("@/assets/anim/empty-plants.json")}
      />
      <Text className="text-center text-3xl font-bold text-onSurface">
        Looks like you have no plants!
      </Text>
      <Text className="text-center text-xl font-bold text-onSurface">
        Click on the plus icon to add one.
      </Text>
    </View>
  );
};

export const EmptyTaskListComponent = () => {
  return (
    <View className="my-28 flex-1 items-center justify-center gap-2">
      <LottieView
        style={{ width: 200, height: 200 }}
        autoPlay
        loop
        source={require("@/assets/anim/empty-tasks.json")}
      />
      <Text className="text-center text-3xl font-bold text-onSurface">
        Looks like you have no plants!
      </Text>
      <Text className="text-center text-xl font-bold text-onSurface">
        Click on the plus icon to add one.
      </Text>
    </View>
  );
};
