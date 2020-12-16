import React, { useState } from "react";
import { View,Text, TextInput,TouchableOpacity } from "react-native";

const AddCategoryScreen = (props) => {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          ADD new Product
        </Text>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}> Name</Text>
        <TextInput
          placeholder="Name"
          placeholderColor="#c4c3cb"
          style={{
            width: "100%",
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 5,
            height: 50,
            padding: 10,
          }}
          value={name}
          onChangeText={(value) => setName(value)}
        />
         <Text style={{ fontSize: 16, fontWeight: "bold" }}> img</Text>
        <TextInput
          placeholder="img"
          placeholderColor="#c4c3cb"
          style={{
            width: "100%",
            marginVertical: 5,
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 5,
            height: 100,
            padding: 10,
          }}
          value={img}
          onChangeText={(value) => setImg(value)}
          multiline
        />
         <TouchableOpacity style={{ marginVertical: 10 }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#282828",
              shadowColor: "#9A9A9A",
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 6,
              padding: 2,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "white",
                marginHorizontal: 5,
              }}
            >
              Submit
            </Text>
          </View>
        </TouchableOpacity>
        </View>
    </View>
  );
};

export default AddCategoryScreen;
