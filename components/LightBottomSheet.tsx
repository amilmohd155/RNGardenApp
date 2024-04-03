import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Ref, forwardRef, useCallback, useMemo } from "react";
import { Text, View } from "react-native";

import { ActionButton } from "./ActionButton";
import { RadioButton } from "./RadioButton";

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

export const LightBottomSheet = forwardRef(({}, ref: Ref<BottomSheet>) => {
  const snapPoints = useMemo(() => ["50%"], []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props} bottomInset={24}>
        <View className="mx-5">
          <ActionButton
            label="Done"
            icon="sunny"
            iconColor="#3e5e5e"
            containerClassName="bg-[#cfddba]"
            labelClassname="text-primary"
            size={16}
            onPress={() => {}} // Add onPress
          />
        </View>
      </BottomSheetFooter>
    ),
    []
  );

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      footerComponent={renderFooter}
      handleStyle={{
        backgroundColor: "white",
        borderTopEndRadius: 25,
        borderTopStartRadius: 25,
      }}
      backgroundStyle={{ backgroundColor: "white" }}
    >
      <BottomSheetView className="flex-1 p-5 mb-5 gap-5">
        {/* Header */}
        <Text className="text-3xl font-bold text-primary">
          Lighting Condition
        </Text>
        {/* Content */}

        <RadioButton
          data={RADIODATA}
          onSelect={(value) => console.log(value)}
        />
      </BottomSheetView>
    </BottomSheet>
  );
});
