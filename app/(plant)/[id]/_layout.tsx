import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
export default function PlantLayout() {
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <Stack screenOptions={{ headerShown: false, animation: "ios" }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="edit" />
      <Stack.Screen
        name="delete"
        options={{
          presentation: "transparentModal",
          contentStyle: {
            backgroundColor: "transparent",
            justifyContent: "center",
            padding: 24,
          },
        }}
      />
    </Stack>
    // </SafeAreaView>
  );
}
