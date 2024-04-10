import { Theme } from "@react-navigation/native";

import Color from "./Colors";

export type ThemePreferences = "light" | "dark" | "system";

// const tintColorLight = "#3e5e5e";
// const tintColorDark = "#fff";

// export default {
//   light: {
//     text: "#000",
//     background: "#fff",
//     tint: tintColorLight,
//     tabIconDefault: "#ccc",
//     tabIconSelected: tintColorLight,
//   },
//   dark: {
//     text: "#fff",
//     background: "#000",
//     tint: tintColorDark,
//     tabIconDefault: "#ccc",
//     tabIconSelected: tintColorDark,
//   },
// };

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
