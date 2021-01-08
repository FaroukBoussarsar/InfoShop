import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { PRODUCTS } from "../data/dummy_data";

const EditProductScreen = (props) => {
 
  const { id,title,img,path,desc,type,desclong ,isDispo,price } = props.route.params;

  const [name, setName] = useState(title);
  const [imge, setImg] = useState(img);
  const [description, setDescription] = useState(desclong);
  const [minDesc, setMinDesc] = useState(desc);
  const [prix, setPrix] = useState(price);
  const [dispo, setDispo] = useState(
    isDispo 
  );



  const [Error, setError] = useState('')
  const handlePress = async () => {
    try {
      
   
    fetch(`https://backend-jg5.conveyor.cloud/api/Products/${id}`, {
      method: "PUT",
      headers:{
          "Accept":"application/json",
          "Content-Type":"application/json",
    
      },
        body: JSON.stringify({
          productId:id,
          productName: name,
          price:prix ,
          description:description,
          miniDescription:minDesc,
          imageUrl:img,
          isDispo:dispo,
          categoryId:type
  
  
  
        })
    })
  
        .then((response) => response.json())
        .then((responseData) => {
            console.log(
                "POST Response",
                "Response Body -> " + JSON.stringify(responseData)
            )
        })
        .done();
      } catch (error) {
      setError(error)
      }
  }
  console.log(Error);
console.log(props);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{flexDirection:'row',justifyContent:'space-between',padding:20}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          
          }}
        >
          Edit {name}
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
          value={prix.toString()}
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
          value={imge}
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

        <TouchableOpacity 
        onPress={handlePress}
        style={{ marginVertical: 10 }}>
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
  );
};
export default EditProductScreen;
