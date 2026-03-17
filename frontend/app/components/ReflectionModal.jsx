import { Ionicons } from "@react-native-vector-icons/ionicons";
import {
  View,
  Modal,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { mockReflections } from "../mockData/reflectionsData";

export default function ReflectionModal({ dayId, userId }) {
  const [visible, setVisible] = useState(false);

  const user = mockReflections.find(
    (entry) => entry.day_id === dayId && entry.user_id === userId,
  );

  const hasReflection = !!user;

  return (
    <View>
      <Pressable
        onPress={() => hasReflection && setVisible(true)}
        disabled={!hasReflection}
        style={({ pressed }) => [
          styles.nodeTrigger,
          pressed && hasReflection && styles.nodeTriggerPressed,
        ]}
      >
        <Ionicons
          name="radio-button-on-outline"
          size={30}
          color={hasReflection ? "#fbe268" : "#4a4560"}
        />
      </Pressable>

      <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <View style={styles.accentBar} />

            <View style={styles.header}>
              <View>
                <Text style={styles.dayLabel}>Day {dayId}</Text>
                <Text style={styles.headerTitle}>Journal Entry</Text>
              </View>
              <Pressable
                onPress={() => setVisible(false)}
                style={({ pressed }) => [
                  styles.closeBtn,
                  pressed && styles.closeBtnPressed,
                ]}
              >
                <Ionicons name="close" size={14} color="#fbe268" />
              </Pressable>
            </View>

            <View style={styles.divider} />

            <ScrollView
              style={styles.scrollArea}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {user && (
                <>
                  <Section
                    icon="trophy-outline"
                    label="Achievements"
                    body={user.achievements}
                  />
                  <Section
                    icon="thunderstorm-outline"
                    label="Challenges"
                    body={user.challenges}
                  />
                  <Section
                    icon="arrow-forward-circle-outline"
                    label="Tomorrow's Focus"
                    body={user.next_day_focus}
                  />
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function Section({ icon, label, body }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.iconPill}>
          <Ionicons name={icon} size={14} color="#70add9" />
        </View>
        <Text style={styles.sectionLabel}>{label}</Text>
      </View>
      <Text style={styles.sectionBody}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  nodeTrigger: {
    padding: 3,
  },
  nodeTriggerPressed: {
    opacity: 0.5,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(10, 8, 18, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sheet: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#2a2240",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 24,
  },
  accentBar: {
    height: 4,
    backgroundColor: "#70add9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 3,
    textTransform: "uppercase",
    color: "#70add9",
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#f0eaf8",
    letterSpacing: 0.3,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#403557",
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtnPressed: {
    backgroundColor: "#523d6e",
    opacity: 0.8,
  },
  divider: {
    height: 1,
    backgroundColor: "#403557",
    marginHorizontal: 24,
  },
  scrollArea: {
    maxHeight: 340,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 28,
    gap: 20,
  },
  section: {
    gap: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconPill: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: "#403557",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#70add9",
  },
  sectionBody: {
    fontSize: 15,
    color: "#c8bfe0",
    lineHeight: 23,
    paddingLeft: 36,
  },
});
