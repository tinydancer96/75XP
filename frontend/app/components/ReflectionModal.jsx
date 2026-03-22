import Ionicons from "@expo/vector-icons/Ionicons";
import {
  View,
  Modal,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
  Animated,
  useWindowDimensions,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import Section from "./ReflectionSection";
import buildWeekSummary from "./ReflectionWeekSummary";

const summaryDay = [7, 14, 21, 28, 35, 42, 49, 56, 63, 70];

export default function ReflectionModal({ dayId, isLatest, data }) {
  const [visible, setVisible] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scrollRef = useRef(null);
  const { width } = useWindowDimensions();

  const sheetWidth = Math.min(width - 40, 380);

  const today = data.find((day) => day.day_number === dayId);
  const hasReflection = !!today;
  const isSummaryDay = summaryDay.includes(dayId);
  const nodeColor = isSummaryDay ? "#e16041" : "#fbe268";
  const accentColor = isSummaryDay ? "#e16041" : "#cc785c";

  const weekSummary = isSummaryDay ? buildWeekSummary({ dayId, data }) : null;

  useEffect(() => {
    if (!isLatest) return;
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.25,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [isLatest, pulseAnim]);

  const handleScroll = (e) => {
    const page = Math.round(e.nativeEvent.contentOffset.x / sheetWidth);
    setActivePage(page);
  };

  const goToPage = (page) => {
    scrollRef.current?.scrollTo({ x: page * sheetWidth, animated: true });
    setActivePage(page);
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      scrollRef.current?.scrollTo({ x: 0, animated: false });
      setActivePage(0);
    }, 300);
  };

  return (
    <View>
      <Pressable
        onPress={() => hasReflection && setVisible(true)}
        disabled={!hasReflection}
        style={({ pressed }) => [
          styles.nodeTrigger,
          pressed && hasReflection && styles.nodeTriggerPressed,
        ]}
      >
        {hasReflection ? (
          <View style={styles.pulseWrapper}>
            {isLatest && (
              <Animated.View
                style={[
                  styles.pulseRing,
                  {
                    backgroundColor: nodeColor,
                    transform: [{ scale: pulseAnim }],
                    opacity: pulseAnim.interpolate({
                      inputRange: [1, 1.25],
                      outputRange: [0.5, 0],
                    }),
                  },
                ]}
              />
            )}
            <Ionicons name="radio-button-on" size={30} color={nodeColor} />
          </View>
        ) : (
          <Ionicons name="radio-button-on" size={30} color="#9e9898" />
        )}
      </Pressable>

      <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={handleClose}>
        <View style={styles.overlay}>
          <View style={[styles.sheet, { width: sheetWidth }]}>
            <View style={[styles.accentBar, { backgroundColor: accentColor }]} />

            <View style={styles.header}>
              <View>
                <Text style={[styles.dayLabel, { color: accentColor }]}>
                  {isSummaryDay ? "Week Summary · " : ""}Day {dayId}
                </Text>
                <Text style={styles.headerTitle}>
                  {activePage === 0 ? "Journal Entry" : "Week in Review"}
                </Text>
              </View>
              <Pressable
                onPress={handleClose}
                style={({ pressed }) => [styles.closeBtn, pressed && styles.closeBtnPressed]}
              >
                <Ionicons name="close" size={14} color={accentColor} />
              </Pressable>
            </View>

            <View style={styles.divider} />

            <ScrollView
              ref={scrollRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={handleScroll}
              scrollEnabled={isSummaryDay}
              style={{ width: sheetWidth }}
            >
              <View style={{ width: sheetWidth }}>
                <ScrollView
                  style={styles.scrollArea}
                  contentContainerStyle={styles.scrollContent}
                  showsVerticalScrollIndicator={false}
                >
                  {today && (
                    <>
                      <Section
                        icon="trophy-outline"
                        label="Achievements"
                        body={today.achievements}
                        accentColor={accentColor}
                      />
                      <Section
                        icon="thunderstorm-outline"
                        label="Challenges"
                        body={today.challenges}
                        accentColor={accentColor}
                      />
                      <Section
                        icon="arrow-forward-circle-outline"
                        label="Tomorrow's Focus"
                        body={today.next_day_focus}
                        accentColor={accentColor}
                      />
                    </>
                  )}
                </ScrollView>
              </View>

              {isSummaryDay && weekSummary && (
                <View style={{ width: sheetWidth }}>
                  <ScrollView
                    style={styles.scrollArea}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                  >
                    <Section
                      icon="trophy-outline"
                      label="Week Highlights"
                      body={weekSummary.achievements}
                      accentColor={accentColor}
                    />
                    <Section
                      icon="thunderstorm-outline"
                      label="Week Challenges"
                      body={weekSummary.challenges}
                      accentColor={accentColor}
                    />
                  </ScrollView>
                </View>
              )}
            </ScrollView>

            {isSummaryDay && (
              <View style={styles.pagination}>
                {[0, 1].map((i) => (
                  <Pressable key={i} onPress={() => goToPage(i)}>
                    <View
                      style={[
                        styles.dot,
                        activePage === i
                          ? [styles.dotActive, { backgroundColor: accentColor }]
                          : styles.dotInactive,
                      ]}
                    />
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  nodeTrigger: { padding: 3 },
  nodeTriggerPressed: { opacity: 0.5 },
  pulseWrapper: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  pulseRing: { position: "absolute", width: 36, height: 36, borderRadius: 18 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sheet: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 16,
  },
  accentBar: { height: 4 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a1a",
    letterSpacing: 0.3,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f5f0ed",
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtnPressed: { backgroundColor: "#ede5df", opacity: 0.8 },
  divider: { height: 1, backgroundColor: "#ede8e3", marginHorizontal: 24 },
  scrollArea: { maxHeight: 340 },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 28,
    gap: 20,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    paddingVertical: 14,
  },
  dot: { borderRadius: 4 },
  dotActive: { width: 20, height: 6 },
  dotInactive: { width: 6, height: 6, backgroundColor: "#d1cdc9" },
});
