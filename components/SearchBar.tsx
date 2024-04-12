import { Ionicons } from "@expo/vector-icons";
import { cva } from "class-variance-authority";
import { useEffect, useRef } from "react";
import { Keyboard, Pressable, TextInput } from "react-native";

const textInputStyle = cva(
  "tetx-lg {}-[placeholderTextColor]:color-onSecondary/50 text-onSecondary",
)();

type SearchBarProps = {
  data?: string;
};

const SearchBar = () => {
  const inputRef = useRef<TextInput>(null);

  const handleSearchBarFocus = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    Keyboard.addListener("keyboardDidHide", () => {
      inputRef.current?.blur();
    });
  }, []);

  return (
    <Pressable
      onPress={handleSearchBarFocus}
      className="flex-1 flex-row items-center justify-between rounded-lg bg-secondary p-3 shadow-xl shadow-black"
    >
      <TextInput
        ref={inputRef}
        className={textInputStyle}
        autoFocus={false}
        placeholder="Search your plants"
      />
      <Ionicons
        name="search"
        size={24}
        className="{}-[color]: color-onSecondaryContainer"
      />
    </Pressable>
  );
};

export default SearchBar;
