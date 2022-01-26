import React from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

const { width:SCREEN_WIDTH } = Dimensions.get("window");

console.log(SCREEN_WIDTH);

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Pusan</Text>
      </View>
      <ScrollView horizontal contentContainerStyle={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>13</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>13</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>13</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>13</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DEB887",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 40,
    fontWeight: "400",
  },
  weather: {
    // flex: 3, // 스크롤 뷰로 사용시 flex로 제한하면 에러 발생.
    // backgroundColor: "teal", // 위치를 조정할 때는 색을 입혀서 전체 크기를 확인하자
  },
  day: {
    width: SCREEN_WIDTH,
    // flex: 1,
    // justifyContent: "center", // 세로 방향 정렬
    alignItems: "center", // 가로 방향 정렬
    backgroundColor: "teal",
  },
  temp: {
    marginTop: 30,
    fontSize: 120,
  },
  description: {
    marginTop: -30,
    fontSize: 40,
  }
});