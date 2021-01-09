import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View ,Alert} from "react-native";

import { connect } from "react-redux";


import { onBoardingfilter } from '../redux/onBoarding/onBoarding.actions'
const { width, height } = Dimensions.get("window");
const RestaurantItem = (props) => {




  const navigation = useNavigation();
  const [Error, setError] = useState('')
 
  const navigateDetails = () => {
    navigation.navigate("ProductScreen", {
      id: props.id,
      title:props.title,
      img:props.img,
      path:props.path,
      desc:props.desc,
      mindesc:props.mindesc,
      isDispo:props.isDispo,
      type:props.type,
      price:props.price,
      desclong:props.desclong
    });
  };


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
 
console.log(Error);
  return (
    <View
      style={{
       
        flex: 1,
      
        alignItems: "center",
        width: "100%",
      }}
    >

      <View>
        <TouchableOpacity
       onLongPress={()=>{
        Alert.alert(
          "Alert Title",
          "My Alert Msg",
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
       onPress={navigateDetails}
        >
          <View
            style={{
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.36,
              shadowRadius: 6.68,
              shadowColor: "#000",
              elevation: 1,
              width: width*0.9,
              flex: 1,
              borderRadius: 10,
              overflow: "hidden",
              backgroundColor: "white",
            }}
          >
            <View>
              <Image
                source={{ uri: props.img != null ? props.img : "" }}
                style={{
                  height: 200,
                  width: "100%",
                  flex: 1,
                  resizeMode:'contain'
                }}
              />
            </View>
            <View
              style={{
                paddingVertical: 12,
                paddingHorizontal: 8,
                flexDirection: "row",
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: "100%",
                }}
              >
                <Text
                  adjustsFontSizeToFit
                  style={{  fontSize: 18 }}
                >
                  {props.title}
                </Text>

                <Text
                  adjustsFontSizeToFit
                  style={{
                    fontSize: 16,
                    color: "#9A9A9A",
                  }}
                >
                  {props.desc}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
 
    onBoarding: state.onBoarding.onBoarding
    
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    
    setOnBoarding: onBoarding => dispatch(onBoardingfilter(onBoarding))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantItem)
