import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const mockReflection = {
  id: 1,
  day_id: 1,
  mood_rating: 4,
  achievements: "Completed my workout and drank all my water.",
  challenges: "Struggled to stay off my phone in the evening.",
  next_day_focus: "Get to bed before 11pm and prep meals.",
  created_at: "2025-03-10T21:00:00.000Z",
};

const PURPLE = "#403557";
const BLUE = "#70add9";
const BG = "#F7F8FC";
const CARD = "#FFFFFF";
const MUTED = "#9A9AAF";
const TEXT = "#1A1A2E";

const getMoodColor = (rating) => {
  switch (rating) {
    case 1:
      return "#E05555";
    case 2:
      return "#E07A55";
    case 3:
      return "#E0C155";
    case 4:
      return "#82C55A";
    case 5:
      return "#55C57A";
    default:
      return "#E2E4EE";
  }
};

export default function Reflections() {
  const [mood, setMood] = useState(mockReflection.mood_rating);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.heading}>Today's Reflections</Text>
        <Text style={styles.subheading}>Day {mockReflection.day_id} of 75</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        indicatorStyle="black"
      >
        <View style={styles.card}>
          <Text style={styles.cardLabel}>How are you feeling today?</Text>
          <View style={styles.moodRow}>
            {[1, 2, 3, 4, 5].map((rating) => (
              <TouchableOpacity
                key={rating}
                style={[styles.moodDot, mood >= rating && { backgroundColor: getMoodColor(mood) }]}
                onPress={() => {
                  if (!mockReflection.mood_rating) setMood(rating);
                }}
                activeOpacity={mockReflection.mood_rating ? 1 : 0.8}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: BG,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: PURPLE,
    letterSpacing: -0.5,
  },
  subheading: {
    fontSize: 13,
    color: MUTED,
    fontWeight: "500",
    marginTop: 2,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    gap: 16,
  },
  card: {
    backgroundColor: CARD,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: MUTED,
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  moodRow: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  moodDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E2E4EE",
    marginHorizontal: 4,
  },
  moodDotSelected: {
    backgroundColor: BLUE,
  },
});
