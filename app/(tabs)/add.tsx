import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { cva } from "class-variance-authority";
import { useNavigation } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlexStyle,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  Text,
  TextLayoutEventData,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ActionButton } from "@/components/ActionButton";
import { Counter } from "@/components/Counter";
import { ImageCard } from "@/components/ImageCard";
import { LightBottomSheet } from "@/components/LightBottomSheet";
import { TextArea } from "@/components/TextArea";
import { TextInput } from "@/components/TextInput";
import { LIGHT_CONDITIONS } from "@/constants/values";
import { useInsertPlantForm } from "@/hooks/useInsertPlantForm";
import { calculateWateringPeriod, calculateWateringPortion } from "@/utils";

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

export default function AddScreen() {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [aliasSuggestions, setAliasSuggestions] = useState<string[]>([]);

  const {
    handleSubmit,
    control,
    reset,
    onError,
    onSubmit,
    setValue,
    getValues,
  } = useInsertPlantForm();

  const [lightCondition, setLightCondition] = useState<string>(
    LIGHT_CONDITIONS.BRIGHT_INDIRECT,
  );

  const handleLightConditionSubmit = (value: string) => {
    setLightCondition(value);
  };

  useEffect(() => {
    navigation.addListener("blur", () => {
      reset({
        alias: "",
        room: "",
        period: 1,
        portion: 100,
        notes: null,
        image: null,
        scientificName: null,
      });
    });
  }, [navigation, reset]);

  const handleGetDetails = useCallback(
    (details) => {
      setValue("scientificName", details.name);
      setValue("description", details.description);
      setValue("descriptionCitation", details.descriptionCitation);
      setValue("plantAccessToken", details.plantAccessToken);

      setAliasSuggestions(details.commonNames);

      calculateWateringPortion(details.watering);
      calculateWateringPeriod(details.watering);
    },
    [setValue],
  );

  const handleOnAliasSuggestionSelected = useCallback(
    (value: string) => {
      setValue("alias", value);
    },
    [setValue],
  );

  return (
    <View
      className="flex-1 bg-surfaceBright px-5"
      style={{ paddingTop: inset.top }}
    >
      {/* Header */}
      <View className="my-5 flex-row justify-center gap-5 rounded-b-lg">
        {/* Cancel Button */}
        <ActionButton
          onPress={() => {
            navigation.goBack();
          }}
          label="Cancel"
          icon="close"
          labelClassname="text-red-600"
          containerClassName={cva("bg-red-200 flex-1")()}
          iconClassName={cva("{}-[color]: color-red-600")()}
        />

        {/* Save Button */}
        <ActionButton
          onPress={handleSubmit((data) => onSubmit(data), onError)}
          containerClassName={cva("bg-primaryContainer flex-1")()}
          labelClassname={cva("text-onPrimaryContainer")()}
          label="Save"
          icon="water"
          iconClassName={cva("{}-[color]: color-onPrimaryContainer")()}
        />
      </View>

      {/* Divider */}
      <View className="h-0.5 bg-outline" />

      {/* Content */}
      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={}
      >
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
        >
          {/* Image */}
          <ImageCard
            getDetails={handleGetDetails}
            control={control}
            name="image"
          />
          {/* Form */}
          <View className="mb-10 mt-5 gap-5">
            {/* Scientific Name */}
            {getValues("scientificName") && (
              <View className="flex-row gap-2">
                <Text className="text-xl font-bold text-onSurfaceVariant">
                  Scientific Name:
                </Text>
                <Text className="text-lg italic text-onSurface">
                  {getValues("scientificName")}
                </Text>
              </View>
            )}

            {/* Description */}
            <Description content={getValues("description")} />

            {/* Plant Name Input */}
            <TextInput
              name="alias"
              control={control}
              placeholder="e.g. Dexter's plant, Monstera.."
              label="Plant name (Alias)"
            />

            {/* Suggestions for names */}
            <AliasSuggestions
              suggestions={aliasSuggestions}
              onSuggestionSelected={handleOnAliasSuggestionSelected}
            />

            {/* Room Input */}
            <TextInput
              name="room"
              control={control}
              label="Room"
              placeholder="e.g. Bedroom's sill, Kitchen's sill..."
            />

            {/* Watering period */}
            <Counter
              name="period"
              control={control}
              label="Watering every"
              unit="days"
              min={1}
              max={10}
              increment={1}
              defaultValue={1}
              rules={{ required: true }}
            />

            {/* Water portion */}
            <Counter
              name="portion"
              control={control}
              label="Water portions"
              unit="ml"
              increment={50}
              min={50}
              max={500}
              defaultValue={150}
              rules={{ required: true }}
            />

            {/* Light Condition */}
            <View className="gap-2">
              <Text className="text-xl font-bold text-onSurfaceVariant">
                Lighting Condition
              </Text>
              <Pressable
                onPress={() => bottomSheetRef.current?.expand()}
                className="flex-row items-center justify-between rounded-lg border-2 border-[#ece5e5] p-4 active:border-primary"
              >
                <Text className="text-lg text-onSurfaceVariant/50">
                  {lightCondition}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={24}
                  className={cva("{}-[color]:color-primary")()}
                />
              </Pressable>
            </View>
            {/* Notes */}
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
      </KeyboardAvoidingView>

      {/* BottomSheet */}
      <LightBottomSheet
        ref={bottomSheetRef}
        control={control}
        name="lightCondition"
        onSubmit={handleLightConditionSubmit}
      />
    </View>
  );
}

const AliasSuggestions = ({
  suggestions,
  onSuggestionSelected,
}: {
  suggestions: string[];
  onSuggestionSelected: (value: string) => void;
}) => {
  const { width: screenWidth } = useWindowDimensions();

  const display = useSharedValue<FlexStyle["display"]>("none");
  const translateX = useSharedValue(-screenWidth);

  const suggestionsStyle = useAnimatedStyle(() => {
    const enabled = suggestions.length > 1;
    display.value = withTiming(enabled ? "flex" : "none", {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });

    translateX.value = withTiming(enabled ? 0 : -screenWidth, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });

    return {
      display: display.value,
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  }, [suggestions]);

  return (
    <Animated.View style={suggestionsStyle} className="flex-row gap-2">
      {suggestions.slice(0, 3).map((suggestion) => (
        <Text
          onPress={() => onSuggestionSelected(suggestion)}
          className="rounded-2xl bg-tertiary px-5 py-3 text-center font-bold text-onTertiary active:bg-tertiary/50 active:text-onTertiary"
          key={suggestion}
        >
          {suggestion}
        </Text>
      ))}
    </Animated.View>
  );
};

const Description = ({ content }: { content?: string | null }) => {
  const animatedHeight = useSharedValue(0);

  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState(0);

  const handleCollapsibleView = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  const collapsableStyle = useAnimatedStyle(() => {
    animatedHeight.value = expanded ? withTiming(height) : withTiming(0);

    return {
      height: animatedHeight.value,
    };
  }, [expanded]);

  const rotatedIconStyle = useAnimatedStyle(() => {
    const rotate = interpolate(animatedHeight.value, [0, height], [0, 180]);

    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  }, [expanded]);

  const handleLayoutChange = useCallback(
    (event: NativeSyntheticEvent<TextLayoutEventData>) => {
      const lines = event.nativeEvent.lines;
      setHeight(lines.length * lines[0].height + 10);
    },
    [],
  );

  if (!content) return null;

  return (
    <Pressable className="gap-2" onPress={handleCollapsibleView}>
      <View className="flex-row items-center gap-2">
        <Text className=" text-xl font-bold text-onSurfaceVariant">
          Description
        </Text>
        <AnimatedIcon
          name="chevron-down"
          size={16}
          color="#3e5e5e"
          style={[rotatedIconStyle]}
        />
      </View>
      <Animated.View style={[collapsableStyle]}>
        <Text
          className="text-lg italic text-onSurface"
          onTextLayout={handleLayoutChange}
        >
          {content}
        </Text>
      </Animated.View>
    </Pressable>
  );
};
