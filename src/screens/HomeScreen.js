import React, { useState, useEffect } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";
import CategorieItem from "../components/CategorieItem";
import RestaurantItem from "../components/RestaurantItem";
import { CATEGORIES, PRODUCTS } from "../data/dummy_data";

const HomeScreen = (props) => {
  const [hasError, setErrors] = useState(false);
  const [Category, setCategory] = useState({});
  const [Product, setProduct] = useState({});
  const [isLoading, seIsLoading] = useState(true);

  useEffect(() => {
    function fetchData() {
      fetch("https://backend-jg5.conveyor.cloud/api/Categories")
        .then((res) => res.json())
        .then((res) => {
          setCategory(res);
        })

        .catch((err) => {
          setErrors(err);
        })
        // .finally(() => seIsLoading(false));

      
      fetch("https://backend-jg5.conveyor.cloud/api/Products")
        .then((res) => res.json())
        .then((res) => {
          setProduct(res);
        })

        .catch((err) => {
          setErrors(err);
        })
        .finally(() => seIsLoading(false));
    }

    fetchData();
  }, []);

  console.log(hasError);
  console.log(Category);
  console.log(Product);

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
    <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            padding: 30,
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
        >
          <Image
            style={{ width: 50, height: 50, resizeMode: "contain" }}
            source={require("../../assets/it.png")}
          />
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "green",
              marginLeft: 20,
            }}
          >
            IT Shop
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {Category.map((item, index) => {
              return (
                <View
                  key={item.categoryId}
                  style={{ marginLeft: index === 0 ? 20 : 5 }}
                >
                  <CategorieItem title={item.categoryName} img={item.image} />
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View style={{ marginTop: 10 }}>
          {Product.map((item, index) => {
            if (props.category) {
              return (
                <View
                  key={item.productId}
                  style={{
                    paddingVertical: 4,
                  }}
                >
                  {!!props.category && item.categoryId === props.category && (
                    <RestaurantItem
                      title={item.productName}
                      img={item.imageUrl}
                      path={item.categoryId}
                      desc={item.miniDescription}
                      id={item.productId}
                      type={item.categoryId}
                      desclong={item.description}
                    />
                  )}
                </View>
              );
            }
            return (
              <View
                key={item.productId}
                style={{
                  paddingVertical: 4,
                }}
              >
                <RestaurantItem
                  title={item.productName}
                  img={item.imageUrl}
                  path={item.categoryId}
                  desc={item.miniDescription}
                  id={item.productId}
                  type={item.categoryId}
                  desclong={item.description}
                  isDispo={item.isDispo}
                  price={item.price}
                />
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    category: state.filter.category,
  };
};
export default connect(mapStateToProps)(HomeScreen);
