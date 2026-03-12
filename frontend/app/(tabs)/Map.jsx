import { View, StyleSheet, Dimensions, ImageBackground, ScrollView } from "react-native";

const { width } = Dimensions.get("window");

const columns = 20;
const rows = 35;

const imgWidth = width;
const imgHeight = width * 2;

const cellWidth = imgWidth / columns;
const cellHeight = imgHeight / rows;

const toCell = (row, col) => ({
  position: "absolute",
  left: (col - 1) * cellWidth,
  top: (row - 1) * cellHeight,
  width: cellWidth,
  height: cellHeight,
});

const gridItems = [
  { row: 30, col: 3, component: <View style={{ flex: 1, backgroundColor: "red" }} /> },
  { row: 22, col: 5, component: <View style={{ flex: 1, backgroundColor: "blue" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 25, col: 4, component: <View style={{ flex: 1, backgroundColor: "red" }} /> },
  { row: 22, col: 5, component: <View style={{ flex: 1, backgroundColor: "blue" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 25, col: 4, component: <View style={{ flex: 1, backgroundColor: "red" }} /> },
  { row: 22, col: 5, component: <View style={{ flex: 1, backgroundColor: "blue" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 25, col: 4, component: <View style={{ flex: 1, backgroundColor: "red" }} /> },
  { row: 22, col: 5, component: <View style={{ flex: 1, backgroundColor: "blue" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 25, col: 4, component: <View style={{ flex: 1, backgroundColor: "red" }} /> },
  { row: 22, col: 5, component: <View style={{ flex: 1, backgroundColor: "blue" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 25, col: 4, component: <View style={{ flex: 1, backgroundColor: "red" }} /> },
  { row: 22, col: 5, component: <View style={{ flex: 1, backgroundColor: "blue" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 25, col: 4, component: <View style={{ flex: 1, backgroundColor: "red" }} /> },
  { row: 22, col: 5, component: <View style={{ flex: 1, backgroundColor: "blue" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 25, col: 4, component: <View style={{ flex: 1, backgroundColor: "red" }} /> },
  { row: 22, col: 5, component: <View style={{ flex: 1, backgroundColor: "blue" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 25, col: 4, component: <View style={{ flex: 1, backgroundColor: "red" }} /> },
  { row: 22, col: 5, component: <View style={{ flex: 1, backgroundColor: "blue" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 25, col: 4, component: <View style={{ flex: 1, backgroundColor: "red" }} /> },
  { row: 22, col: 5, component: <View style={{ flex: 1, backgroundColor: "blue" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 25, col: 4, component: <View style={{ flex: 1, backgroundColor: "red" }} /> },
  { row: 22, col: 5, component: <View style={{ flex: 1, backgroundColor: "blue" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 25, col: 4, component: <View style={{ flex: 1, backgroundColor: "red" }} /> },
  { row: 22, col: 5, component: <View style={{ flex: 1, backgroundColor: "blue" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 25, col: 4, component: <View style={{ flex: 1, backgroundColor: "red" }} /> },
  { row: 22, col: 5, component: <View style={{ flex: 1, backgroundColor: "blue" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 25, col: 4, component: <View style={{ flex: 1, backgroundColor: "red" }} /> },
  { row: 22, col: 5, component: <View style={{ flex: 1, backgroundColor: "blue" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 25, col: 4, component: <View style={{ flex: 1, backgroundColor: "red" }} /> },
  { row: 22, col: 5, component: <View style={{ flex: 1, backgroundColor: "blue" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 25, col: 4, component: <View style={{ flex: 1, backgroundColor: "red" }} /> },
  { row: 22, col: 5, component: <View style={{ flex: 1, backgroundColor: "blue" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 25, col: 4, component: <View style={{ flex: 1, backgroundColor: "red" }} /> },
  { row: 22, col: 5, component: <View style={{ flex: 1, backgroundColor: "blue" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 25, col: 4, component: <View style={{ flex: 1, backgroundColor: "red" }} /> },
  { row: 22, col: 5, component: <View style={{ flex: 1, backgroundColor: "blue" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 25, col: 4, component: <View style={{ flex: 1, backgroundColor: "red" }} /> },
  { row: 22, col: 5, component: <View style={{ flex: 1, backgroundColor: "blue" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 25, col: 4, component: <View style={{ flex: 1, backgroundColor: "red" }} /> },
  { row: 22, col: 5, component: <View style={{ flex: 1, backgroundColor: "blue" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 25, col: 4, component: <View style={{ flex: 1, backgroundColor: "red" }} /> },
  { row: 22, col: 5, component: <View style={{ flex: 1, backgroundColor: "blue" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
  { row: 25, col: 4, component: <View style={{ flex: 1, backgroundColor: "red" }} /> },
  { row: 22, col: 5, component: <View style={{ flex: 1, backgroundColor: "blue" }} /> },
  { row: 22, col: 7, component: <View style={{ flex: 1, backgroundColor: "green" }} /> },
];

const image = {
  uri: "https://i.pinimg.com/1200x/a5/2a/1c/a52a1c08cec6578928dd2d840c66a843.jpg",
};

export default function GridOverlay() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          {gridItems.map(({ row, col, component }, index) => (
            <View key={index} style={toCell(row, col)}>
              {component}
            </View>
          ))}
        </View>
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
