import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import { TouchableOpacity } from 'react-native'

import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegistrationScreen";
import PostsScreen from "./screens/mainScreen/PostsScreen";
import CreateScreen from "./screens/mainScreen/CreatePostsSreen";
import ProfileScreen from "./screens/mainScreen/ProfileScreen";

// icons import
import { AntDesign, Octicons, Ionicons, MaterialIcons } from 'react-native-vector-icons';
import { StyleSheet } from "react-native";

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
        <Tab.Navigator tabBarOptions={{ showLabel: false }}>
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused, size, color }) => (
                        <TouchableOpacity>
                            <AntDesign name="appstore-o" size={24} color={color} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity>
                            <MaterialIcons name="logout" size={30} color="black" 
                             onPress={() => alert('This is a button!')} />
                        </TouchableOpacity>
                    )
                }}
                name="Posts" component={PostsScreen}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused, size, color }) => (
                        <TouchableOpacity>
                            <AntDesign name="pluscircle" style={styles.iconAdd}
                             onPress={() => navigation.navigate('Create')} />
                        </TouchableOpacity>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity
                           >
                            <Ionicons name="ios-arrow-back" size={24} style={styles.iconBack}
                             onPress={() => navigation.navigate('Posts')} />
                        </TouchableOpacity>
                    )
                }}
                name="Create" component={CreateScreen} />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused, size, color}) => (
                        <TouchableOpacity>
                            <Octicons name="person" size={24} color="black" 
                           />
                        </TouchableOpacity>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity>
                            <Ionicons name="ios-arrow-back" size={24} style={styles.iconBack}
                             onPress={() => navigation.navigate('Posts')} />
                        </TouchableOpacity>
                    )
                }}
                name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    iconAdd:{
        color: "#FF6C00",
        fontSize: 30,
        
    },
    iconBack:{
        color: '#212121',
        opacity: 0.8,
        paddingLeft: 10
    }
})
