import { Stack } from "expo-router";

export default function PlantLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "ios" }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="edit"
        options={{
          presentation: "transparentModal",
          contentStyle: {
            backgroundColor: "transparent",
          },
          animation: "slide_from_bottom",
          animationDuration: 1000,
        }}
      />
      <Stack.Screen
        name="delete"
        options={{
          presentation: "transparentModal",
          contentStyle: {
            backgroundColor: "transparent",
          },
          animation: "slide_from_bottom",
          animationDuration: 1000,
        }}
      />
    </Stack>
  );
}
