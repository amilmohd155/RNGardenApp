import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

import db from "@/db/client";
import migrations from "@/drizzle/migrations";

SplashScreen.preventAutoHideAsync();

export function useLoadAssets() {
  //   Font loading
  const [hasFontsLoaded, loadingFontsError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
    ...Ionicons.font,
  });

  const { success: hasRunMigrations, error: runningMigrationError } =
    useMigrations(db, migrations);

  useEffect(() => {
    if (loadingFontsError) throw loadingFontsError;
    if (runningMigrationError) throw runningMigrationError;
  }, [loadingFontsError, runningMigrationError]);

  useEffect(() => {
    if (hasFontsLoaded && hasRunMigrations) {
      SplashScreen.hideAsync();
    }
  }, [hasFontsLoaded, hasRunMigrations]);

  return {
    isLoaded: hasFontsLoaded && hasRunMigrations,
  };
}