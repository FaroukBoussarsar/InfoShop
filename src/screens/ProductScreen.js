import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { PRODUCTS } from "../data/dummy_data";

const ProductScreen = (props) => {



 
 const { id,title,img,path,desc,type,desclong ,isDispo,price } = props.route.params;
  const navigation = useNavigation();
  const navigateDetails = () => {
    navigation.navigate("EditProductScreen", {
      id:id,title:title,img:img,path:path,desc:desc,type:type,desclong:desclong ,isDispo:isDispo,price:price
    });
  };
  console.log(props);
  
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title:title,
    });
  }, [navigation]);

  return (
    <View style={{flex:1,backgroundColor:'white'}}>
     
      <Image
        source={{ uri: img  }}
        style={{
          height: 200,
          width: "100%",
          resizeMode:'cover'
          
        }}
      />
      
      <View style={{flexDirection:'row',justifyContent:'space-between',padding:20}}>
      <Text style={{fontSize:20,fontWeight:'bold'}}>{title}</Text>
      <Text style={{fontSize:20 ,color:isDispo===true?"green":"red"}}>{isDispo===true?"dispo":"non dispo"}</Text>
      </View>
      <View style={{padding:20}}>
        <Text> {desclong}</Text>
        <Text style={{fontSize:20}}>{price} TND</Text>
      </View>
      <TouchableWithoutFeedback onLongPress={navigateDetails}>
        <View style={{flex:1}}></View>
      </TouchableWithoutFeedback>
    </View>
  );
};
export default ProductScreen;
