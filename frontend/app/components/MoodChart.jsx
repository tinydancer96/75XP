import { View, Text, Dimensions, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { LineChart } from "react-native-chart-kit";
import { useUserContext } from "../context/UserContext";

const screenWidth = Dimensions.get("window").width;

export default function MoodChart() {
  const { login, user, accessToken } = useUserContext();
  const [moodData, setMoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchMoodData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("https://xp75-be.onrender.com/api/days", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch mood data");
      }

      const data = await response.json();

      setMoodData(data);
    } catch (err) {
      setError("Unable to load mood data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (accessToken) {
      fetchMoodData();
    }
  }, [accessToken]);
  const chartData = {
    labels: ["1", "7", "14", "21", "28", "35", "42", "49", "56", "63", "70", "75"],
    datasets: [
      {
        data: moodData.map((day) => day.mood_rating),
      },
    ],
  };
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading mood data...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }
  if (!loading && moodData.length === 0) {
    return <Text>No mood data yet — start logging to see your trends</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Chart</Text>
      <LineChart
        data={chartData}
        width={screenWidth - 40}
        withDots={false}
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
