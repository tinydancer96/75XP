import { View, Text, TextInput, StyleSheet } from "react-native";

const MUTED = "#9A9AAF";
const TEXT = "#1A1A2E";
const CARD = "#FFFFFF";
const PURPLE = "#403557";

const ReflectionField = ({ label, placeholder, value, onChangeText, maxLength, editable }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>

      {editable ? (
        <>
          <TextInput
            style={styles.textArea}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={MUTED}
            multiline
            maxLength={maxLength}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>
            {value.length}/{maxLength}
          </Text>
        </>
      ) : (
        <Text style={styles.value}>{value}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: CARD,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: PURPLE,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  textArea: {
    fontSize: 14,
    color: TEXT,
    minHeight: 100,
    textAlignVertical: "top",
    paddingTop: 4,
  },
  value: {
    fontSize: 14,
    color: TEXT,
    lineHeight: 22,
    paddingTop: 4,
  },
  charCount: {
    fontSize: 11,
    color: MUTED,
    textAlign: "right",
    marginTop: 4,
  },
});

export default ReflectionField;
