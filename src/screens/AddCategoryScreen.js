import React, { useState } from "react";
import { View,Text, TextInput,TouchableOpacity,Image,ActivityIndicator } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux'

import { onBoardingfilter } from '../redux/onBoarding/onBoarding.actions'
const AddCategoryScreen = (props) => {

  const [name, setName] = useState("");
  const [img, setImg] = useState("");
const [Error, setError] = useState('')
const [image, setImage] = useState(null);

const [loading, setLoading] = useState(false)


const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });



  if (!result.cancelled) {
    setImage(result.uri);
  }
};




  const handlePress = async () => {
    try {
      setLoading(true)
     
    fetch("https://backend-jg5.conveyor.cloud/api/Categories", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          categoryName: name,
          image: image,
        })
    })

        .then((response) => response.json())
        .then((responseData) => {
            console.log(
                "POST Response",
                "Response Body -> " + JSON.stringify(responseData)
            )
            setLoading(false)
            props.setOnBoarding({
              onBoarding: !props.onBoarding
            })
        })
        .done(  );
      } catch (error) {
      setError(error)
      }
}
  



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
          <TouchableOpacity
        onPress={pickImage}
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
              Image
            </Text>
          </View>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      
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
       {!!loading&& <View
        style={{
   
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>}
        <Text style={{color:'red'}}>{Error}</Text>
        </View>
    </View>
  );
};
const mapStateToProps = state => {
  return {
    onBoarding: state.onBoarding.onBoarding
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setOnBoarding: onBoarding => dispatch(onBoardingfilter(onBoarding))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCategoryScreen)
