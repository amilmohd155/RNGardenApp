import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { cva } from "class-variance-authority";
import { BlurView } from "expo-blur";
import { router, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "nativewind";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Counter, ImageCard, TextArea, TextInput } from "@/components";
import { useEditPlantActions, usePlantActions } from "@/hooks";
import Colors from "@/theme/Colors";
import { EditPlantFieldValues, editPlantSchema } from "@/types/form";

const PosterHeight = 150;

export default function EditPlantScreen() {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Get the plant by id
  const plant = usePlantActions().getById(id);
  const { editPlant } = useEditPlantActions();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const scrollView = useSharedValue(0);
  const layoutY = useSharedValue(0);

  const { control, getValues, handleSubmit } = useForm<EditPlantFieldValues>({
    defaultValues: plant,
    mode: "onSubmit",
    resolver: zodResolver(editPlantSchema),
  });

  const onSubmit: SubmitHandler<EditPlantFieldValues> = (data) => {
    editPlant({ ...data, id });
    router.dismiss();
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollView.value = event.contentOffset.y;
    },
  });

  const handleDismiss = useCallback(() => {
    router.dismiss();
  }, []);

  const rStickyHeaderStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollView.value,
      [layoutY.value, PosterHeight - 30],
      [
        "transparent",
        colorScheme === "dark" ? Colors.tertiary[800] : Colors.tertiary[500],
      ],
    );

    return {
      backgroundColor,
    };
  });

  const rBlurViewStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollView.value,
        [0, PosterHeight],
        [PosterHeight, 0],
      ),
      opacity: interpolate(scrollView.value, [0, PosterHeight], [1, 0]),
    };
  });

  return (
    <View className="flex-1">
      <Animated.View style={rBlurViewStyle} className="bg-transparent">
        <BlurView
          tint="dark"
          experimentalBlurMethod="none"
          intensity={100}
          className="absolute bottom-0 left-0 right-0 top-0"
        />
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={0}
        showsVerticalScrollIndicator={false}
        className="-mt-8 flex-1 rounded-t-3xl bg-surfaceBright px-5"
        contentContainerStyle={{ paddingBottom: 100 }}
        overScrollMode="never"
      >
        <View className="gap-6">
          <ImageCard control={control} name="image" edit />

          <TextInput
            name="alias"
            control={control}
            placeholder="e.g. Dexter's plant, Monstera.."
            // suggestions={aliasSuggestions}
            label="Plant name (Alias)"
          />

          <TextInput
            name="room"
            control={control}
            label="Room"
            suggestions={["Bedroom", "Living Room", "Kitchen", "Balcony"]}
            placeholder="e.g. Bedroom's sill, Kitchen's sill..."
          />

          <Counter
            name="period"
            control={control}
            label="Watering every"
            unit="days"
            min={1}
            max={15}
            increment={1}
            rules={{ required: true }}
          />

          <Counter
            name="portion"
            control={control}
            label="Water portions"
            unit="ml"
            increment={50}
            min={50}
            max={500}
            rules={{ required: true }}
          />

          <View className="gap-2">
            <Text className="text-xl font-bold text-onSurfaceVariant">
              Lighting Condition
            </Text>
            <Pressable
              onPress={() => bottomSheetRef.current?.expand()}
              className="flex-row items-center justify-between rounded-lg border-2 border-outline p-4 active:border-primary"
            >
              <Text className="text-lg text-onSurfaceVariant">
                {getValues("lightCondition")}
              </Text>
              <Ionicons
                name="chevron-down"
                size={24}
                className={cva("{}-[color]:color-primary")()}
              />
            </Pressable>
          </View>

          <TextArea
            name="notes"
            control={control}
            label="Notes"
            multiline
            inputMode="text"
            placeholder="e.g. Keep away from direct sunlight"
            numberOfLines={4}
            maxLength={200}
            editable
          />
        </View>
      </Animated.ScrollView>

      <Animated.View
        onLayout={(e) => {
          "worklet";
          layoutY.value = e.nativeEvent.layout.y;
        }}
        style={[
          {
            top: 0,
            paddingTop: insets.top + 20,
            paddingBottom: 32,
          },
          rStickyHeaderStyle,
        ]}
        className="absolute left-0 right-0 z-10 flex-row gap-5 rounded-b-3xl px-5"
      >
        <Pressable
          onPress={handleDismiss}
          className="flex-1 items-center rounded-lg bg-neutral-200 p-5"
        >
          <Text className="text-xl font-bold text-primaryContainer">
            Cancel
          </Text>
        </Pressable>
        <Pressable
          onPress={handleSubmit((data) => onSubmit(data))}
          className="flex-1 items-center rounded-lg bg-primaryContainer p-5"
        >
          <Text className="text-xl font-bold text-onPrimaryContainer">
            Save
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
