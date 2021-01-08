import React, { useEffect, useState } from 'react'
import {ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View,Button,Image} from 'react-native'
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux'

import { onBoardingfilter } from '../redux/onBoarding/onBoarding.actions'
const AddProductScreen=(props)=>{

  const [hasError, setHasErrors] = useState(false);
  const [Category, setCategory] = useState([]);
  const [image, setImage] = useState(null);
  const [isLoading, seIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
    function fetchData() {
      fetch("https://backend-jg5.conveyor.cloud/api/Categories")
        .then((res) => res.json())
        .then((res) => {
          setCategory(res);
        })

        .catch((err) => {
          setHasErrors(err);
        })
      .finally(() => seIsLoading(false));

      
     
    }

    fetchData();
  }, []);

   
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [description, setDescription] = useState('');
  const [minDesc, setMinDesc] = useState('');
  const [prix, setPrix] = useState('');
  const [dispo, setDispo] = useState(true);
  const [selectedValue, setSelectedValue] = useState(0)
 


const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);

  if (!result.cancelled) {
    setImage(result.uri);
  }
};


const [Error, setError] = useState('')
const handlePress = async () => {
  try {
    
      
    props.setOnBoarding({
      onBoarding: !props.onBoarding
    })
  fetch("https://backend-jg5.conveyor.cloud/api/Products", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productName: name,
        price:prix ,
        description:description,
        miniDescription:minDesc,
        imageUrl:image,
        isDispo:dispo,
        categoryId:(selectedValue)



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
console.log(selectedValue);


if (isLoading) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
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
       
        <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="SELECT" value={0} />
        {Category.map(item=>{return(
        
             <Picker.Item key={item.categoryId} label={item.categoryName} value={item.categoryId} />
          )
        })}
        {/* <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" /> */}
      </Picker>
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
    )
}

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
)(AddProductScreen)