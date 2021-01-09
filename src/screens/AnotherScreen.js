import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import axios from "axios";
const HomeScreen  = () => {
  const [hasError, setErrors] = useState(false);
  const [planets, setPlanets] = useState({});

  useEffect( () => {
     function fetchData() {
     fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res=> res.json())
        .then(res =>{ 
         
          setPlanets(res)})
        .catch(err => setErrors(err));
    }

    fetchData();
  },[]);

  return (
    <View>
      <Text>{JSON.stringify(planets)}</Text>
   
      <Text>Has error: {JSON.stringify(hasError)}</Text>
    </View>
  );
};

export default HomeScreen;
