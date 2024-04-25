import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { View, Text, Pressable } from "react-native";

import { useEditPlantActions } from "@/hooks";

export default function DeletePlantScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { deletePlant } = useEditPlantActions();

  const handleDeletePlant = useCallback(() => {
    deletePlant(id);
    // Navigate back
    router.dismiss();
    router.navigate("../../");
  }, [deletePlant, id]);

  const handleDismiss = useCallback(() => {
    const isMounted = router.canDismiss();

    isMounted && router.dismiss();
  }, []);

  return (
    <BlurView
      tint="dark"
      experimentalBlurMethod="dimezisBlurView"
      intensity={50}
      className="absolute bottom-0 left-0 right-0 top-0 justify-center p-8"
    >
      <Pressable
        onPress={handleDismiss}
        className="absolute bottom-0 left-0 right-0 top-0 "
        pointerEvents="auto"
      />
      <View className="h-1/2 items-center justify-center gap-5 rounded-xl bg-surfaceBright p-10 shadow-xl shadow-onSurfaceVariant/50">
        <Ionicons name="trash" size={50} color="#c73423" />
        <Text className="text-2xl font-semibold text-onSurfaceVariant">
          Are you sure?
        </Text>
        <Text className="text-center text-lg font-semibold text-onSurfaceVariant">
          You are about to delete this plant. This action cannot be undone.
        </Text>

        <Pressable
          onPress={handleDeletePlant}
          className="w-full flex-row justify-center rounded-lg bg-error-700 p-5"
        >
          <Text className="text-xl font-bold text-onSurfaceVariant">
            Move to final resting place
          </Text>
        </Pressable>
        <Pressable
          onPress={handleDismiss}
          className="w-full flex-row justify-center rounded-lg bg-neutral-500 p-5"
        >
          <Text className="text-xl font-bold text-onSurfaceVariant">
            Cancel
          </Text>
        </Pressable>
      </View>
    </BlurView>
  );
}
