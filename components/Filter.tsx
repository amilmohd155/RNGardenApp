import { FontAwesome } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import SegmentedControl, {
  SegmentedControlProps,
} from "@react-native-segmented-control/segmented-control";
import { forwardRef, useCallback, useMemo, useState } from "react";
import { View, Text } from "react-native";

import Colors from "@/theme/Colors";

enum SortBy {
  alias,
  room,
  period,
}

enum Status {
  watered,
  notWatered,
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
    const snapPoints = useMemo(() => ["40%", "50%"], []);

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
          handleIndicatorStyle={{ backgroundColor: "#FFF" }}
          handleStyle={{
            backgroundColor: Colors.secondary[500],
            borderTopEndRadius: 15,
            borderTopStartRadius: 15,
          }}
        >
          <BottomSheetView className="flex-1 bg-secondaryContainer">
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

              <FilterSegementedControl
                label="Status"
                values={["Watered", "Not Watered"]}
                selectedIndex={selectedStatus}
                onChange={(event) => {
                  onStatusChange(
                    Status[event.nativeEvent.selectedSegmentIndex],
                  );
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
      className="{}-[color]:color-onSecondary rounded-lg bg-secondaryContainer px-5 py-3 shadow-lg active:bg-gray-100"
    />
  );
};

export const FilterSegementedControl = (
  props: SegmentedControlProps & { label: string },
) => {
  const [selectedIndex, setSelectedIndex] = useState(props.selectedIndex);

  return (
    <View className="my-5 gap-2">
      <Text className="text-xl font-semibold text-onSecondaryContainer">
        {props.label}
      </Text>
      <SegmentedControl
        {...props}
        selectedIndex={selectedIndex}
        onChange={(event) => {
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
          props.onChange?.(event);
        }}
        style={{ height: 45 }}
        tintColor="#59746f"
        backgroundColor="#eff3ec"
        fontStyle={{ color: "green" }}
        activeFontStyle={{ color: "white", fontWeight: "bold" }}
      />
    </View>
  );
};
