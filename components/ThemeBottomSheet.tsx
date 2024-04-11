import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "nativewind";
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { View, Text, Pressable } from "react-native";

import { useAppPersistStore } from "@/hooks/useAppPersistStore";
import { ThemePreferences } from "@/theme";
import { Portal } from "@gorhom/portal";
import { useNavigation } from "expo-router";

type IThemeData = {
  label: string;
  value: ThemePreferences;
  icon: React.ComponentProps<typeof Ionicons>["name"];
};

const ThemeData: IThemeData[] = [
  {
    label: "On",
    value: "dark",
    icon: "moon-outline",
  },
  {
    label: "Off",
    value: "light",
    icon: "sunny-outline",
  },
  {
    label: "Use device settings",
    value: "system",
    icon: "cog-outline",
  },
];

const ThemeBottomSheet = forwardRef<BottomSheet>((_, ref) => {
  const snapPoints = useMemo(() => ["40%", "60%"], []);

  const { setColorScheme, colorScheme } = useColorScheme();
  const { themePreference, setThemePreference } = useAppPersistStore();

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        // onPress={() => console.log("Backdrop Pressed")}
        appearsOnIndex={1}
        disappearsOnIndex={0}
        enableTouchThrough
      />
    ),
    [],
  );

  const handleSettingTheme = useCallback(
    (value: ThemePreferences) => {
      setColorScheme(value);
      setThemePreference(value);
    },
    [setColorScheme, setThemePreference],
  );

  return (
    <Portal>
      <BottomSheet
        snapPoints={snapPoints}
        ref={ref}
        index={-1}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundComponent={({ style }) => (
          <LinearGradient
            colors={
              colorScheme === "light"
                ? ["rgba(89, 116, 111, 1)", "rgba(89, 116, 111, 0.7)"]
                : ["rgba(0,0,0,1)", "rgba(0,0,0,0.8)"]
            }
            style={style}
          />
        )}
        handleIndicatorStyle={{ backgroundColor: "white" }}
        backgroundStyle={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        style={{ zIndex: 1000, flex: 1 }}
      >
        <BottomSheetView className="flex-1">
          <Text className="my-5 px-8 text-2xl font-semibold text-onSurface">
            Dark Mode
          </Text>
          <View className="mb-5 h-1 border-b border-gray-600" />
          {/* Options */}
          {ThemeData.map(({ value, icon, label }) => (
            <ThemeCard
              key={value}
              onPress={handleSettingTheme}
              icon={icon}
              label={label}
              value={value}
              selected={themePreference === value}
            />
          ))}
        </BottomSheetView>
      </BottomSheet>
    </Portal>
  );
});

export default memo(ThemeBottomSheet);

const ThemeCard = ({
  label,
  value,
  onPress,
  icon,
  selected,
}: {
  label: string;
  value: ThemePreferences;
  onPress: (value: ThemePreferences) => void;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  selected: boolean;
}) => {
  return (
    <Pressable
      onPress={() => onPress(value)}
      className="mx-8 my-1 flex-row items-center justify-between rounded-2xl border-2 p-5"
    >
      <View className="flex-row gap-5">
        <Ionicons name={icon} size={16} color="#FFF" />
        <Text className="text-lg font-semibold text-white">{label}</Text>
      </View>
      <Ionicons
        name={selected ? "radio-button-on" : "radio-button-off"}
        size={16}
        color="#FFF"
      />
    </Pressable>
  );
};
