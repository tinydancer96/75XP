import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useUserContext } from "../context/UserContext";

export default function Achievements() {
  const { login, user, accessToken } = useUserContext();
  console.log("Token from context:", accessToken);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchAchievements = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`https://xp75-be.onrender.com/api/milestones`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      //console.log("status:", response.status);

      if (!response.ok) {
        throw new Error("Failed to fetch achievements");
      }

      const data = await response.json();

      setAchievements(data);
    } catch (err) {
      setError("Unable to load achievements");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (accessToken) {
      fetchAchievements();
    }
  }, [accessToken]);
  const badgeConfig = {
    bronze: { label: "Bronze Badge", icon: "🥉" },
    silver: { label: "Silver Badge", icon: "🥈" },
    gold: { label: "Gold Badge", icon: "🥇" },
  };

  //const badge = badgeConfig[achievement.milestone];
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading achievements...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (achievements.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No badges earned yet — Complete 25 days to earn your first badge!</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Achievements</Text>

      <View style={styles.badgesRow}>
        {achievements.map((achievement, index) => {
          const badge = badgeConfig[achievement.badge_type];

          if (!badge) return null;

          return (
            <View key={index} style={styles.badge}>
              <Text style={styles.badgeIcon}>{badge.icon}</Text>
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

  badgeIcon: {
    fontSize: 40,
  },
});
