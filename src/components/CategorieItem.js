
import React from "react";
import { TouchableOpacity, View,Text,Image } from "react-native";
import { connect } from "react-redux";
import { filterCategory } from "../redux/filter/filter.actions";

const CategorieItem = (props) => {
 
  return (
    <TouchableOpacity onPress={() => props.filter(props.title)}>
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
            borderWidth: props.category === props.title ? 1 : 0,
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    filter: (categ) => dispatch(filterCategory(categ)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategorieItem);
