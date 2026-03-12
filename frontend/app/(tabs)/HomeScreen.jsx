import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import TaskCard from "../components/TaskCard";
import DayProgress from "../components/DayProgress";

const DAY_NUMBER = 7;
const TOTAL_DAYS = 75;

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
  { key: "reflection", label: "Reflection", emoji: "🪞", subtitle: "Complete today's reflection" },
  { key: "progressPhoto", label: "Progress Photo", emoji: "📸", subtitle: "Take your daily photo" },
];

const NAVY = "#1A1A2E";
const TEXT = "#1A1A2E";
const MUTED = "#9A9AAF";
const SUCCESS = "#22C55E";
const ACCENT = "#4F6EF7";

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
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Permission to access the photo library is required.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled) setPhoto(result.assets[0].uri);
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F8FC" }}>
      {/* Header row: Login + Day Badge */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 12,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: NAVY,
            paddingHorizontal: 18,
            paddingVertical: 8,
            borderRadius: 8,
          }}>
          <Text style={{ color: "#FFF", fontSize: 13, fontWeight: "600", letterSpacing: 0.4 }}>
            Login
          </Text>
        </TouchableOpacity>

        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ fontSize: 22, fontWeight: "700", color: TEXT, letterSpacing: -0.5 }}>
            Day {DAY_NUMBER}
          </Text>
          <Text style={{ fontSize: 12, color: MUTED, fontWeight: "500", marginTop: -2 }}>
            of {TOTAL_DAYS}
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <DayProgress completedCount={completedCount} totalTasks={TASKS.length} />

      {/* Task List */}
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 4, gap: 12 }}
        showsVerticalScrollIndicator={false}>
        {TASKS.map((task) => (
          <TaskCard
            key={task.key}
            task={task}
            done={checked[task.key]}
            submitted={submitted}
            photo={photo}
            toggle={toggle}
            pickImage={pickImage}
          />
        ))}

        {allDone && !submitted && (
          <TouchableOpacity
            style={{
              backgroundColor: ACCENT,
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: "center",
              marginTop: 4,
            }}
            onPress={handleSubmit}>
            <Text style={{ color: "#FFF", fontWeight: "700", fontSize: 15, letterSpacing: 0.3 }}>
              Complete Day →
            </Text>
          </TouchableOpacity>
        )}

        {submitted && (
          <View
            style={{
              backgroundColor: "#DCFCE7",
              borderRadius: 12,
              paddingVertical: 14,
              alignItems: "center",
              marginTop: 4,
            }}>
            <Text style={{ color: SUCCESS, fontWeight: "600", fontSize: 14, letterSpacing: 0.2 }}>
              ✓ Day Submitted
            </Text>
          </View>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
