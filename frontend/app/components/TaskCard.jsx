import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const ACCENT = "#4F6EF7";
const MUTED = "#9A9AAF";
const CARD = "#FFFFFF";

export default function TaskCard({ task, done, submitted, photo, toggle, pickImage }) {
  return (
    <TouchableOpacity
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
          style={[styles.checkbox, done && styles.checkboxDone, submitted && styles.checkboxLocked]}
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
}

const styles = StyleSheet.create({
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
  cardLocked: { opacity: 0.5 },
  cardLeft: { flexDirection: "row", alignItems: "center", flex: 1, gap: 14 },
  cardEmoji: { fontSize: 24 },
  cardText: { flex: 1 },
  cardLabel: { fontSize: 15, fontWeight: "600", color: "#1A1A2E", letterSpacing: -0.2 },
  cardLabelDone: { color: MUTED, textDecorationLine: "line-through" },
  cardSubtitle: { fontSize: 12, color: MUTED, marginTop: 2 },
  cardRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  photoContainer: { flexDirection: "row", alignItems: "center", gap: 8 },
  photoPreview: { width: 36, height: 36, borderRadius: 6 },
  uploadBtn: {
    backgroundColor: "#EEF1FE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 7,
  },
  uploadBtnText: { color: ACCENT, fontSize: 12, fontWeight: "600" },
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
  checkboxDone: { backgroundColor: ACCENT, borderColor: ACCENT },
  checkboxLocked: { borderColor: MUTED },
  checkmark: { color: "#FFFFFF", fontSize: 14, fontWeight: "700", lineHeight: 18 },
});
