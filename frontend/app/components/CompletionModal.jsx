import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

const accentColor = "#cc785c";

export default function CompletionModal({ visible, onClose }) {
  const { width } = useWindowDimensions();
  const sheetWidth = Math.min(width - 40, 380);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.sheet, { width: sheetWidth }]}>
          <View style={[styles.accentBar, { backgroundColor: accentColor }]} />

          <View style={styles.header}>
            <View>
              <Text style={[styles.dayLabel, { color: accentColor }]}>
                Journey Complete
              </Text>
              <Text style={styles.headerTitle}>The Mountain Was You</Text>
            </View>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.closeBtn,
                pressed && styles.closeBtnPressed,
              ]}
            >
              <Ionicons name="close" size={14} color={accentColor} />
            </Pressable>
          </View>

          <View style={styles.divider} />

          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.body}>
              There were moments you were certain this was too much. The path
              felt steep, the summit invisible through the clouds. You stumbled.
              You slid back. Some days, the gap between where you were and where
              you wanted to be felt less like a climb and more like a wall. But
              you kept moving. You continued climbing that mountain, uncertain
              if you would ever reach the peak. You stumbled — and climbed
              anyway. You learned things about yourself on the way up that flat
              ground never could have taught you. There were days you almost
              quit. Maybe you did quit, for an hour, a day, a week. But you came
              back. That's not a small thing. That's everything. And now,
              standing here, looking at how far you've climbed — the view isn't
              just the reward. You are the reward. Every attempt, every setback,
              every stubborn return to try again, all to climb this mountain.
              The mountain was always you.
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sheet: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 16,
  },
  accentBar: { height: 4 },
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
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a1a",
    letterSpacing: 0.3,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f5f0ed",
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtnPressed: { backgroundColor: "#ede5df", opacity: 0.8 },
  divider: { height: 1, backgroundColor: "#ede8e3", marginHorizontal: 24 },
  scrollArea: { maxHeight: 340 },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 28,
  },
  body: {
    fontSize: 15,
    color: "#4a4a4a",
    lineHeight: 23,
  },
});
