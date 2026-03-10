import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="HomeScreen" options={{ title: "Home" }} />
      <Tabs.Screen name="Profile" options={{ title: "Profile" }} />
      <Tabs.Screen name="Reflections" options={{ title: "Reflections" }} />
      <Tabs.Screen name="Map" options={{ title: "Map" }} />
    </Tabs>
  );
}
