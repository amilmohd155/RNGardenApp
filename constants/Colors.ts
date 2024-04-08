import { vars } from "nativewind";

export type ThemePreferences = "light" | "dark" | "system";

const tintColorLight = "#3e5e5e";
const tintColorDark = "#fff";

export default {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};

export const theme = {
  light: vars({
    "--color-primary-default": "#3a5e96",
  }),
  dark: vars({}),
};
