import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";

import { CustomTabBar } from "@/components";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTobTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function Layout() {
  return (
    <MaterialTobTabs
      backBehavior="initialRoute"
      style={{
        backgroundColor: "transparent",
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
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
