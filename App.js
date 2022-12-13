import React, { useState } from "react";
import {} from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from './router';

import { Provider } from "react-redux";
import { store } from './redux/store'

import db from './firebase/config'


const fetchFonts = () => {
  return Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
};

export default function App() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [user, setUser] = useState(null)

  db.auth().onAuthStateChanged((user) => setUser(user))
  const routing = useRoute(user);

  if (!isDataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setIsDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer >{routing}</NavigationContainer>
    </Provider>
  )


}

