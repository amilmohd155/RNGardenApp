import "../global.css";

import { PortalProvider } from "@gorhom/portal";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useLoadAssets } from "@/hooks/useLoadAssets";
import nativewind from "@/lib/nativewind";
import { NavigationTheme } from "@/theme";

import "react-native-get-random-values";

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

function RootLayoutNav() {
  const { colorScheme } = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
        <ThemeProvider
          // value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          value={NavigationTheme(colorScheme)}
        >
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
