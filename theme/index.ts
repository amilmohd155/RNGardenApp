import { Theme } from "@react-navigation/native";

export type ThemePreferences = "light" | "dark" | "system";

export const NavigationTheme = (
  colorScheme: "light" | "dark" | undefined,
): Theme => {
  if (colorScheme === "light") {
    return {
      dark: false,
      colors: {
        primary: "#006a60",
        background: "#f5fff3",
        card: "#ffffff",
        text: "rgb(0 33 14)",
        border: "transparent",
        notification: "#5a88ad",
      },
    };
  }

  return {
    dark: true,
    colors: {
      primary: "#006b3f",
      background: "transparent",
      card: "#080a08",
      text: "#ffffff",
      border: "transparent",
      notification: "#5a88ad",
    },
  };
};
