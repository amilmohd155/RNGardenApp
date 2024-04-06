import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AboutScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          header: ({ navigation }) => {
            return (
              <View
                className="w-full flex-row items-center justify-between p-5"
                style={{ paddingTop: insets.top }}
              >
                <Ionicons
                  name="arrow-back"
                  size={32}
                  color="black"
                  className="rounded-full p-2 active:bg-[rgba(0,0,0,0.1)]"
                  onPress={() => navigation.goBack()}
                />
              </View>
            );
          },
        }}
      />
      <LinearGradient
        colors={["rgba(0,0,0,0.8)", "transparent"]}
        className="absolute bottom-0 left-0 right-0 top-0"
      />
      <View
        className="flex-1 gap-2 px-6"
        style={{ paddingTop: insets.top + 45 }}
      >
        <Image
          source={require("@/assets/images/garden-logo.png")}
          className="mt-10 h-36 w-36"
        />
        <View className="flex-row items-center  gap-2">
          <Text className="text-5xl font-bold">Garden</Text>
          <Text className="text-2xl">v1.0.0</Text>
        </View>
        <Text className="text-2xl">Developed by Amil Muhammed Hamza</Text>
        <Text className="py-5 text-2xl">
          A app to remind users to water their plants.
        </Text>
      </View>
    </>
  );
};

export default AboutScreen;
