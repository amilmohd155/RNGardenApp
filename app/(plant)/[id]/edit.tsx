import { BlurView } from "expo-blur";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  Text,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function EditPlantScreen() {
  const { id } = useLocalSearchParams();

  const handleDismiss = useCallback(() => {
    router.back();
  }, []);

  const handleOnScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ): void => {};

  return (
    <ScrollView
      onScroll={handleOnScroll}
      // scrollEnabled={false}
      onScrollBeginDrag={(e) => console.log(e.nativeEvent.contentOffset.y)}
      className="flex-1 rounded-t-3xl bg-surfaceBright p-10"
      stickyHeaderIndices={[0]}
      StickyHeaderComponent={() => (
        <>
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
        </>
      )}
    >
      {Array.from({ length: 50 }).map((_, index) => (
        <View key={index} className="mt-5 flex-row gap-5">
          <Text className="flex-1 text-lg font-bold text-onSurface">
            Field {index + 1}
          </Text>
          <Text className="flex-1 text-lg text-onSurface">
            Value {index + 1}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
