import { Ionicons } from "@expo/vector-icons";
import { cva } from "class-variance-authority";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Keyboard, Pressable, TextInput } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { usePlantActions, usePlantStore } from "@/hooks";

const textInputStyle = cva(
  "tetx-lg {}-[placeholderTextColor]:color-onSecondary/50 text-onSecondary flex-1 font-bold",
)();

type SearchBarProps = {
  data?: string;
};

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

const SearchBar = () => {
  const inputRef = useRef<TextInput>(null);
  const [searchText, setSearchText] = useState<string>("");
  const wipeAnimation = useSharedValue(0);

  const { refetch, searchPlants } = usePlantActions();

  const handleSearchBarFocus = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    Keyboard.addListener("keyboardDidHide", () => {
      inputRef.current?.blur();
      inputRef.current?.clear();
      setSearchText("");
    });
  }, []);

  const handleTextChange = useMemo(() => {
    return (text: string) => {
      setSearchText(text.trim());
      if (text.trim() === "") {
        wipeAnimation.value = withSpring(0);
        refetch();
      } else {
        wipeAnimation.value = withSpring(1);
        searchPlants(text.trim());
      }
    };
  }, [refetch, searchPlants, wipeAnimation]);

  const handleResetButton = useCallback(() => {
    if (searchText !== "") {
      inputRef.current?.clear();
      setSearchText("");
      wipeAnimation.value = withSpring(0);
      refetch();
    }
  }, [refetch, searchText, wipeAnimation]);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = wipeAnimation.value
      ? interpolate(wipeAnimation.value, [0, 1], [0, 1], Extrapolation.CLAMP)
      : interpolate(wipeAnimation.value, [0, 1], [1, 0], Extrapolation.CLAMP);

    const translateX = wipeAnimation.value
      ? interpolate(wipeAnimation.value, [0, 1], [-10, 0], Extrapolation.CLAMP)
      : interpolate(wipeAnimation.value, [0, 1], [0, 10], Extrapolation.CLAMP);

    return {
      opacity,
      transform: [{ translateX }],
    };
  });

  useEffect(() => {
    return () => {
      Keyboard.removeAllListeners("keyboardDidHide");
    };
  }, []);

  return (
    <Pressable
      onPress={handleSearchBarFocus}
      className="flex-1 flex-row items-center justify-between rounded-lg bg-secondary p-3 shadow-xl shadow-black"
    >
      <TextInput
        ref={inputRef}
        className={textInputStyle}
        value={searchText}
        placeholder="Search your plants"
        onChangeText={handleTextChange}
        returnKeyType="done"
      />
      <AnimatedIcon
        style={animatedStyle}
        name={searchText ? "close" : "search"}
        size={24}
        onPress={searchText ? handleResetButton : undefined}
        className={`{}-[color]:color-onSecondaryContainer ${searchText !== "" && "active:rounded-full active:bg-onSecondary/50 active:color-onSecondaryContainer/50"}`}
      />
    </Pressable>
  );
};

export default SearchBar;
