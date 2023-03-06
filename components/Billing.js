import * as React from "react";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";

export default function Billing({ navigation, route }) {
  console;
  let [quantity, setQuantity] = useState(route.params.quantity);
  let [data, setData] = useState(route.params.send);

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        style={{ maxHeight: "94%" }}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
