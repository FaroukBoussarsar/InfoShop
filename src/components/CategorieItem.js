
import React, { useState } from "react";
import { TouchableOpacity, View,Text,Image ,Alert} from "react-native";
import { connect } from "react-redux";
import { filterCategory } from "../redux/filter/filter.actions";

import { onBoardingfilter } from '../redux/onBoarding/onBoarding.actions'
const CategorieItem = (props) => {


  const [Error, setError] = useState('')
  const handlePress = async () => {
    try {
    

    fetch(`https://backend-jg5.conveyor.cloud/api/Categories/${props.id}`, {
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
    <TouchableOpacity 
    onLongPress={()=>{
      Alert.alert(
        "Alert Title",
        "want to delete this category ?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress:handlePress }
        ],
        { cancelable: false }
      );
    }}
    
    onPress={() =>{ props.filter(props.id)
    
    
    
    }}>
      <View style={{ alignContent: "center", alignItems: "center" }}>
        <View
          style={{
            width: 90,
            height: 90,
            marginBottom: 9,
            backgroundColor: "white",
            alignItems: "center",
            borderRadius: 10,
            margin: 2,
            borderWidth: props.category === props.id ? 1 : 0,
            justifyContent: "center",
            shadowColor: '#9A9A9A',
            shadowOffset: {
              width: 1,
              height: 2
            },
            shadowOpacity: 0.18,
            shadowRadius: 3.0,
            elevation: 4,
          }}
        >
           <Image style={{width:50,height:50,resizeMode:'cover'}} source={{ uri: props.img }}/>
          <Text style={{ textAlign: "center", margin: 3 }}>{props.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};



const mapStateToProps = (state) => {
  return {
    category: state.filter.category,
    onBoarding: state.onBoarding.onBoarding
    
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    filter: (categ) => dispatch(filterCategory(categ)),
    setOnBoarding: onBoarding => dispatch(onBoardingfilter(onBoarding))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategorieItem);
