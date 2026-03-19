import React, { useEffect } from "react";
import { Modal, View, StyleSheet } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { useEventListener } from "expo";

const ACCENT = "#4F6EF7";
const DAYCOMPLETED = require("../assets/add-a-character-in-a-hot-air-balloon-floating-upwa.mp4");
const BRONZE = require("../assets/bronze-achievement-medal-flying-into-frame-like-a-.mp4");
const SILVER = require("../assets/silver-achievement-medal-shooting-into-frame-like-.mp4");
const GOLD = require("../assets/gold-achievement-medal-shooting-into-frame-like-a-.mp4");

export default function SubmitSuccessModal({ visible, onClose, dayNumber }) {
  const videoSource = (() => {
    switch (dayNumber) {
      case 25:
        return BRONZE;
      case 50:
        return SILVER;
      case 75:
        return GOLD;
      default:
        return DAYCOMPLETED;
    }
  })();
  const player = useVideoPlayer(videoSource);
  player.loop = true;
  player.muted = true;

  useEffect(() => {
    if (visible) {
      player.replay();
    }
  }, [visible, player]);

  useEventListener(player, "playToEnd", () => {
    onClose();
  });

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
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  video: { width: "100%", height: "100%" },
  closeBtn: {
    position: "absolute",
    bottom: 40,
    backgroundColor: ACCENT,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 10,
  },
  closeBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
