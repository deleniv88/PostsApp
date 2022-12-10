import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegistrationScreen";
import PostsScreen from "./screens/mainScreen/PostsScreen";
import CreateScreen from "./screens/mainScreen/CreatePostsSreen";
import ProfileScreen from "./screens/mainScreen/ProfileScreen";

// icons import
import { AntDesign } from 'react-native-vector-icons';

export const useRoute = (isAuth) => {
    if (!isAuth) {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{ headerShown: false }} />
            </Stack.Navigator>
        )
    }
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size, color }) => {
                    let iconName;
                    if (route.name === "Posts") {
                        iconName = focused ? "appstore1" : "appstore-o"
                    }
                    else if (route.name === "Create") {
                        iconName = focused ? "pluscircle" : 'pluscircleo'
                    } else if (route.name === "Profile") {
                        iconName = focused ? "smile-circle" : "smileo"
                    }
                    return <AntDesign name={iconName} size={24} color={color} />
                },
                "tabBarActiveTintColor": "tomato",
                "tabBarInactiveTintColor": "gray",
                "tabBarStyle": [
                    {
                        "display": "flex"
                    },
                    null
                ]
            })}
            >
            <Tab.Screen
                options={{
                    tabBarShowLabel: false
                }}
                name="Posts" component={PostsScreen} />
            <Tab.Screen
                options={{
                    tabBarShowLabel: false
                }}
                name="Create" component={CreateScreen} />
            <Tab.Screen
                options={{
                    tabBarShowLabel: false
                }}
                name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
}

