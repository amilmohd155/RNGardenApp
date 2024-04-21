import "../global.css";

import { PortalProvider } from "@gorhom/portal";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useFileSystem, useLoadAssets, usePushNotification } from "@/hooks";
import { NavigationTheme } from "@/theme";

import "react-native-get-random-values";

import "expo-dev-client";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const { isLoaded } = useLoadAssets();
  usePushNotification();
  useFileSystem();

  if (!isLoaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { colorScheme } = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
        <ThemeProvider value={NavigationTheme(colorScheme)}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(plant)" />
            <Stack.Screen name="(settings)" />
          </Stack>
        </ThemeProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  );
}
