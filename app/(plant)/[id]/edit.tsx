import { BlurView } from "expo-blur";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function EditPlantScreen() {
  const { id } = useLocalSearchParams();

  console.log("EditPlantScreen", id);

  const isMounted = router.canDismiss();

  const handleDismiss = useCallback(() => {
    isMounted && router.dismiss();
  }, [isMounted]);

  return (
    <BlurView
      tint="dark"
      experimentalBlurMethod="dimezisBlurView"
      intensity={50}
      className="absolute bottom-0 left-0 right-0 top-0"
    >
      <Pressable
        onPress={handleDismiss}
        className="absolute bottom-0 left-0 right-0 top-0"
        pointerEvents="auto"
      />
      <ScrollView className="mt-36 flex-1 rounded-t-3xl bg-surfaceBright p-10">
        <View className="flex-row gap-5">
          <Pressable
            onPress={handleDismiss}
            className="flex-1 items-center rounded-lg bg-neutral-200 p-5"
          >
            <Text className="text-xl font-bold text-primaryContainer">
              Cancel
            </Text>
          </Pressable>
          <Pressable
            onPress={handleDismiss}
            className="flex-1 items-center rounded-lg bg-primaryContainer p-5"
          >
            <Text className="text-xl font-bold text-onPrimaryContainer">
              Save
            </Text>
          </Pressable>
        </View>
        <View />
      </ScrollView>
    </BlurView>
  );
}
