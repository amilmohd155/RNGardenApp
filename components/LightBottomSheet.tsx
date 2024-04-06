import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback, useMemo } from "react";
import { UseControllerProps, useController } from "react-hook-form";
import { Text, View } from "react-native";

import { ActionButton } from "./ActionButton";
import { RadioButton } from "./RadioButton";

import { LightConditionsRadioOptions } from "@/constants/values";
import { InsertPlantFieldValues } from "@/lib/form";

export const LightBottomSheet = forwardRef<
  BottomSheet,
  {
    onChange?: (value: string) => void;
    onSubmit?: (value: string) => void;
  } & UseControllerProps<InsertPlantFieldValues>
>(({ onChange, onSubmit, ...props }, ref) => {
  const snapPoints = useMemo(() => ["50%"], []);

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
        appearsOnIndex={0}
        disappearsOnIndex={-1}
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
            iconColor="#3e5e5e"
            containerClassName="bg-[#cfddba]"
            labelClassname="text-primary"
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
        backgroundColor: "white",
        borderTopEndRadius: 25,
        borderTopStartRadius: 25,
      }}
      backgroundStyle={{ backgroundColor: "white" }}
    >
      <BottomSheetView className="mb-5 flex-1 gap-5 p-5">
        {/* Header */}
        <Text className="text-3xl font-bold text-primary">
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
