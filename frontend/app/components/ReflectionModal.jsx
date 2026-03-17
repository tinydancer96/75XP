import { Ionicons } from "@react-native-vector-icons/ionicons";
import { View, Modal, StyleSheet, Pressable, Text } from "react-native";
import { useState } from "react";
import { mockReflections } from "../mockData/reflectionsData";

export default function ReflectionModal({ dayId, userId }) {
  const [visible, setVisible] = useState(false);

  const user = mockReflections.find((entry) => entry.day_id === dayId && entry.user_id === userId);

  return (
    <View>
      <Pressable onPress={() => setVisible(true)}>
        <Ionicons name="radio-button-on-outline" size={22} color="red" />

        <Modal
          visible={visible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setVisible(false)}
        >
          <View style={styles.overlay}>
            <View style={styles.container}>
              <Pressable style={styles.closeButton} onPress={() => setVisible(false)}>
                <Text style={styles.closeText}>✕</Text>
              </Pressable>

              {user ? (
                <>
                  <Text>{user.achievements}</Text>
                  <Text>{user.challenges}</Text>
                  <Text>{user.next_day_focus}</Text>
                </>
              ) : (
                <Text>No reflection found.</Text>
              )}
            </View>
          </View>
        </Modal>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    minHeight: 200,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  closeText: {
    fontSize: 18,
    color: "#666",
  },
});
