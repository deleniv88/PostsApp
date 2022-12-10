import React, { useState, useEffect } from "react";
import {} from "react-native";
import * as Font from "expo-font";
import  AppLoading  from "expo-app-loading";

import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from './router';


const fetchFonts = () => {
  return Font.loadAsync({              
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
};

export default function App() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const routing = useRoute(true);

  if (!isDataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setIsDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return  <NavigationContainer >{routing}</NavigationContainer>

}

