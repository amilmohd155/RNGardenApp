import "../global.css";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { PortalProvider } from "@gorhom/portal";
import { ThemeProvider } from "@react-navigation/native";
import { Image, ImageBackground } from "expo-image";
import { Stack } from "expo-router";
import { cssInterop, remapProps, useColorScheme } from "nativewind";
import { TextInput } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useLoadAssets } from "@/hooks/useLoadAssets";
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

cssInterop(Image, { className: "style" });
remapProps(ImageBackground, {
  className: "style",
  imageClassName: "imageStyle",
});
cssInterop(TextInput, {
  className: {
    target: "style",
  },
});
cssInterop(MaterialCommunityIcons, {
  className: {
    target: "style",
    nativeStyleToProp: {
      color: "color",
    },
  },
});
cssInterop(Ionicons, {
  className: {
    target: "style",
    nativeStyleToProp: {
      color: "color",
    },
  },
});

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
