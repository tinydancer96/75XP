import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ACCENT = "#4F6EF7";
const MUTED = "#9A9AAF";

export default function DayProgress({ completedCount, totalTasks }) {
  const percent = (completedCount / totalTasks) * 100;

  return (
    <View style={styles.wrapper}>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${percent}%` }]} />
      </View>
      <Text style={styles.progressLabel}>
        {completedCount}/{totalTasks} complete
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: "#E2E4EE",
    borderRadius: 99,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: ACCENT,
    borderRadius: 99,
  },
  progressLabel: {
    fontSize: 12,
    color: MUTED,
    fontWeight: "500",
    minWidth: 70,
    textAlign: "right",
  },
});
