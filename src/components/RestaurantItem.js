import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";


const { width, height } = Dimensions.get("window");
const RestaurantItem = (props) => {




  const navigation = useNavigation();
 
 
  const navigateDetails = () => {
    navigation.navigate("ProductScreen", {
      id: props.id,
    });
  };

  return (
    <View
      style={{
        padding: 4,
        flex: 1,
        flexDirection: "row-reverse",
        alignItems: "flex-start",
        width: props.horizantal ? width * 0.8 : "100%",
      }}
    >

      <View>
        <TouchableOpacity
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
              width: "100%",
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

export default RestaurantItem;
