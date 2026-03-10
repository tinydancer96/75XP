import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

export default function ReflectionScreen() {}

const PRIMARY = "#403557";
const BG = "#F7F8FC";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: PRIMARY,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
});
