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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SecondList({ navigation, route }) {
  // let [text,onChangeText]=useState("")
  let [data, setData] = useState(route.params.name);
  let [filter, setFilter] = useState(data);
  global.datass = [];

  console.log("dataComing", route.params.name);
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  selectedFilterText = (text) => {
    console.log("=====TEXT", text);
    if (text) {
      let newData = filter.filter((item) => {
        let itemData = item.title.toUpperCase();
        // itemData = item.description.toUpperCase()
        // itemData= item.price
        // ? item.category_name.toUpperCase()
        // : ''.toUpperCase();
        let textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      console.log("====adwadasdasdasdasd22222222", newData);

      setFilter(newData);
    } else {
      setFilter(data);
    }
  };
  return (
    <SafeAreaView style={{ alignItems: "center", backgroundColor: "#f7eed5" }}>
      <TextInput
        style={{
          borderWidth: 1,
          width: "90%",
          borderRadius: 5,
          margin: 5,
          padding: 10,
        }}
        onChangeText={(text) => selectedFilterText(text)}
        placeholder={"Search Item"}
        placeholderTextColor="black"

        // value={text}
      />
      <FlatList
        style={{ width: "100%", maxHeight: "95%" }}
        data={filter}
        // data={data}
        ListEmptyComponent={() => {
          return (
            <View>
              <View
                style={{
                  // flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  // backgroundColor:'red',
                  // width:'100%',
                  // height:'100%'
                }}>
                <Text> List is Empty </Text>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View
            style={{
              borderWidth: 1,
              borderRadius: 5,
              margin: filter.length == 1 ? 0 : 5,
              width: filter.length == 1 ? "100%" : "47%",
              alignItems: "center",
              padding: 5,
            }}>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 5,
                margin: 20,
              }}
              source={{
                uri: item.thumbnail,
              }}
            />
            <Text style={{ fontWeight: "bold", padding: 5 }}>{item.title}</Text>
            <Text style={{ fontWeight: "bold", padding: 2 }}>{item.brand}</Text>
            <Text numberOfLines={1} ellipsizeMode="tail">
              {item.description}
            </Text>
            <Text numberOfLines={1} ellipsizeMode="tail">
              Price: {item.price}/-
            </Text>

            <TouchableOpacity
              style={{
                backgroundColor: "#cce7e8",
                borderWidth: 1,
                borderRadius: 5,
                marginTop: 5,
              }}
              onPress={() => {
                // global.datass.push(item);

                if (global.datass.indexOf(item) === -1) {
                  //  storeData(item);
                  global.datass.push(item);
                  navigation.navigate("AddToCart", { items: item });
                } else {
                  alert("Item Already exists in your cart.");
                }
              }}>
              <View>
                <Text style={{ margin: 10, color: "black" }}>ADD TO CART</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  logo: {
    height: 128,
    width: 128,
  },
});
