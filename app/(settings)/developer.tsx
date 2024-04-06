import Colors from "@/constants/Colors";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import * as Linking from "expo-linking";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DeveloperScreen() {
  const inset = useSafeAreaInsets();
  return (
    <>
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(0,0,0,0.8)", "transparent"]}
        className="absolute bottom-0 left-0 right-0 top-0"
      />
      <View className="flex-1 px-6" style={{ paddingTop: inset.top }}>
        {/* Developer Information */}
        <Image
          source={require("@/assets/images/adaptive-icon.png")}
          className="my-5 h-36 w-36 rounded-full border-4 border-primary"
        />
        {/* name */}
        <Text className="text-2xl font-bold">Amil Muhammed Hamza</Text>
        {/* Position */}
        <Text className="text-muted text-lg">Full Stack Developer</Text>
        {/* Description */}
        <Text className="my-5 text-pretty rounded-md  bg-surface p-5 text-start font-semibold italic leading-6 tracking-wider">
          Highly skilled full stack developer with a strong background in
          front-end and back-end development. Proficient in multiple programming
          languages and frameworks. Committed to delivering robust and scalable
          solutions to meet business objectives.
        </Text>

        {/* Contact */}
        <View className="rounded-md bg-surface">
          {/* <Text className="text-xl font-semibold">Contacts</Text> */}
          <Pressable
            onPress={() => Linking.openURL("https://github.com/amilmohd155")}
            className="flex-row items-center p-5  active:bg-gray-200"
          >
            <Ionicons name="logo-github" size={24} color={Colors.light.tint} />
            <Text className="ml-2 text-lg">/amilmohd155</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              Linking.openURL("https://www.linkedin.com/in/amil-muhammed")
            }
            className="flex-row items-center p-5  active:bg-gray-200"
          >
            <Ionicons
              name="logo-linkedin"
              size={24}
              color={Colors.light.tint}
            />
            <Text className="ml-2 text-lg">/amil-muhammed</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
