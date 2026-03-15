/**
 * global.js - XP75 shared styles and design tokens
 *
 * Exports:
 *   Colours:    NAVY, ACCENT, MUTED, TEXT, BG, CARD, SUCCESS, DANGER
 *   Shadows:    shadow
 *   Typography: fontSizes, fontWeights
 *   Layouts:    baseCard, layout
 *
 * baseCard is the standard card used across the app.
 * Import it for task rows, reflection fields, achievement boxes, book cards, etc.
 */

import { StyleSheet } from "react-native";

// Colour Tokens

export const NAVY = "#1A1A2E";
export const ACCENT = "#4F6EF7";
export const MUTED = "#9A9AAF";
export const TEXT = "#1A1A2E";
export const BG = "#F7F8FC";
export const CARD = "#FFFFFF";
export const SUCCESS = "#22C55E";
export const DANGER = "#EF4444";

// Shadow
// Used in TaskCard, MoodTracker, ReflectionField, Achievements, etc.

export const shadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.07,
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

// Shared StyleSheets
// baseCard - white rounded elevated container, the core card pattern for the app.
// Usage: import { baseCard } from "../styles/global";
//        <View style={baseCard.card}> ... </View>

export const baseCard = StyleSheet.create({
  card: {
    backgroundColor: CARD,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    ...shadow,
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
