import { cva } from "class-variance-authority";
import React, { useEffect } from "react";
import { UseControllerProps, useController } from "react-hook-form";
import {
  TextInput as DefaultTextInput,
  FlexStyle,
  Pressable,
  Text,
  TextInputProps,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";

import { InsertPlantFieldValues } from "@/types/form";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  label?: string;
  hidden?: boolean;
  suggestions?: string[];
} & UseControllerProps<InsertPlantFieldValues> &
  TextInputProps;

export const TextInput = ({
  label,
  hidden = false,
  suggestions,
  ...props
}: Props) => {
  const {
    field: { value, onChange, onBlur, ...field },
    fieldState: { error },
  } = useController<InsertPlantFieldValues>(props);

  const ref = React.useRef<DefaultTextInput>(null);

  const [dirty, setDirty] = React.useState(false);

  const textInputStyle = cva(
    `rounded-lg border-2 p-3 text-lg text-onSurfaceVariant {}-[placeholderTextColor]:color-onSurfaceVariant/50 ${
      error ? "border-error-500" : "border-outline focus:border-primary"
    }`,
  )();

  useEffect(() => {
    setDirty(value !== "");

    return () => {
      setDirty(false);
    };
  }, [dirty, value]);

  return (
    <View className="gap-2" style={{ display: hidden ? "none" : "flex" }}>
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-bold text-onSurfaceVariant">{label}</Text>
        {error && (
          <Text className="text-sm italic text-error-500">Required</Text>
        )}
      </View>

      <DefaultTextInput
        {...field}
        {...props}
        ref={ref}
        // onFocus={() => setFocused(true)}
        // onBlur={() => {
        //   if (!clickedSuggestion) {
        //     onBlur();
        //     setFocused(false);
        //   }
        // }}
        className={textInputStyle}
        onChangeText={onChange}
        value={value?.toString()}
      />

      {suggestions && suggestions?.length > 0 && (
        <TextSuggestions
          className={`${dirty ? "flex h-10 translate-x-0" : "hidden h-0 -translate-x-20"} transition-all duration-200 ease-in-out`}
          suggestions={suggestions}
          onSuggestionSelected={onChange}
        />
      )}
    </View>
  );
};

const TextSuggestions = ({
  className,
  suggestions,
  onSuggestionSelected,
}: {
  className: string;
  suggestions: string[];
  onSuggestionSelected: (value: string) => void;
  onPress?: () => void;
}) => {
  return (
    <View className={`my-1 flex-row gap-2 ${className}`}>
      {suggestions.slice(0, 3).map((suggestion) => (
        <Text
          onPress={() => onSuggestionSelected(suggestion)}
          className="rounded-2xl bg-tertiaryContainer px-5 py-2 text-lg font-semibold italic text-onTertiaryContainer active:bg-tertiary/50 active:text-onTertiary"
          key={suggestion}
        >
          {suggestion}
        </Text>
      ))}
    </View>
  );
};
