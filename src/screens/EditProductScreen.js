import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from "react";
import {
  Image, ScrollView, Text,
  TextInput,

  TouchableOpacity, View,ActivityIndicator
} from "react-native";
import { connect } from 'react-redux'

import { onBoardingfilter } from '../redux/onBoarding/onBoarding.actions'


const EditProductScreen = (props) => {
 
  const { id,title,img,path,desc,type,desclong ,isDispo,price } = props.route.params;
const navigation =useNavigation()
  const [name, setName] = useState(title);
  const [imge, setImg] = useState(img);
  const [description, setDescription] = useState(desclong);
  const [minDesc, setMinDesc] = useState(desc);
  const [prix, setPrix] = useState(price);
  const [dispo, setDispo] = useState(
    isDispo 
  );

  const[loading,setLoading ]= useState(false)


  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
   
  }, [props.onBoarding]);


  const [image, setImage] = useState(img);

  const [Error, setError] = useState('')

  
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
          imageUrl:image,
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
            setLoading(false)
            props.setOnBoarding({
              onBoarding: !props.onBoarding
            })
        })
        .done();
      } catch (error) {
      setError(error)
      }
  }

  const handlePressDelete = async () => {
    navigation.navigate('HomeScreen')
    try {
    

    fetch(`https://backend-jg5.conveyor.cloud/api/Products/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: null
  
        })
   
  
        .then((response) => response.json())
        .then((responseData) => {
            console.log(
                "POST Response",
                "Response Body -> " + JSON.stringify(responseData)
                
            )
            props.setOnBoarding({
              onBoarding: !props.onBoarding
            })
           
        })
        .done();
      } catch (error) {
      setError(error)
      }
  }



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
    </ScrollView>
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
)(EditProductScreen)
