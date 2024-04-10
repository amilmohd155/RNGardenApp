import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Link, useFocusEffect, useNavigation } from "expo-router";
import React, { useEffect, useMemo } from "react";
import { Pressable, SectionList, Switch, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemeBottomSheet } from "@/components";
import { Portal } from "@gorhom/portal";

enum SettingTypes {
  LINK,
  SWITCH,
  BOTTOMSHEET,
}

type SettingListData = {
  title: string;
  data: {
    label: string;
    type: SettingTypes;
    link?: string;
  }[];
};

const DATA: SettingListData[] = [
  {
    title: "About",
    data: [
      {
        label: "About the developer",
        type: SettingTypes.LINK,
        link: "/(settings)/developer",
      },
      {
        label: "About the app",
        type: SettingTypes.LINK,
        link: "/(settings)/about",
      },
    ],
  },
  {
    title: "Notifcations",
    data: [
      { label: "Reminder", type: SettingTypes.SWITCH },
      { label: "Updates", type: SettingTypes.SWITCH },
    ],
  },
  {
    title: "Other",
    data: [
      {
        label: "Theme",
        type: SettingTypes.BOTTOMSHEET,
        link: "/(settings)/theme",
      },
      { label: "Language", type: SettingTypes.LINK },
    ],
  },
  {
    title: "Feedback",
    data: [
      { label: "Rate us", type: SettingTypes.LINK },
      { label: "Contact us", type: SettingTypes.LINK },
      { label: "Report a bug", type: SettingTypes.LINK },
      { label: "Request a feature", type: SettingTypes.LINK },
    ],
  },
];

export default function SettingsScreen() {
  const inset = useSafeAreaInsets();

  const bottomSheetRef = React.useRef<BottomSheet>(null);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener("blur", () => {
      bottomSheetRef.current?.close();
    });
  }, [navigation]);

  return (
    <View className="flex-1 bg-surface px-5">
      <View className="py-10">
        <Text
          style={{ paddingTop: inset.top }}
          className="text-5xl font-bold text-primary"
        >
          Settings
        </Text>
      </View>
      <SectionList
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View className="h-20" />}
        sections={DATA}
        stickySectionHeadersEnabled={false}
        keyExtractor={(item, index) => item.label + index}
        renderItem={({ item }) => {
          switch (item.type) {
            case SettingTypes.LINK: {
              return (
                <Link href={item.link ? item.link : "/(settings)/one"} asChild>
                  <Pressable className="my-1 rounded-lg bg-inverseSurface  p-5">
                    <Text className="text-lg text-inverseOnSurface">
                      {item.label}
                    </Text>
                  </Pressable>
                </Link>
              );
            }
            case SettingTypes.SWITCH: {
              return (
                <View className="my-1 flex-row items-center justify-between rounded-lg bg-inverseSurface px-5 py-1">
                  <Text className="text-lg text-inverseOnSurface">
                    {item.label}
                  </Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    // onValueChange={toggleSwitch}
                    // value={isEnabled}
                  />
                </View>
              );
            }
            case SettingTypes.BOTTOMSHEET: {
              return (
                <Pressable
                  onPress={() => bottomSheetRef.current?.snapToIndex(1)}
                  className="my-1 rounded-lg bg-inverseSurface p-5"
                >
                  <Text className="text-lg text-inverseOnSurface">
                    {item.label}
                  </Text>
                </Pressable>
              );
            }
          }
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="py-2 text-xl font-semibold text-primary">
            {title}
          </Text>
        )}
      />

      <ThemeBottomSheet ref={bottomSheetRef} />
    </View>
  );
}
