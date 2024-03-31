import { Stack } from "expo-router";

export const SettingsLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="one" />
    </Stack>
  );
};
