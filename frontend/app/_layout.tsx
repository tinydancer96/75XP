import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="HomeTasksScreen" options={{ title: "Homepage" }} />
      <Tabs.Screen name="NavBar" options={{ title: "NavBar" }} />
    </Tabs>
  );
}
