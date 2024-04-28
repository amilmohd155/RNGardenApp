import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";

import { useAppPersistStore } from "./useAppPersistStore";

import db from "@/db/client";
import migrations from "@/drizzle/migrations";
import nativewindHelper from "@/utils/nativewind";

SplashScreen.preventAutoHideAsync();

export function useLoadAssets() {
  //   Font loading
  const [hasFontsLoaded, loadingFontsError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
    ...Ionicons.font,
    ...Feather.font,
    ...MaterialCommunityIcons.font,
  });

  const { success: hasRunMigrations, error: runningMigrationError } =
    useMigrations(db, migrations);

  const { themePreference } = useAppPersistStore();
  const { setColorScheme } = useColorScheme();

  // Theme
  useEffect(() => {
    setColorScheme(themePreference);
  }, [setColorScheme, themePreference]);

  useEffect(() => {
    if (loadingFontsError) throw loadingFontsError;
    if (runningMigrationError) {
      console.error("Error running migrations", runningMigrationError);
      throw runningMigrationError;
    }
  }, [loadingFontsError, runningMigrationError]);

  useEffect(() => {
    if (hasFontsLoaded && hasRunMigrations) {
      SplashScreen.hideAsync();
    }
  }, [hasFontsLoaded, hasRunMigrations]);

  useEffect(() => {
    nativewindHelper();
  }, []);

  return {
    isLoaded: hasFontsLoaded && hasRunMigrations,
  };
}
