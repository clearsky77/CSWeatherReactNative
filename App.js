import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View>
      <View style={{width:100, height:100, backgroundColor: "orange"}}></View>
      <View style={{width:100, height:100, backgroundColor: "green"}}></View>
      <View style={{width:100, height:100, backgroundColor: "red"}}></View>
    </View>
  );
}