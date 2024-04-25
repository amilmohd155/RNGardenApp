import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { cva } from "class-variance-authority";
import { useColorScheme } from "nativewind";
import { forwardRef, useCallback, useMemo } from "react";
import { UseControllerProps, useController } from "react-hook-form";
import { Text, View } from "react-native";

import { ActionButton } from "./ActionButton";
import { RadioButton } from "./RadioButton";

import { LightConditionsRadioOptions } from "@/constants/values";
import { InsertPlantFieldValues } from "@/types/form";

export const LightBottomSheet = forwardRef<
  BottomSheet,
  {
    onChange?: (value: string) => void;
    onSubmit?: (value: string) => void;
  } & UseControllerProps<InsertPlantFieldValues>
>(({ onChange, onSubmit, ...props }, ref) => {
  const { colorScheme } = useColorScheme();
  const snapPoints = useMemo(() => ["40%", "50%"], []);

  const { field, formState } = useController<InsertPlantFieldValues>({
    ...props,
  });

  const handleOnChange = useCallback(
    (value: string) => {
      field.onChange(value);
      onChange && onChange(value);
    },
    [field, onChange],
  );

  const handleOnSubmit = useCallback(() => {
    onSubmit && onSubmit(field.value as string);
    // Close the bottom sheet
    // @ts-ignore
    ref?.current?.close();
  }, [field.value, onSubmit, ref]);

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

  const renderFooter = useCallback(
    (props: any) => (
      <BottomSheetFooter {...props} bottomInset={24}>
        <View className="mx-5">
          <ActionButton
            label="Done"
            icon="sunny"
            iconClassName={cva("{}-[color]: color-onTertiaryContainer")()}
            containerClassName="bg-tertiaryContainer"
            labelClassname="text-onTertiaryContainer"
            size={16}
            onPress={handleOnSubmit} // Add onPress
          />
        </View>
      </BottomSheetFooter>
    ),
    [handleOnSubmit],
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
        borderTopEndRadius: 25,
        borderTopStartRadius: 25,
      }}
      backgroundStyle={{
        backgroundColor: colorScheme === "dark" ? "#1c3a23" : "#f0f0f0",
      }}
    >
      <BottomSheetView className="flex-1 gap-5 p-5">
        {/* Header */}
        <Text className="text-3xl font-bold text-onSecondaryContainer">
          Lighting Condition
        </Text>
        {/* Content */}

        <RadioButton
          data={LightConditionsRadioOptions}
          onSelect={handleOnChange}
          defaultValue={formState.defaultValues?.lightCondition as string}
        />
      </BottomSheetView>
    </BottomSheet>
  );
});
