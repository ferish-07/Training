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
import { Feather, Ionicons } from "@expo/vector-icons";

export default function AddToCart({ navigation, route }) {
  let [data, setData] = useState(global.datass);
  let [texts, setTexts] = useState("");
  let [isSelected, setIsSelected] = useState(false);
  global.billingData = [];
  // console.log("aDATA AIYA AVE CH",data,"===",route.params.items)
  useEffect(() => {
    global.datass.forEach((object) => {
      object.isSelected = false;
    });
    setData(global.datass);
  }, []);
  function checkboxs(item, index) {
    // console.log("==a=df=s=df=sd=f=sdf=sd=f=sdf", item, index);
    let temp = [...data];

    temp[index].isSelected = !temp[index].isSelected;
    console.log(temp[index].isSelected);
    setData(temp);
    console.log(data);
  }

  function onSave() {
    let temp = data.filter((i) => i.isSelected == true);
    navigation.navigate("Billing", { quantity: texts, send: temp });
  }
  return (
    <SafeAreaView>
      <FlatList
        data={data}
        style={{
          width: "100%",
          padding: 5,
          width: "98%",
          marginTop: 5,
        }}
        keyExtractor={(item) => item.id}
        //  numColumns={2}
        renderItem={({ item, index }) => (
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItem: "center",
                borderWidth: 1,
                borderRadius: 5,
                margin: 0,
              }}>
              <TouchableOpacity onPress={() => checkboxs(item, index)}>
                {item.isSelected ? (
                  <Ionicons name="ios-checkbox" size={24} color="black" />
                ) : (
                  <Ionicons
                    name="ios-checkbox-outline"
                    size={24}
                    color="black"
                  />
                )}
                {/* <Ionicons name="ios-checkbox-outline" size={24} color="black" /> */}
              </TouchableOpacity>
              <View>
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
              </View>

              <View style={{ margin: 20, width: "55%" }}>
                <Text style={{ fontWeight: "bold", margin: 2 }}>
                  {item.title} -- {item.brand}
                </Text>
                <Text>{item.description}</Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{ marginTop: 5 }}>
                  Price: {item.price}/-
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 2,
                    width: "50%",
                    padding: 5,
                    marginTop: 5,
                  }}
                  onChangeText={(text) => setTexts(text)}
                  keyboardType="numeric"
                  placeholder={"no."}
                  placeholderTextColor="black"
                />
              </View>
            </View>
          </View>
        )}
      />
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            borderWidth: 1,
            borderRadius: 5,
            margin: 5,
            marginBottom: 5,
          }}
          onPress={() => {
            // if (global.billingData.indexOf(item) === -1) {
            //   //  storeData(item);
            //   global.billingData.push(item);
            //   navigation.navigate("Billing", { quantity: texts });
            // } else {
            //   alert("Item Already exists in your cart.");
            // }
            onSave();
          }}>
          <View>
            <Text style={{ margin: 10, color: "white" }}>SAVE</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
