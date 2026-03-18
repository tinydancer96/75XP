import React, { useEffect, useRef } from "react";
import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";

const ACCENT = "#4F6EF7";
const SOURCE = require("../assets/add-a-character-in-a-hot-air-balloon-floating-upwa.mp4");

export default function SubmitSuccessModal({ visible, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (visible && videoRef.current) {
      videoRef.current.replayAsync().catch(() => null);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Video
            ref={videoRef}
            source={SOURCE}
            style={styles.video}
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay={true}
            isLooping={false}
            isMuted={true}
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) onClose();
            }}
          />
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
    position: "relative",
    backgroundColor: "#000",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 16,
    paddingBottom: 40,
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  closeBtn: {
    backgroundColor: ACCENT,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 10,
  },
  closeBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
