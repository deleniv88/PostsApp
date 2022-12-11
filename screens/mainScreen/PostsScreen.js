import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../nestedScreen/Home";
import CommentsScreen from "../nestedScreen/CommentsScreen";
import MapScreen from "../nestedScreen/MapScreen";

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';



const NestedScreen = createStackNavigator();

const tabHiddenRoutes = ["Comments","MapScreen"];


const PostsScreen = ({navigation, route}) => {

  if(tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))){
    navigation.setOptions({tabBarStyle: {display: 'none'}});
   } else {
   navigation.setOptions({tabBarStyle: {display: 'flex'}});
  }

  return (
    <NestedScreen.Navigator >
      <NestedScreen.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false,
         }}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} 
      // options={{ headerShown: false}}
      // options={{
      //   headerShown: false,
      // }}
      />
      <NestedScreen.Screen name="MapScreen" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
