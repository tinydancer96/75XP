import React from "react";
import { Modal, View, Text, TouchableOpacity, TextInput } from "react-native";

export default function LoginModal({ visible, onClose }) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.4)",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <View
          style={{
            width: "80%",
            backgroundColor: "#fff",
            borderRadius: 12,
            padding: 20,
            position: "relative",
          }}>
          <TouchableOpacity
            onPress={onClose}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: "#eee",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
            }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>×</Text>
          </TouchableOpacity>

          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>Login</Text>
          <TextInput
            placeholder="Username"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 8,
              marginBottom: 12,
            }}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 8,
              marginBottom: 16,
            }}
          />
          <TouchableOpacity
            onPress={onClose}
            style={{
              backgroundColor: "#4F6EF7",
              paddingVertical: 12,
              borderRadius: 8,
              alignItems: "center",
            }}>
            <Text style={{ color: "#fff", fontWeight: "600" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
