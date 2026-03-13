import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
  Pressable,
} from "react-native";

import { useState } from "react";

import { Ionicons } from "@react-native-vector-icons/ionicons";

const mockReflection = {
  id: 1,
  day_id: 1,
  mood_rating: 3,
  achievements: "Completed my workout and drank all my water.",
  challenges: "Struggled to stay off my phone in the evening.",
  next_day_focus: "Get to bed before 11pm and prep meals.",
  created_at: "2025-03-10T21:00:00.000Z",
};

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
      component: (
        <Pressable onPress={nodePressed}>
          {press ? (
            <Ionicons name="radio-button-on-outline" size={30} color="red" />
          ) : (
            <Ionicons name="radio-button-off-outline" size={30} color="red" />
          )}
        </Pressable>
      ),
    },
  ];
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {gridItems.map(({ row, col, component }, index) => (
        <View key={index} style={toCell(row, col)}>
          {component}
        </View>
      ))}
    </View>
  );
}
