import { View, StyleSheet, Dimensions, ImageBackground, ScrollView, Pressable } from "react-native";

import MapNodes from "../components/MapNodes";

const { width } = Dimensions.get("window");

const imgWidth = width;
const imgHeight = width * 2;

const image = {
  uri: "https://i.pinimg.com/1200x/a5/2a/1c/a52a1c08cec6578928dd2d840c66a843.jpg",
};

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
