import LottieView from "lottie-react-native";
import { View, Text } from "react-native";

export const EmptyPlantListComponent = () => {
  return (
    <View className="my-28 flex-1 items-center justify-center gap-5">
      <LottieView
        style={{ width: 200, height: 200 }}
        autoPlay
        loop
        source={require("@/assets/anim/empty.json")}
      />
      <Text className="text-center text-xl font-bold text-onSurface">
        {"Looks like you have no plants! \n Click on the plus icon to add one."}
      </Text>
    </View>
  );
};
