import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
  Pressable,
} from "react-native";

import MapNodes from "../components/MapNodes";

const { width } = Dimensions.get("window");

const imgWidth = width;
const imgHeight = width * 2;

// const gridItems = [
//   {
//     row: 30,
//     col: 3,
//     component: <Pressable style={{}} />,
//   },
//   {
//     row: 22,
//     col: 5,
//     component: <View style={{ flex: 1, backgroundColor: "blue" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 25,
//     col: 4,
//     component: <View style={{ flex: 1, backgroundColor: "red" }} />,
//   },
//   {
//     row: 22,
//     col: 5,
//     component: <View style={{ flex: 1, backgroundColor: "blue" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 25,
//     col: 4,
//     component: <View style={{ flex: 1, backgroundColor: "red" }} />,
//   },
//   {
//     row: 22,
//     col: 5,
//     component: <View style={{ flex: 1, backgroundColor: "blue" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 25,
//     col: 4,
//     component: <View style={{ flex: 1, backgroundColor: "red" }} />,
//   },
//   {
//     row: 22,
//     col: 5,
//     component: <View style={{ flex: 1, backgroundColor: "blue" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 25,
//     col: 4,
//     component: <View style={{ flex: 1, backgroundColor: "red" }} />,
//   },
//   {
//     row: 22,
//     col: 5,
//     component: <View style={{ flex: 1, backgroundColor: "blue" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 25,
//     col: 4,
//     component: <View style={{ flex: 1, backgroundColor: "red" }} />,
//   },
//   {
//     row: 22,
//     col: 5,
//     component: <View style={{ flex: 1, backgroundColor: "blue" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 25,
//     col: 4,
//     component: <View style={{ flex: 1, backgroundColor: "red" }} />,
//   },
//   {
//     row: 22,
//     col: 5,
//     component: <View style={{ flex: 1, backgroundColor: "blue" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 25,
//     col: 4,
//     component: <View style={{ flex: 1, backgroundColor: "red" }} />,
//   },
//   {
//     row: 22,
//     col: 5,
//     component: <View style={{ flex: 1, backgroundColor: "blue" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 25,
//     col: 4,
//     component: <View style={{ flex: 1, backgroundColor: "red" }} />,
//   },
//   {
//     row: 22,
//     col: 5,
//     component: <View style={{ flex: 1, backgroundColor: "blue" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 25,
//     col: 4,
//     component: <View style={{ flex: 1, backgroundColor: "red" }} />,
//   },
//   {
//     row: 22,
//     col: 5,
//     component: <View style={{ flex: 1, backgroundColor: "blue" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 25,
//     col: 4,
//     component: <View style={{ flex: 1, backgroundColor: "red" }} />,
//   },
//   {
//     row: 22,
//     col: 5,
//     component: <View style={{ flex: 1, backgroundColor: "blue" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 25,
//     col: 4,
//     component: <View style={{ flex: 1, backgroundColor: "red" }} />,
//   },
//   {
//     row: 22,
//     col: 5,
//     component: <View style={{ flex: 1, backgroundColor: "blue" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 25,
//     col: 4,
//     component: <View style={{ flex: 1, backgroundColor: "red" }} />,
//   },
//   {
//     row: 22,
//     col: 5,
//     component: <View style={{ flex: 1, backgroundColor: "blue" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 25,
//     col: 4,
//     component: <View style={{ flex: 1, backgroundColor: "red" }} />,
//   },
//   {
//     row: 22,
//     col: 5,
//     component: <View style={{ flex: 1, backgroundColor: "blue" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 25,
//     col: 4,
//     component: <View style={{ flex: 1, backgroundColor: "red" }} />,
//   },
//   {
//     row: 22,
//     col: 5,
//     component: <View style={{ flex: 1, backgroundColor: "blue" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 25,
//     col: 4,
//     component: <View style={{ flex: 1, backgroundColor: "red" }} />,
//   },
//   {
//     row: 22,
//     col: 5,
//     component: <View style={{ flex: 1, backgroundColor: "blue" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 25,
//     col: 4,
//     component: <View style={{ flex: 1, backgroundColor: "red" }} />,
//   },
//   {
//     row: 22,
//     col: 5,
//     component: <View style={{ flex: 1, backgroundColor: "blue" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 25,
//     col: 4,
//     component: <View style={{ flex: 1, backgroundColor: "red" }} />,
//   },
//   {
//     row: 22,
//     col: 5,
//     component: <View style={{ flex: 1, backgroundColor: "blue" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 25,
//     col: 4,
//     component: <View style={{ flex: 1, backgroundColor: "red" }} />,
//   },
//   {
//     row: 22,
//     col: 5,
//     component: <View style={{ flex: 1, backgroundColor: "blue" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 25,
//     col: 4,
//     component: <View style={{ flex: 1, backgroundColor: "red" }} />,
//   },
//   {
//     row: 22,
//     col: 5,
//     component: <View style={{ flex: 1, backgroundColor: "blue" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 25,
//     col: 4,
//     component: <View style={{ flex: 1, backgroundColor: "red" }} />,
//   },
//   {
//     row: 22,
//     col: 5,
//     component: <View style={{ flex: 1, backgroundColor: "blue" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
//   {
//     row: 25,
//     col: 4,
//     component: <View style={{ flex: 1, backgroundColor: "red" }} />,
//   },
//   {
//     row: 22,
//     col: 5,
//     component: <View style={{ flex: 1, backgroundColor: "blue" }} />,
//   },
//   {
//     row: 22,
//     col: 7,
//     component: <View style={{ flex: 1, backgroundColor: "green" }} />,
//   },
// ];

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
