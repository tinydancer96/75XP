import { View, Text, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function MoodChart() {
  const data = {
    labels: ["1", "10", "20", "30", "40", "50", "60", "75"],
    datasets: [{ data: [3, 4, 2, 5, 3, 4, 5, 4] }],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Chart</Text>
      <LineChart
        data={data}
        width={screenWidth - 40}
        height={220}
        fromZero
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
        }}
      />
      <View style={styles.legend}>
        <Text>1 = Terrible</Text>
        <Text>2 = Bad</Text>
        <Text>3 = Neutral</Text>
        <Text>4 = Good</Text>
        <Text>5 = Great</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
