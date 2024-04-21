import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
export default function PlantLayout() {
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
    // </SafeAreaView>
  );
}
