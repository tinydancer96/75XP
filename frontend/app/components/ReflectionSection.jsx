import { View, StyleSheet, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Section({ icon, label, body, accentColor }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={[styles.iconPill, { backgroundColor: `${accentColor}18` }]}>
          <Ionicons name={icon} size={14} color={accentColor} />
        </View>
        <Text style={[styles.sectionLabel, { color: accentColor }]}>{label}</Text>
      </View>
      <Text style={styles.sectionBody}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: 8 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  iconPill: {
    width: 26,
    height: 26,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  sectionBody: {
    fontSize: 15,
    color: "#4a4a4a",
    lineHeight: 23,
    paddingLeft: 36,
  },
});
