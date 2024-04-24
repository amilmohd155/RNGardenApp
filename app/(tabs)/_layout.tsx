import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { cssInterop, remapProps } from "nativewind";
import React from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { GardenHeader } from "@/components";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon({
  name,
  focused,
  ...props
}: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
  focused: boolean;
}) {
  return (
    <Ionicons
      size={32}
      // @ts-ignore
      name={focused ? name : `${name}-outline`}
      style={{ marginBottom: -5 }}
      {...props}
    />
  );
}

const ThemedTab = remapProps(Tabs, {
  sceneContainerClassName: "sceneContainerStyle",
});
cssInterop(ThemedTab, {
  sceneContainerClassName: {
    target: "sceneContainerStyle",
  },
});

export default function TabLayout() {
  const inset = useSafeAreaInsets();

  return (
    <ThemedTab
      sceneContainerClassName="bg-surface"
      screenOptions={{
        unmountOnBlur: true,
        headerShown: false,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: false,
        tabBarStyle: {
          borderTopStartRadius: 24,
          borderTopEndRadius: 24,
          height: Platform.OS === "ios" ? 70 + inset.bottom : 70,
          position: "absolute",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          marginBottom: 10,
        },
      }}
    >
      <Tabs.Screen
        name="(garden)"
        options={{
          title: "My garden",
          headerShown: true,
          header: () => <GardenHeader />,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="leaf" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "New plant",
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="add-circle" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="cog" focused={focused} color={color} />
          ),
        }}
      />
    </ThemedTab>
  );
}
