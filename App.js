import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import SettingScreen from "./src/screens/SettingScreen";

import { connect, Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'

import { persistor, store } from './src/redux/store'
import ProductScreen from "./src/screens/ProductScreen";
import EditProductScreen from "./src/screens/EditProductScreen";
const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
      <Stack.Screen name="EditProductScreen" component={EditProductScreen} />
    </Stack.Navigator>
  );
};

const SettingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingsScreen" component={SettingScreen} />
    </Stack.Navigator>
  );
};

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "md-restaurant";
            return <AntDesign name="home" size={size} color={color} />;
          } else if (route.name === "Setting") {
            return (
              <Ionicons name="ios-settings-outline" size={size} color={color} />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: "#282828",
        inactiveTintColor: "#BEBEBE",
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({ route, navigation }) => ({
          title: "Home",
        })}
      />

      <Tab.Screen
        name="Setting"
        component={SettingStack}
        options={({ route, navigation }) => ({
          title: "Setting",
        })}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
    
          <NavigationContainer>
            <MyTabs />
          </NavigationContainer>

      </PersistGate>
    </Provider>
  );
}
