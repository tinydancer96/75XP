import { View, Text, StyleSheet } from "react-native";
import { ACCENT, MUTED, TEXT, fontSizes, fontWeights } from "../styles/global";
import { useUserContext } from "../context/UserContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
export default function DayProgress({
  completedCount,
  totalTasks,
  dayNumber,
  totalDays,
}) {
  const { accessToken } = useUserContext();
  const [data, setData] = useState([]);
  const [err, setErr] = useState(null);
  const percent = (completedCount / totalTasks) * 100;
  let latestDayId = 0;
  if (data.length > 0) {
    latestDayId = Math.max(...data.map((day) => day.day_number));
  }

  useEffect(() => {
    if (!accessToken) return;
    const asyncFetchDay = async () => {
      try {
        const response = await axios.get(
          `https://xp75-be.onrender.com/api/days/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const result = response.data;
        // setData(Array.isArray(result) ? result : [result]);

        setData(result.days);
      } catch (error) {
        setErr(error);
        console.log(error);
      }
    };
    asyncFetchDay();
  }, [accessToken]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.dayInfo}>
        <Text style={styles.dayNumber}>Day {latestDayId}</Text>
        <Text style={styles.totalDays}>of {totalDays}</Text>
      </View>

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
  dayInfo: {
    marginRight: 12,
    alignItems: "flex-start",
  },
  dayNumber: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
    color: TEXT,
  },
  totalDays: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: MUTED,
    marginTop: -2,
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
    fontSize: fontSizes.sm,
    color: MUTED,
    fontWeight: fontWeights.medium,
    minWidth: 70,
    textAlign: "right",
  },
});
