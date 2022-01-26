import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return <View style={styles.container}>
    <View style={styles.city}>
      <Text style={styles.cityName}>Pusan</Text>
    </View>
    <View style={styles.weather}>
    </View>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DEB887",
  },
  city:{
    flex:1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName:{
    fontSize: 35,
    fontWeight: "400",
  },
  weather:{
    flex: 3,
    // backgroundColor: "teal", // 위치를 조정할 때는 색을 입혀서 전체 크기를 확인하자
  }
});