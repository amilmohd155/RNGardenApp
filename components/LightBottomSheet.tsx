import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetView,
  useBottomSheet,
} from "@gorhom/bottom-sheet";
import {
  Ref,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Text, View } from "react-native";
import { UseControllerProps, useController } from "react-hook-form";

import { ActionButton } from "./ActionButton";
import { LIGHT_CONDITIONS } from "@/constants/values";
import { PlantFV } from "@/lib/Form";
import { RadioButton } from "./RadioButton";

const RADIODATA = [
  {
    label: LIGHT_CONDITIONS.BRIGHT_INDIRECT,
    value: LIGHT_CONDITIONS.BRIGHT_INDIRECT,
  },
  {
    label: LIGHT_CONDITIONS.BRIGHT_DIRECT,
    value: LIGHT_CONDITIONS.BRIGHT_DIRECT,
  },
  {
    label: LIGHT_CONDITIONS.LOW_LIGHT,
    value: LIGHT_CONDITIONS.LOW_LIGHT,
  },
];

export const LightBottomSheet = forwardRef<
  BottomSheet,
  {
    onChange?: (value: string) => void;
    onSubmit?: (value: string) => void;
  } & UseControllerProps<PlantFV>
>(({ onChange, onSubmit, ...props }, ref) => {
  const snapPoints = useMemo(() => ["50%"], []);

  const { field, fieldState, formState } = useController<PlantFV>({
    ...props,
  });

  const handleOnChange = useCallback((value: string) => {
    field.onChange(value);
    onChange && onChange(value);
  }, []);

  const handleOnSubmit = useCallback(() => {
    onSubmit && onSubmit(field.value as string);
    // Close the bottom sheet
    // @ts-ignore
    ref?.current?.close();
  }, [field.value]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const renderFooter = useCallback(
    (props: any) => (
      <BottomSheetFooter {...props} bottomInset={24}>
        <View className="mx-5">
          <ActionButton
            label="Done"
            icon="sunny"
            iconColor="#3e5e5e"
            containerClassName="bg-[#cfddba]"
            labelClassname="text-primary"
            size={16}
            onPress={handleOnSubmit} // Add onPress
          />
        </View>
      </BottomSheetFooter>
    ),
    [handleOnSubmit]
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
          onSelect={handleOnChange}
          defaultValue={formState.defaultValues?.light}
        />
      </BottomSheetView>
    </BottomSheet>
  );
});
