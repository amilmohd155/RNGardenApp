import AsyncStorage from "@react-native-async-storage/async-storage";
import { MMKV } from "react-native-mmkv";
import superjson from "superjson";
import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

import { ThemePreferences } from "@/theme";

export { useColorScheme } from "nativewind";

type AppPersistStore = {
  themePreference: ThemePreferences;
  setThemePreference: (theme: ThemePreferences) => void;
};

// * Use MMKV for better performance
// export const appPersistStorage = new MMKV({ id: "app-persist-storage" });

const storage: PersistStorage<AppPersistStore> = {
  setItem: (name, value) =>
    // appPersistStorage.set(name, superjson.stringify(value)),
    AsyncStorage.setItem(name, superjson.stringify(value)),
  getItem: async (name) => {
    // const value = appPersistStorage.getString(name);
    const value = await AsyncStorage.getItem(name);
    return value ? superjson.parse(value) : null;
  },
  removeItem: (name) => {
    // return appPersistStorage.delete(name);
    return AsyncStorage.removeItem(name);
  },
};

export const useAppPersistStore = create<
  AppPersistStore,
  [["zustand/persist", AppPersistStore]]
>(
  persist(
    (set, get) => ({
      themePreference: "system",
      setThemePreference: (preference) => set({ themePreference: preference }),
    }),
    {
      name: "app-persist-storage",
      storage,
    },
  ),
);
