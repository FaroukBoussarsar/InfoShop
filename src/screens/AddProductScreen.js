import React, { useState } from 'react'
import {ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native'

const AddProductScreen=(props)=>{
   
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [description, setDescription] = useState('');
  const [minDesc, setMinDesc] = useState('');
  const [prix, setPrix] = useState('');
  const [dispo, setDispo] = useState(true);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{flexDirection:'row',justifyContent:'space-between',padding:20}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          
          }}
        >
          ADD new Product
        </Text>
        <TouchableOpacity onPress={() => setDispo(!dispo)}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: dispo == true ? "#282828" : "#F0F0F0",
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
                color: dispo == true ? "white" : "black",
                marginHorizontal: 5,
              }}
            >
              {dispo ? "dispo" : "non dispo"}
            </Text>
          </View>
        </TouchableOpacity>
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
        <Text style={{ fontSize: 16, fontWeight: "bold" }}> minDesc</Text>
        <TextInput
          placeholder="minDesc"
          placeholderColor="#c4c3cb"
          style={{
            width: "100%",
            marginVertical: 5,
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 5,
            height: 50,
            padding: 10,
          }}
          value={minDesc}
          onChangeText={(value) => setMinDesc(value)}
          multiline
        />
        <Text style={{ fontSize: 16, fontWeight: "bold" }}> prix</Text>
        <TextInput
          placeholder="prix"
          placeholderColor="#c4c3cb"
          style={{
            width: "100%",
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 5,
            height: 50,
            padding: 10,
          }}
          value={prix}
          onChangeText={(value) => setPrix(value)}
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
        <Text style={{ fontSize: 16, fontWeight: "bold" }}> description</Text>
        <TextInput
          placeholder="description"
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
          value={description}
          onChangeText={(value) => setDescription(value)}
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
    </ScrollView>
    )
}

export default AddProductScreen