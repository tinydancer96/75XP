import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import TaskCard from "../components/TaskCard";
import DayProgress from "../components/DayProgress";
import LoginModal from "../components/LoginModal";
import { NAVY, ACCENT, SUCCESS, DANGER, MUTED, BG, fontSizes, fontWeights } from "../styles/global";

const TOTAL_DAYS = 75;

const TASKS = [
  { key: "diet",           label: "Diet",           emoji: "🥑", subtitle: "Stick to your plan, no cheat meals" },
  { key: "outdoorWorkout", label: "Outdoor Workout", emoji: "🏃", subtitle: "45 min minimum outside" },
  { key: "indoorWorkout",  label: "Indoor Workout",  emoji: "🏋️", subtitle: "45 min minimum inside" },
  { key: "water",          label: "Water",           emoji: "💧", subtitle: "Drink 1 gallon (≈4 litres)" },
  { key: "reading",        label: "Reading",         emoji: "📖", subtitle: "10 pages of a non-fiction book" },
  { key: "reflection",     label: "Reflection",      emoji: "📝", subtitle: "Complete today's reflection" },
  { key: "progressPhoto",  label: "Progress Photo",  emoji: "📷", subtitle: "Take your daily photo" },
];

export default function HomeScreen() {
  const [checked, setChecked]           = useState(Object.fromEntries(TASKS.map((t) => [t.key, false])));
  const [photo, setPhoto]               = useState(null);
  const [submitted, setSubmitted]       = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [profile, setProfile]           = useState(null);
  const [dayNumber, setDayNumber]       = useState(1);
  const [apiStatus, setApiStatus]       = useState("checking...");

  useEffect(() => {
    fetch("http://localhost:3000/api")
      .then((res) => res.json())
      .then(() => setApiStatus("API connected ✓"))
      .catch(() => setApiStatus("API unreachable ✗"));
  }, []);

  // Once logged in, start today's day on the backend
  useEffect(() => {
    if (!profile) return;

    const startDay = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/days", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${profile.id}`,
          },
          body: JSON.stringify({ day_number: dayNumber }),
        });
        const data = await res.json();

        if (res.status === 409) {
          console.log("Day already started");
          return;
        }

        if (!res.ok) {
          console.error("Failed to start day:", data.error);
          return;
        }

        // data.day_number is the real day number from the database
        setDayNumber(data.day_number);
        console.log("Day started:", data);
      } catch (err) {
        console.error("Could not start day:", err);
      }
    };

    startDay();
  }, [profile]);

  const handleLoginSuccess = (profileData) => {
    setProfile(profileData);
  };

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
    // reflection key is a UX gate only, not sent to the database
    const payload = {
      day_number:                dayNumber,
      diet_adhered:              checked.diet,
      outdoor_workout_completed: checked.outdoorWorkout,
      indoor_workout_completed:  checked.indoorWorkout,
      water_consumed:            checked.water,
      pages_read:                checked.reading,
      progress_pic:              photo,
    };
    console.log("Submitting day:", payload);
    setSubmitted(true);
  };

  const completedCount = Object.values(checked).filter(Boolean).length;
  const allDone        = completedCount === TASKS.length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
      <LoginModal
        visible={loginVisible}
        onClose={() => setLoginVisible(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setLoginVisible(true)} style={styles.loginBtn}>
          <Text style={styles.loginBtnText}>
            {profile ? profile.username : "Login"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* API status - remove once confirmed working */}
      <Text style={[styles.apiStatus, { color: apiStatus.includes("✓") ? SUCCESS : DANGER }]}>
        {apiStatus}
      </Text>

      {/* Day progress bar */}
      <DayProgress
        completedCount={completedCount}
        totalTasks={TASKS.length}
        dayNumber={dayNumber}
        totalDays={TOTAL_DAYS}
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
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
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>Complete Day ✓</Text>
          </TouchableOpacity>
        )}

        {submitted && (
          <View style={styles.submittedBanner}>
            <Text style={styles.submittedBannerText}>✔ Day Submitted</Text>
          </View>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection:     "row",
    justifyContent:    "space-between",
    alignItems:        "center",
    paddingHorizontal: 20,
    paddingTop:        16,
    paddingBottom:     12,
  },
  loginBtn: {
    backgroundColor:   NAVY,
    paddingVertical:   8,
    paddingHorizontal: 18,
    borderRadius:      8,
    justifyContent:    "center",
    alignItems:        "center",
  },
  loginBtnText: {
    color:         "#FFF",
    fontSize:      fontSizes.base,
    fontWeight:    fontWeights.semibold,
    letterSpacing: 0.4,
  },
  apiStatus: {
    textAlign:     "center",
    fontSize:      fontSizes.xs,
    paddingBottom: 6,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop:        4,
    gap:               12,
  },
  submitBtn: {
    backgroundColor: ACCENT,
    borderRadius:    12,
    paddingVertical: 16,
    alignItems:      "center",
    marginTop:       4,
  },
  submitBtnText: {
    color:         "#FFF",
    fontWeight:    fontWeights.bold,
    fontSize:      fontSizes.md,
    letterSpacing: 0.3,
  },
  submittedBanner: {
    backgroundColor: "#DCFCE7",
    borderRadius:    12,
    paddingVertical: 14,
    alignItems:      "center",
    marginTop:       4,
  },
  submittedBannerText: {
    color:         SUCCESS,
    fontWeight:    fontWeights.semibold,
    fontSize:      fontSizes.base,
    letterSpacing: 0.2,
  },
});
