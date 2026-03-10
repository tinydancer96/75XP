import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

export default function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile Page</Text>

      <TouchableOpacity
        onPress={() => router.push("/register")}
        style={{
          marginTop: 20,
          padding: 12,
          backgroundColor: "black",
          borderRadius: 6,
        }}
      >
        <Text style={{ color: "white" }}>Go to Register</Text>
      </TouchableOpacity>
    </View>
  );
}
