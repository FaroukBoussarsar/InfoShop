import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const SettingScreen = () => {

    const navigation = useNavigation();
  return (
    <View  style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{padding:8}}>
        <TouchableOpacity onPress={()=>navigation.navigate('AddCategoryScreen')}>
          <View style={{ borderWidth: 0.2, marginVertical: 5,padding:10,borderRadius:5 }}>
            <Text style={{ fontSize: 20 }}>ADD NEW CATEGORY</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('AddProductScreen')}>
          <View style={{ borderWidth: 0.2, marginVertical: 5 ,padding:10,borderRadius:5}}>
            <Text style={{ fontSize: 20 }}>ADD NEW PRODUCT</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SettingScreen;
