import { ScrollView, Text, View } from "react-native";
import Achievements from "../components/Achievements";
import MoodChart from "../components/MoodChart";
export default function Profile() {
  return (
    <ScrollView>
      <View>
        <Achievements />
      </View>
      <View>
        <MoodChart />
      </View>
    </ScrollView>
  );
}
