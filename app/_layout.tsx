import "../global.css";

import * as SQLite from "expo-sqlite";
import * as SplashScreen from "expo-splash-screen";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Image, ImageBackground } from "expo-image";
import { cssInterop, remapProps, useColorScheme } from "nativewind";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Platform } from "react-native";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Open the database connection.
function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }
  const db = SQLite.openDatabase("plants.db", "1.0", "Plants Database");

  return db;
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      openDatabase();
    }
  }, [loaded]);

  if (!loaded) {
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
