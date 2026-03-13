import { Text, View } from "react-native";
import Achievements from "../components/Achievements";
import MoodChart from "../components/MoodChart";
export default function Profile() {
  return (
    <View>
      <View>
        <Achievements />
      </View>
      <View>
        <MoodChart />
      </View>
    </View>
  );
}
