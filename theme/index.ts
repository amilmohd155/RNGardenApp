import { Theme } from "@react-navigation/native";

export type ThemePreferences = "light" | "dark" | "system";

export const NavigationTheme = (
  colorScheme: "light" | "dark" | undefined,
): Theme => {
  if (colorScheme !== "dark") {
    return {
      dark: false,
      colors: {
        primary: "rgb(0, 106, 96)",
        background: "rgb(245, 255, 243)",
        card: "rgb(255, 255, 255)",
        text: "rgb(0 33 14)",
        border: "transparent",
        notification: "rgb(74, 99, 95)",
      },
    };
  }

  return {
    dark: true,
    colors: {
      primary: "rgb(83, 219, 202)",
      background: "#fff",
      card: "rgb(0, 33, 14)",
      text: "#99f7b5",
      border: "transparent",
      notification: "rgb(74, 99, 95)",
    },
  };
};
