import { Text, ImageBackground, StyleSheet, ScrollView, Dimensions, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function Map() {
  const image = {
    uri: "https://i.pinimg.com/1200x/a5/2a/1c/a52a1c08cec6578928dd2d840c66a843.jpg",
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <FlatList numColumns={15}></FlatList>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width,
    aspectRatio: 1200 / 2000,
  },
});
