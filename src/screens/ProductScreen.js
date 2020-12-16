import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { PRODUCTS } from "../data/dummy_data";

const ProductScreen = (props) => {



  const navigation = useNavigation();
 
 
  const navigateDetails = () => {
    navigation.navigate("EditProductScreen", {
      id: id,
    });
  };
  const { id } = props.route.params;
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: PRODUCTS[id].name,
    });
  }, [navigation]);

  return (
    <View style={{flex:1,backgroundColor:'white'}}>
     
      <Image
        source={{ uri: PRODUCTS[id].img  }}
        style={{
          height: 200,
          width: "100%",
          resizeMode:'cover'
          
        }}
      />
      
      <View style={{flexDirection:'row',justifyContent:'space-between',padding:20}}>
      <Text style={{fontSize:20,fontWeight:'bold'}}>{PRODUCTS[id].name}</Text>
      <Text style={{fontSize:20 ,color:PRODUCTS[id].dispo==="true"?"green":"red"}}>{PRODUCTS[id].dispo==="true"?"dispo":"non dispo"}</Text>
      </View>
      <View style={{padding:20}}>
        <Text> {PRODUCTS[id].description}</Text>
        <Text style={{fontSize:20}}>{PRODUCTS[id].prix} TND</Text>
      </View>
      <TouchableWithoutFeedback onLongPress={navigateDetails}>
        <View style={{flex:1}}></View>
      </TouchableWithoutFeedback>
    </View>
  );
};
export default ProductScreen;
