import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

const DAY_NUMBER = 7;

const TASKS = [
  { key: "diet", label: "Diet", emoji: "🥗", subtitle: "Stick to your plan, no cheat meals" },
  {
    key: "outdoorWorkout",
    label: "Outdoor Workout",
    emoji: "🏃",
    subtitle: "45 min minimum outside",
  },
  { key: "indoorWorkout", label: "Indoor Workout", emoji: "🏋️", subtitle: "45 min minimum inside" },
  { key: "water", label: "Water", emoji: "💧", subtitle: "Drink 1 gallon (≈4 litres)" },
  { key: "reading", label: "Reading", emoji: "📖", subtitle: "10 pages of a non-fiction book" },
  {
    key: "reflection",
    label: "Reflection",
    emoji: "🪞",
    subtitle: "Complete today's reflection",
  },
  { key: "progressPhoto", label: "Progress Photo", emoji: "📸", subtitle: "Take your daily photo" },
];

export default function HomeScreen() {
  const [checked, setChecked] = useState(Object.fromEntries(TASKS.map((t) => [t.key, false])));
  const [photo, setPhoto] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (key) => {
    if (submitted) return;
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const pickImage = async () => {
    if (submitted) return;

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Permission to access the photo library is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    const payload = {
      day_number: DAY_NUMBER,
      diet_adhered: checked.diet,
      outdoor_workout_completed: checked.outdoorWorkout,
      indoor_workout_completed: checked.indoorWorkout,
      water_consumed: checked.water,
      reading_completed: checked.reading,
      reflection_completed: checked.reflection,
      progress_pic: photo,
    };

    console.log("Submitting day:", payload);
    setSubmitted(true);
  };

  const completedCount = Object.values(checked).filter(Boolean).length;
  const allDone = completedCount === TASKS.length;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.loginBtn} activeOpacity={0.8}>
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.dayBadge}>
          <Text style={styles.dayNumber}>Day {DAY_NUMBER}</Text>
          <Text style={styles.dayTotal}>of 75</Text>
        </View>
      </View>

      <View style={styles.progressWrapper}>
        <View style={styles.progressTrack}>
          <View
            style={[styles.progressFill, { width: `${(completedCount / TASKS.length) * 100}%` }]}
          />
        </View>
        <Text style={styles.progressLabel}>
          {completedCount}/{TASKS.length} complete
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {TASKS.map((task) => {
          const done = checked[task.key];
          return (
            <TouchableOpacity
              key={task.key}
              style={[styles.card, submitted && styles.cardLocked]}
              onPress={() => toggle(task.key)}
              activeOpacity={submitted ? 1 : 0.85}>
              <View style={styles.cardLeft}>
                <Text style={styles.cardEmoji}>{task.emoji}</Text>
                <View style={styles.cardText}>
                  <Text style={[styles.cardLabel, done && styles.cardLabelDone]}>{task.label}</Text>
                  <Text style={styles.cardSubtitle}>{task.subtitle}</Text>
                </View>
              </View>

              <View style={styles.cardRight}>
                {task.key === "progressPhoto" && (
                  <View style={styles.photoContainer}>
                    {photo && <Image source={{ uri: photo }} style={styles.photoPreview} />}
                    {!submitted && (
                      <TouchableOpacity
                        style={styles.uploadBtn}
                        onPress={(e) => {
                          e.stopPropagation();
                          pickImage();
                        }}
                        activeOpacity={0.8}>
                        <Text style={styles.uploadBtnText}>{photo ? "Change" : "Upload"}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}

                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    done && styles.checkboxDone,
                    submitted && styles.checkboxLocked,
                  ]}
                  onPress={(e) => {
                    e.stopPropagation();
                    toggle(task.key);
                  }}
                  activeOpacity={submitted ? 1 : 0.8}>
                  {done && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}

        {allDone && !submitted && (
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
            <Text style={styles.submitBtnText}>Complete Day →</Text>
          </TouchableOpacity>
        )}

        {submitted && (
          <View style={styles.submittedBanner}>
            <Text style={styles.submittedText}>✓ Day Submitted</Text>
          </View>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const NAVY = "#1A1A2E";
const ACCENT = "#4F6EF7";
const BG = "#F7F8FC";
const CARD = "#FFFFFF";
const MUTED = "#9A9AAF";
const TEXT = "#1A1A2E";
const SUCCESS = "#22C55E";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: BG,
  },
  loginBtn: {
    backgroundColor: NAVY,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
  },
  loginBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.4,
  },
  dayBadge: {
    alignItems: "flex-end",
  },
  dayNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: TEXT,
    letterSpacing: -0.5,
  },
  dayTotal: {
    fontSize: 12,
    color: MUTED,
    fontWeight: "500",
    marginTop: -2,
  },
  progressWrapper: {
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
    gap: 12,
  },
  card: {
    backgroundColor: CARD,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  cardLocked: {
    opacity: 0.5,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 14,
  },
  cardEmoji: {
    fontSize: 24,
  },
  cardText: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: TEXT,
    letterSpacing: -0.2,
  },
  cardLabelDone: {
    color: MUTED,
    textDecorationLine: "line-through",
  },
  cardSubtitle: {
    fontSize: 12,
    color: MUTED,
    marginTop: 2,
  },
  cardRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  photoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  photoPreview: {
    width: 36,
    height: 36,
    borderRadius: 6,
  },
  uploadBtn: {
    backgroundColor: "#EEF1FE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 7,
  },
  uploadBtnText: {
    color: ACCENT,
    fontSize: 12,
    fontWeight: "600",
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#D0D3E8",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  checkboxDone: {
    backgroundColor: ACCENT,
    borderColor: ACCENT,
  },
  checkboxLocked: {
    borderColor: MUTED,
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
  },
  submitBtn: {
    backgroundColor: ACCENT,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 4,
  },
  submitBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.3,
  },
  submittedBanner: {
    backgroundColor: "#DCFCE7",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 4,
  },
  submittedText: {
    color: SUCCESS,
    fontWeight: "600",
    fontSize: 14,
    letterSpacing: 0.2,
  },
});
