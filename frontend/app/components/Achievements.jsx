import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Achievements() {
  const bronzeBadge = require("../assets/bronze-achievement-medal-badge-popping-up-rendered.jpeg");
  const silverBadge = require("../assets/same-image-bronze-achievement-medal-changed-to-shi.jpeg");
  const goldBadge = require("../assets/same-image-silver-achievement-medal-changed-to-shi.jpeg");

  const dummyAchievements = [
    { id: 1, milestone: 25, awarded_at: "2026-03-01" },
    { id: 2, milestone: 50, awarded_at: "2026-04-01" },
  ];

  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    setAchievements(dummyAchievements);
  }, []);

  const badgeConfig = {
    25: { label: "Bronze Badge", icon: bronzeBadge },
    50: { label: "Silver Badge", icon: silverBadge },
    75: { label: "Gold Badge", icon: goldBadge },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Achievements</Text>

      <View style={styles.badgesRow}>
        {achievements.map((achievement) => {
          const badge = badgeConfig[achievement.milestone];

          return (
            <View key={achievement.id} style={styles.badge}>
              <Image source={badge.icon} style={styles.badgeImage} />
              <Text>{badge.label}</Text>
              <Text>{new Date(achievement.awarded_at).toDateString()}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  badgesRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  badge: {
    alignItems: "center",
  },
  badgeImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
});
