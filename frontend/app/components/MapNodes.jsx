import { View, StyleSheet, Dimensions, ImageBackground, ScrollView, Pressable } from "react-native";

import { useState } from "react";

import { Ionicons } from "@react-native-vector-icons/ionicons";
import ReflectionModal from "./ReflectionModal";

export default function MapNodes({ imgWidth, imgHeight }) {
  const [press, setPress] = useState(false);
  const columns = 20;
  const rows = 35;

  const cellWidth = imgWidth / columns;
  const cellHeight = imgHeight / rows;

  const toCell = (row, col) => ({
    position: "absolute",
    left: (col - 1) * cellWidth,
    top: (row - 1) * cellHeight,
    width: cellWidth,
    height: cellHeight,
  });

  function nodePressed() {
    setPress(!press);
    if (press) {
    }
  }

  const gridItems = [
    {
      row: 30,
      col: 3,
      component: ({ dayId, userId }) => (
        <Pressable onPress={nodePressed}>
          {press ? (
            // <Ionicons name="radio-button-on-outline" size={22} color="red" />
            <ReflectionModal dayId={dayId} userId={userId} />
          ) : (
            <Ionicons name="radio-button-off-outline" size={22} color="red" />
          )}
        </Pressable>
      ),
    },
  ];
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {gridItems.map(({ row, col, component: Component }, index) => (
        <View key={index} style={toCell(row, col)}>
          <Component dayId={index + 1} userId={1} />
        </View>
      ))}
    </View>
  );
}
