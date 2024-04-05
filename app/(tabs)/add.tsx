import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

import { ActionButton } from "@/components/ActionButton";
import BottomSheet from "@gorhom/bottom-sheet";
import { Counter } from "@/components/Counter";
import { ImageCard } from "@/components/ImageCard";
import { InsertPlantFieldValues } from "@/lib/form";
import { Ionicons } from "@expo/vector-icons";
import { LIGHT_CONDITIONS } from "@/constants/values";
import { LightBottomSheet } from "@/components/LightBottomSheet";
import { TextArea } from "@/components/TextArea";
import { TextInput } from "@/components/TextInput";
import { insertPlantSchema } from "@/db/schema";
import { useNavigation } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AddScreen() {
  const inset = useSafeAreaInsets();

  const navigation = useNavigation();

  const { handleSubmit, control, formState, reset } =
    useForm<InsertPlantFieldValues>({
      defaultValues: {
        period: 1,
        portion: 100,
        light: LIGHT_CONDITIONS.BRIGHT_INDIRECT,
      },
      mode: "onSubmit",
      resolver: zodResolver(insertPlantSchema),
    });

  const onSubmit: SubmitHandler<InsertPlantFieldValues> = (data) => {
    console.log("Form data", data);
  };

  const onError: SubmitErrorHandler<InsertPlantFieldValues> = (errors) => {
    console.log(errors);
  };

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [lightCondition, setLightCondition] = useState<string>(
    LIGHT_CONDITIONS.BRIGHT_INDIRECT,
  );
  const handleLightConditionSubmit = (value: string) => {
    setLightCondition(value);
  };

  return (
    <View className="flex-1 bg-white px-5" style={{ paddingTop: inset.top }}>
      {/* Header */}
      <View className="flex-row gap-5 rounded-b-lg my-5 justify-center">
        {/* Cancel Button */}
        <ActionButton
          onPress={() => {
            reset({ alias: "", room: "", period: 1 });
            navigation.goBack();
          }}
          containerClassName="bg-red-200"
          labelClassname="text-red-600"
          label="Cancel"
          icon="close"
          iconColor="#DC2626"
        />

        {/* Save Button */}
        <ActionButton
          onPress={handleSubmit(onSubmit, onError)}
          containerClassName="bg-[#cfddba]"
          labelClassname="text-primary"
          label="Save"
          icon="water"
          iconColor="#3e5e5e"
        />
      </View>

      {/* Content */}

      {/* Divider */}
      <View className="h-0.5 bg-slate-100" />
      {/* Image */}
      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={}
      >
        <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
          <ImageCard />
          {/* Form */}
          <View className="gap-5 mb-10">
            {/* Plant Name Input */}
            <TextInput
              name="alias"
              control={control}
              placeholder="e.g. Monstera Deliciosa"
              label="Plant name (Alias)"
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
              <Text className="text-xl font-bold">Lighting Condition</Text>
              <Pressable
                onPress={() => bottomSheetRef.current?.expand()}
                className="flex-row border-[#ece5e5] active:border-primary border-2 p-4 rounded-lg justify-between items-center"
              >
                <Text className="text-lg">{lightCondition}</Text>
                <Ionicons name="chevron-down" size={24} color="#3e5e5e" />
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
        </ScrollView>
      </KeyboardAvoidingView>

      {/* BottomSheet */}
      <LightBottomSheet
        ref={bottomSheetRef}
        control={control}
        name="light"
        onSubmit={handleLightConditionSubmit}
      />
    </View>
  );
}
