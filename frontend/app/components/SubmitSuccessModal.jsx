import React, { useEffect } from "react";
import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";

const ACCENT = "#4F6EF7";
const SOURCE = require("../assets/add-a-character-in-a-hot-air-balloon-floating-upwa.mp4");

export default function SubmitSuccessModal({ visible, onClose }) {
  const player = useVideoPlayer(SOURCE);
  player.loop = true;
  player.muted = true;

  useEffect(() => {
    if (visible) {
      player.replay();
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <VideoView
            player={player}
            style={styles.video}
            contentFit="contain"
            nativeControls={false}
          />
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeBtnText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 16,
  },
  video: { width: "100%", aspectRatio: 1 },
  closeBtn: {
    backgroundColor: ACCENT,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 10,
  },
  closeBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
