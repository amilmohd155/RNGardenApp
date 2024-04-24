import { FontAwesome } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import SegmentedControl, {
  SegmentedControlProps,
} from "@react-native-segmented-control/segmented-control";
import { cssInterop, remapProps, useColorScheme } from "nativewind";
import { forwardRef, useCallback, useMemo, useState } from "react";
import { View, Text } from "react-native";

import Colors from "@/theme/Colors";

enum SortBy {
  alias,
  room,
  period,
}

export const FilterBottomSheet = forwardRef<
  BottomSheet,
  {
    onSortChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    selectedSort?: number;
    selectedStatus?: number;
  }
>(
  (
    { onSortChange, onStatusChange, selectedSort = 0, selectedStatus = 0 },
    ref,
  ) => {
    const { colorScheme } = useColorScheme();
    const snapPoints = useMemo(() => ["25%", "40%"], []);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={1}
          disappearsOnIndex={0}
        />
      ),
      [],
    );

    return (
      <Portal>
        <BottomSheet
          ref={ref}
          snapPoints={snapPoints}
          index={-1}
          enablePanDownToClose
          backdropComponent={renderBackdrop}
          handleIndicatorStyle={{
            backgroundColor: colorScheme !== "dark" ? "#1c3a23" : "#f0f0f0",
          }}
          handleStyle={{
            borderTopEndRadius: 15,
            borderTopStartRadius: 15,
          }}
          backgroundStyle={{
            backgroundColor:
              colorScheme === "dark"
                ? Colors.secondary[800]
                : Colors.secondary[100],
          }}
        >
          <BottomSheetView className="flex-1">
            <Text className="bg-secondary/10 p-5 text-center text-2xl font-bold tracking-wide text-onSecondaryContainer">
              Sort & Filter
            </Text>
            <View className="gap-3 p-5">
              <FilterSegementedControl
                label="Sort by"
                values={["Name", "Room", "Watering period"]}
                selectedIndex={selectedSort}
                onChange={(event) => {
                  onSortChange(SortBy[event.nativeEvent.selectedSegmentIndex]);
                }}
              />
            </View>
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    );
  },
);

export const FilterButton = ({ onPress }: { onPress: () => void }) => {
  const handleOnPress = useCallback(() => {
    onPress();
  }, [onPress]);

  return (
    <FontAwesome
      onPress={handleOnPress}
      name="sort"
      size={24}
      className="{}-[color]:color-onSecondary rounded-lg bg-secondary px-5 py-3 shadow-lg active:bg-secondary/50 active:color-onSecondary/50"
    />
  );
};

const CustomSegmentedControl = remapProps(SegmentedControl, {
  fontClassName: "fontStyle",
  activeFontClassName: "activeFontStyle",
});
cssInterop(CustomSegmentedControl, {
  className: {
    target: "style",
    nativeStyleToProp: {
      tintColor: "tintColor",
      backgroundColor: "backgroundColor",
    },
  },
  activeFontClassName: {
    target: "activeFontStyle",
  },
  fontClassName: {
    target: "fontStyle",
  },
});

export const FilterSegementedControl = (
  props: SegmentedControlProps & { label: string },
) => {
  const [selectedIndex, setSelectedIndex] = useState(props.selectedIndex);

  return (
    <View className="my-5 gap-2">
      <Text className="text-xl font-semibold text-onSecondaryContainer">
        {props.label}
      </Text>
      <CustomSegmentedControl
        {...props}
        selectedIndex={selectedIndex}
        onChange={(event) => {
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
          props.onChange?.(event);
        }}
        activeFontClassName="font-bold text-onPrimary"
        className="{}-[tintColor]:color-secondary h-16 bg-secondaryContainer"
        fontClassName="text-primary"
      />
    </View>
  );
};
