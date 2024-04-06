import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";

import Colors from "@/constants/Colors";

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

export default function TabLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          borderTopStartRadius: 24,
          borderTopEndRadius: 24,
          backgroundColor: Colors[colorScheme ?? "light"].background,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          marginBottom: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "My garden",
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
    </Tabs>
  );
}
