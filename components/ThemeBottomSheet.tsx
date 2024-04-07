import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import React, { forwardRef, memo, useCallback, useMemo } from "react";
import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ActionButton } from "./ActionButton";

type IThemeData = {
  label: string;
  value: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  // iconColor: string;
  // fontColor: string;
  // borderColor: string;
  // backgroundColor: string;
  // activeBackgroundColor: string;
};

const ThemeData: IThemeData[] = [
  {
    label: "On",
    value: "dark",
    icon: "moon-outline",
    // iconColor: "[#eff3ec]",
    // fontColor: "text-surface",
    // borderColor: "[#1d1f25]",
    // backgroundColor: "[#3b3f4f]",
    // activeBackgroundColor: "[#1d1f25]",
  },
  {
    label: "Off",
    value: "light",
    icon: "sunny-outline",
    // iconColor: "[#374544]",
    // fontColor: "text-surface",
    // borderColor: "green-400",
    // backgroundColor: "[#86aaa7]",
    // activeBackgroundColor: "green-400",
  },
  {
    label: "Use device settings",
    value: "auto",
    icon: "cog-outline",
    // iconColor: "[rgb(55 65 81)]",
    // fontColor: "text-gray-700",
    // borderColor: "gray-600",
    // backgroundColor: "gray-50",
    // activeBackgroundColor: "gray-400",
  },
];

const ThemeBottomSheet = forwardRef<BottomSheet>((_, ref) => {
  const snapPoints = useMemo(() => ["40%"], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  return (
    <BottomSheet
      snapPoints={snapPoints}
      ref={ref}
      index={-1}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundComponent={({ style }) => (
        <LinearGradient
          colors={["rgba(0,0,0,0.8)", "transparent"]}
          style={style}
        />
      )}
      handleIndicatorStyle={{ backgroundColor: "white" }}
      backgroundStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
    >
      <BottomSheetView className="flex-1">
        <Text className="my-5 px-8 text-2xl font-semibold text-surface">
          Dark Mode
        </Text>
        <View className="mb-5 h-1 border-b border-gray-600" />
        {/* Options */}
        {ThemeData.map(({ value, icon, label }) => (
          <ThemeCard
            key={value}
            onPress={() => {}}
            icon={icon}
            label={label}
            value={value}
          />
        ))}
      </BottomSheetView>
    </BottomSheet>
  );
});

export default memo(ThemeBottomSheet);

const ThemeCard = ({
  label,
  value,
  onPress,
  icon,
}: {
  label: string;
  value: string;
  onPress: () => void;
  icon: React.ComponentProps<typeof Ionicons>["name"];
}) => {
  return (
    <Pressable
      onPress={onPress}
      className="mx-8 my-1 flex-row items-center justify-between rounded-2xl border-2 p-5"
    >
      <View className="flex-row gap-5">
        <Ionicons name={icon} size={16} color="#FFF" />
        <Text className="text-lg font-semibold text-white">{label}</Text>
      </View>
      <Ionicons name="radio-button-off" size={16} color="#FFF" />
    </Pressable>
  );
};
