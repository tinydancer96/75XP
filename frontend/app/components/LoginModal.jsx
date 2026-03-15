import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator } from "react-native";
import { ACCENT, NAVY, MUTED, DANGER, fontSizes, fontWeights } from "../styles/global";

export default function LoginModal({ visible, onClose, onLoginSuccess }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState(null);
  const [loading, setLoading]   = useState(false);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }
      // data is the profile object, data.id is used as the Bearer token
      onLoginSuccess(data);
      onClose();
    } catch (err) {
      setError("Could not reach the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.sheet}>

          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>×</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Login</Text>

          {error && <Text style={styles.error}>{error}</Text>}

          <TextInput
            placeholder="Email"
            placeholderTextColor={MUTED}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={MUTED}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={[styles.input, styles.inputLast]}
          />

          <TouchableOpacity
            onPress={handleLogin}
            style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
            disabled={loading}>
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.submitBtnText}>Login</Text>
            }
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex:            1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent:  "center",
    alignItems:      "center",
  },
  sheet: {
    width:           "80%",
    backgroundColor: "#fff",
    borderRadius:    12,
    padding:         20,
    position:        "relative",
  },
  closeBtn: {
    position:        "absolute",
    top:             12,
    right:           12,
    width:           28,
    height:          28,
    borderRadius:    14,
    backgroundColor: "#eee",
    justifyContent:  "center",
    alignItems:      "center",
    zIndex:          10,
  },
  closeBtnText: {
    fontSize:   18,
    fontWeight: fontWeights.semibold,
    color:      NAVY,
  },
  title: {
    fontSize:     fontSizes.lg,
    fontWeight:   fontWeights.semibold,
    color:        NAVY,
    marginBottom: 12,
  },
  error: {
    fontSize:     fontSizes.sm,
    color:        DANGER,
    marginBottom: 10,
  },
  input: {
    borderWidth:   1,
    borderColor:   "#ccc",
    borderRadius:  8,
    padding:       8,
    marginBottom:  12,
    fontSize:      fontSizes.base,
    color:         NAVY,
  },
  inputLast: {
    marginBottom: 16,
  },
  submitBtn: {
    backgroundColor: ACCENT,
    paddingVertical: 12,
    borderRadius:    8,
    alignItems:      "center",
  },
  submitBtnDisabled: {
    opacity: 0.6,
  },
  submitBtnText: {
    color:      "#fff",
    fontWeight: fontWeights.semibold,
    fontSize:   fontSizes.base,
  },
});
