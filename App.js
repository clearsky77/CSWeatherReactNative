import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import { Fontisto } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
// const SCREEN_WIDTH = Dimensions.get("window").width; // 이렇게도 가능

const API_KEY = "b9738871da6bffe89599626232481eec";

const icons = {
  Clear: "day-sunny",
  Clouds: "cloudy",
  Rain: "rain",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Drizzle: "day-rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    // const permission = await Location.requestForegroundPermissionsAsync();
    // console.log(permission); // 권한 정보가 출력된다.
    const { granted } = await Location.requestForegroundPermissionsAsync(); // await 비동기 처리 코드 앞에 붙인다.
    // 중괄호 안에 granted를 적으면 이름이 grandted인 값을 가져올 수 있다.

    if (!granted) {
      setOk(false);
    }
    // const location = await Location.getCurrentPositionAsync({accuracy:5});
    // console.log(location);

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].region); // 위치 정보
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setDays(json.daily); // 여러 날의 날씨
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {/* {true? ( */}
        {days.length === 0 ? (
          <View style={{ ... styles.day, alignItems:"center"}}>
            <ActivityIndicator
              color="black"
              style={{ marginTop: 10 }}
              size="large"
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between", }}>
                <Text style={styles.temp}>
                  {parseFloat(day.temp.day).toFixed(1)}
                </Text>
                <Fontisto
                  name={icons[day.weather[0].main]}
                  size={100}
                  color="black"
                />
              </View>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "azure",
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
    // alignItems: "center", // 가로 방향 정렬
    alignItems: "flex-start",
    paddingHorizontal: 40,
    // backgroundColor: "teal",
  },
  temp: {
    marginTop: 30,
    fontSize: 120,
  },
  description: {
    marginTop: -30,
    fontSize: 40,
  },
  tinyText: {
    fontSize: 20,
  },
});
