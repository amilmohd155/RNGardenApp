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
import { Pressable, View, Text } from "react-native";

export const FilterBottomSheet = forwardRef<BottomSheet>((_, ref) => {
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
    <Portal>
      <BottomSheet
        ref={ref}
        snapPoints={snapPoints}
        index={-1}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: "#FFF" }}
        handleStyle={{
          backgroundColor: "#59746f",
          borderTopEndRadius: 15,
          borderTopStartRadius: 15,
        }}
      >
        <BottomSheetView>
          <Text className="bg-primary p-5 text-center text-2xl font-bold tracking-wide text-white">
            Sort & Filter
          </Text>
          <View className="gap-3 p-5">
            <FilterSegementedControl
              label="Sort by"
              values={["Plant name", "Room", "Watering period"]}
              selectedIndex={0}
            />

            <FilterSegementedControl
              label="Status"
              values={["All", "Finished", "Upcoming"]}
              selectedIndex={0}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </Portal>
  );
});

export const FilterButton = ({ onPress }: { onPress: () => void }) => {
  const handleOnPress = useCallback(() => {
    onPress();
  }, [onPress]);

  return (
    <Pressable
      onPress={handleOnPress}
      className="rounded-lg bg-white px-5 py-3 active:bg-gray-100"
    >
      <FontAwesome name="sort" size={24} color="#486766" className="" />
    </Pressable>
  );
};

export const FilterSegementedControl = (
  props: SegmentedControlProps & { label: string },
) => {
  const [selectedIndex, setSelectedIndex] = useState(props.selectedIndex);

  return (
    <View className="my-5 gap-2">
      <Text className="text-xl font-semibold">{props.label}</Text>
      <SegmentedControl
        {...props}
        selectedIndex={selectedIndex}
        onChange={(event) => {
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
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
