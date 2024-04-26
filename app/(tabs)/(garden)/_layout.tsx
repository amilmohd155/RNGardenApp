import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import { useWindowDimensions } from "react-native";

import { CustomTabBar } from "@/components";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTobTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function Layout() {
  const { width } = useWindowDimensions();

  return (
    <MaterialTobTabs
      backBehavior="initialRoute"
      initialLayout={{
        width,
      }}
      style={{
        backgroundColor: "transparent",
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        lazy: true,
      }}
    >
      <MaterialTobTabs.Screen
        name="index"
        options={{
          title: "All plants",
        }}
      />
      <MaterialTobTabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
        }}
      />
    </MaterialTobTabs>
  );
}
