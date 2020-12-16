import React from "react";
import { ScrollView, View } from "react-native";
import CategorieItem from "../components/CategorieItem";
import RestaurantItem from "../components/RestaurantItem";
import { connect } from "react-redux";
import { filterCategory } from "../redux/filter/filter.actions";
import { CATEGORIES, PRODUCTS } from "../data/dummy_data";
const HomeScreen = (props) => {
  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ marginTop: 10 }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map((item, index) => {
            return (
              <View key={item.id} style={{ marginLeft: index === 0 ? 20 : 5 }}>
                <CategorieItem title={item.name} img={item.img} />
              </View>
            );
          })}
        </ScrollView>
      </View>

      <View style={{ marginTop: 10 }}>
        {PRODUCTS.map((item, index) => {
         if(props.category){
               return (
            <View
              key={item.id}
              style={{
                paddingVertical: 4,
              }}
            >
            { !!props.category&&item.Categorie===props.category&&<RestaurantItem
                title={item.name}
                img={item.img}
                path={item.Categorie}
                desc={item.minDesc}
                id={item.id}
                type={item.Categorie}
              />}
            </View>
          );
         }
         return (
            <View
              key={item.id}
              style={{
                paddingVertical: 4,
              }}
            >
           <RestaurantItem
                title={item.name}
                img={item.img}
                path={item.Categorie}
                desc={item.minDesc}
                id={item.id}
                type={item.Categorie}
              />
            </View>
          );
        
        })}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
    return {
      category: state.filter.category,
    };
  };
  export default connect(mapStateToProps)(HomeScreen) ;
