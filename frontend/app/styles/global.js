import { StyleSheet } from "react-native";

// Colour Tokens

export const NAVY = "#1A1A2E";
export const ACCENT = "#4F6EF7";
export const ACCENT_SOFT = "#EEF1FE";
export const MUTED = "#9A9AAF";
export const TEXT = "#1A1A2E";
export const BG = "#f7f8fcd4";
export const CARD = "#FFFFFF";
export const SURFACE = "#F0F0F5";
export const SUCCESS = "#22C55E";
export const SUCCESS_SOFT = "#DCFCE7";
export const SUCCESS_DARK = "#16A34A";
export const DANGER = "#EF4444";

// Shadow
// Used in TaskCard, MoodTracker, ReflectionField, Achievements, etc.

export const shadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.3,
  shadowRadius: 10,
  elevation: 3,
};

// Typography

export const fontSizes = {
  xs: 11,
  sm: 12,
  base: 14,
  md: 15,
  lg: 18,
  xl: 22,
};

export const fontWeights = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
};

// baseCard - white rounded elevated container, the core card pattern for the app.

export const baseCard = StyleSheet.create({
  card: {
    backgroundColor: CARD,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    ...shadow,
  },
});

// closeBtnStyles

export const closeBtnStyles = StyleSheet.create({
  btn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: SURFACE,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: fontWeights.semibold,
    color: NAVY,
  },
});

// pillBtn - small action button used on task cards

export const pillBtn = StyleSheet.create({
  btn: {
    backgroundColor: ACCENT_SOFT,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 7,
  },
  btnDone: {
    backgroundColor: SUCCESS_SOFT,
  },
  text: {
    color: ACCENT,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
  },
  textDone: {
    color: SUCCESS_DARK,
  },
});

export const layout = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  centred: {
    alignItems: "center",
    justifyContent: "center",
  },
  screenPadding: {
    paddingHorizontal: 20,
  },
});
