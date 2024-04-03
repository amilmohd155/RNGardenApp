import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { PlantFV, plantSchema } from "@/lib/Form";
import { Pressable, PressableProps, Text, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef } from "react";

import { ActionButton } from "@/components/ActionButton";
import { Counter } from "@/components/Counter";
import { ImageCard } from "@/components/ImageCard";
import { Ionicons } from "@expo/vector-icons";
import { LightBottomSheet } from "@/components/LightBottomSheet";
import { RadioButton } from "@/components/RadioButton";
import { TextInput } from "@/components/TextInput";
import { useForm } from "react-hook-form";
import { useNavigation } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { zodResolver } from "@hookform/resolvers/zod";

const RADIODATA = [
  {
    label: "Bright Indirect",
    value: "Bright Indirect",
  },
  {
    label: "Bright Direct",
    value: "Bright Direct",
  },
  {
    label: "Low Light",
    value: "Low Light",
  },
];

export default function AddScreen() {
  const inset = useSafeAreaInsets();

  const navigation = useNavigation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<PlantFV>({
    defaultValues: {
      plantName: "",
      room: "",
      period: 1,
      portion: 100,
    },
    mode: "onChange",
    resolver: zodResolver(plantSchema),
  });

  const onSubmit = (data: PlantFV) => console.log(data);

  const bottomSheetRef = useRef<BottomSheet>(null);
  // const snapPoints = useMemo(() => ["25%", "50%"], []);

  // const renderBackdrop = useCallback(
  //   (props) => <BottomSheetBackdrop {...props} />,
  //   []
  // );

  // const renderFooter = useCallback(
  //   (props) => (
  //     <BottomSheetFooter {...props} bottomInset={24}>
  //       <View className="mx-5">
  //         <ActionButton
  //           label="Done"
  //           icon="checkmark"
  //           iconColor="green"
  //           containerClassName="bg-[#cfddba]"
  //         />
  //       </View>
  //     </BottomSheetFooter>
  //   ),
  //   []
  // );

  return (
    <View className="flex-1 bg-white px-5" style={{ paddingTop: inset.top }}>
      {/* Header */}
      <View className="flex-row gap-5 rounded-b-lg my-5 justify-center">
        {/* Cancel Button */}
        <ActionButton
          onPress={() => {
            reset({ plantName: "", room: "", period: 1 });
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
          onPress={handleSubmit(onSubmit)}
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
      <ImageCard />
      {/* Form */}
      <View className="gap-5">
        {/* Plant Name Input */}
        <TextInput
          name="plantName"
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
        <View className="gap-2">
          <Text className="text-xl font-bold">Lighting Condition</Text>
          <Pressable
            onPress={() => bottomSheetRef.current?.expand()}
            className="flex-row border-[#ece5e5] active:border-primary border-2 p-4 rounded-lg justify-between items-center"
          >
            <Text className="text-lg">Bright Indirect</Text>
            <Ionicons name="chevron-down" size={24} color="#3e5e5e" />
          </Pressable>
        </View>
      </View>

      {/* BottomSheet */}
      <LightBottomSheet ref={bottomSheetRef} />
    </View>
  );
}
