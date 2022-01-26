import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
// const SCREEN_WIDTH = Dimensions.get("window").width; // 이렇게도 가능

export default function App() {

  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);

  const ask = async () => {
    // const permission = await Location.requestForegroundPermissionsAsync();
    // console.log(permission); // 권한 정보가 출력된다.
    const {granted} = await Location.requestForegroundPermissionsAsync(); // await 비동기 처리 코드 앞에 붙인다.
    // 중괄호 안에 granted를 적으면 이름이 grandted인 값을 가져올 수 있다.

    if(!granted){
      setOk(false);
    }
    // const location = await Location.getCurrentPositionAsync({accuracy:5});
    // console.log(location);

    const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude,longitude},{useGoogleMaps:false})
    console.log(location);
  };

  useEffect(() => {
    ask();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Pusan</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}>
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
    // backgroundColor: "teal",
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