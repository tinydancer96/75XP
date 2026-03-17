import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
  Pressable,
} from "react-native";

import MapNodes from "../components/MapNodes";

const image = require("../assets/mountain-peak-with-path-for-a-mobile-game (1).jpeg");
const { width } = Dimensions.get("window");

const imgWidth = width;
const imgHeight = width * 7;

export default function GridOverlay() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <MapNodes imgHeight={imgHeight} imgWidth={imgWidth} />
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  image: {
    width: imgWidth,
    height: imgHeight,
  },
});
