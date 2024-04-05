import "../global.css";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Image, ImageBackground } from "expo-image";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SQLite from "expo-sqlite";
import { cssInterop, remapProps, useColorScheme } from "nativewind";
import { useEffect } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useLoadAssets } from "@/hooks/useLoadAssets";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const { isLoaded } = useLoadAssets();

  if (!isLoaded) {
    return null;
  }

  return <RootLayoutNav />;
}

cssInterop(Image, { className: "style" });
remapProps(ImageBackground, {
  className: "style",
  imageClassName: "imageStyle",
});

function RootLayoutNav() {
  const { colorScheme } = useColorScheme();
  // const { hasPermission, requestPermission } = useCameraPermission();

  // useEffect(() => {
  //   if (!hasPermission) {
  //     requestPermission();
  //   }
  // }, [hasPermission]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(plant)" />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
