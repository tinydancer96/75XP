// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// type NavTab = "Home" | "Map" | "Reflect" | "Profile";

// interface NavBarProps {
//   activeTab?: NavTab;
//   onTabPress?: (tab: NavTab) => void;
// }

// const TABS: NavTab[] = ["Home", "Map", "Reflect", "Profile"];

// export default function NavBar({ activeTab = "Home", onTabPress }: NavBarProps) {
//   return (
//     <View style={styles.container}>
//       {TABS.map((tab) => {
//         const isActive = tab === activeTab;
//         return (
//           <TouchableOpacity
//             key={tab}
//             style={[styles.tab, isActive && styles.tabActive]}
//             onPress={() => onTabPress?.(tab)}
//             activeOpacity={0.75}
//           >
//             <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab}</Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     backgroundColor: "#FFFFFF",
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//     paddingBottom: 28,
//     gap: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: -3 },
//     shadowOpacity: 0.07,
//     shadowRadius: 12,
//     elevation: 12,
//   },
//   tab: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 10,
//     borderRadius: 10,
//     backgroundColor: "#F4F4F6",
//   },
//   tabActive: {
//     backgroundColor: "#1A1A2E",
//   },
//   tabText: {
//     fontSize: 13,
//     fontWeight: "600",
//     color: "#8A8A9A",
//     letterSpacing: 0.3,
//   },
//   tabTextActive: {
//     color: "#FFFFFF",
//   },
// });
