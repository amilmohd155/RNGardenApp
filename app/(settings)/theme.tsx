import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ThemeSelectionScreen = () => {
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
                className="w-full flex-row items-center justify-between px-5"
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
        className="flex-1 gap-2 px-8"
        style={{ paddingTop: insets.top + 55 }}
      >
        <Text className="text-4xl font-bold">Select your theme</Text>
        {/* Dark */}
        <Pressable className=" my-3 flex-row items-center justify-around gap-5 rounded-2xl border-2 border-[#1d1f25] bg-[#3b3f4f] p-5 active:bg-[#1d1f25]">
          <Ionicons name="moon-outline" size={32} color="#eff3ec" />
          <Text className="text-4xl font-semibold text-surface">Dark</Text>
          <Ionicons name="checkmark" size={32} color="#eff3ec" />
        </Pressable>
        {/* Light */}
        <Pressable className="my-3 flex-row items-center justify-around rounded-2xl border-2 border-green-400 bg-[#86aaa7] p-5 active:bg-green-400">
          <Ionicons name="sunny-outline" size={32} color="#374544" />
          <Text className="text-4xl font-semibold text-[#374544]">Light</Text>
          <Ionicons name="checkmark" size={32} color="#374544" />
        </Pressable>
        {/* Auto */}
        <Pressable className="my-3 flex-row items-center justify-around rounded-2xl border-2 border-gray-600 bg-gray-50 p-5 active:bg-gray-400">
          <Ionicons name="cog-outline" size={32} color="rgb(55 65 81)" />
          <Text className="text-4xl font-semibold text-gray-700">Auto</Text>
          <Ionicons name="checkmark" size={32} color="rgb(55 65 81)" />
        </Pressable>
      </View>
    </>
  );
};

export default ThemeSelectionScreen;
