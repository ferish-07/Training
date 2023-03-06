import * as React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// You can import from local files
import AssetExample from "./components/AssetExample";
import SecondList from "./components/SecondList";
import AddToCart from "./components/AddToCart";
import Billing from "./components/Billing";

const Stack = createNativeStackNavigator();
const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator navigationOption>
        <Stack.Screen name="Home" component={AssetExample} />
        <Stack.Screen name="SecondList" component={SecondList} />
        <Stack.Screen name="AddToCart" component={AddToCart} />
        <Stack.Screen name="Billing" component={Billing} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default function App() {
  return <MyStack />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: "white",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
