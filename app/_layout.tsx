import "../global.css";

import { PortalProvider } from "@gorhom/portal";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useFileSystem, useLoadAssets, usePushNotification } from "../hooks";

import { NavigationTheme } from "@/theme";

import "react-native-get-random-values";

import "expo-dev-client";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import db, { expo } from "@/db/client";
import migrations from "@/drizzle/migrations";
import { useEffect, useState } from "react";
import { deleteDatabaseSync } from "expo-sqlite/next";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  // useEffect(() => {
  //   return () => {
  //     expo.closeSync();
  //   };
  // }, []);

  // const { isLoaded } = useLoadAssets();

  // const { success, error } = useMigrations(db, migrations);
  // console.log(success);
  // console.log(error);

  // expo.closeSync();
  // deleteDatabaseSync("plant.db");

  const { isLoaded } = { isLoaded: true };
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
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(plant)/[id]" />
            <Stack.Screen name="(settings)" />
          </Stack>
        </ThemeProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  );
}
