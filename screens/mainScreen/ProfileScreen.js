import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image, ImageBackground, FlatList, ScrollView } from "react-native"
import { Camera } from "expo-camera"
import { useState } from "react";
import imageBack from '../../assets/images/background.jpeg';
import React, { useEffect } from "react";
import { EvilIcons } from '@expo/vector-icons';


const image = imageBack;
const widthFormInput = (Dimensions.get('window').width-30)

export default function ProfileScreen({ route, navigation }) {
    const [posts, setPosts] = useState([]);
    const [dimensions, setDimensions] = useState(Dimensions.get('window').width)


    useEffect(() => {

        if (route.params) {
            setPosts((prevState) => [...prevState, route.params])
        }

    }, [route.params]);

    return (
        <ImageBackground source={image} style={styles.image}>
            <View style={styles.container}>
                <View style={styles.profileContainer} width={dimensions}
                    height={Dimensions.get('window').height / 1.8}>
                    <View style={styles.avatar}></View>
                    <View >
                        <Text style={styles.userName}>Name</Text>
                    </View>
                    <View style={styles.postContainer}>
                        <FlatList data={posts} keyExtractor={(item, indx) => indx.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.posts}>
                                    <Image source={{ uri: item.photo }}
                                        style={styles.postImage}></Image>
                                    <View>
                                        <Text>{item.photoName}</Text>
                                    </View>
                                    <View style={styles.commentsAndLocation}>
                                        <TouchableOpacity style={styles.commentField}>
                                            <EvilIcons name="comment" size={24} />
                                            <Text
                                                style={styles.counterComment}
                                                onPress={() => navigation.navigate("Comments", item)}>0</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.locationPlace}>
                                            <EvilIcons name="location" size={24}></EvilIcons>
                                            <Text
                                                onPress={() => navigation.navigate("MapScreen", item)}
                                                style={styles.location}>{item.locationName}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )} />
                    </View>
                </View>
            </View>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
        // position: "relative"
    },
    profileContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    userName:{
        marginTop: 120,
        fontSize: 30,
        fontWeight: 'bold'
    },
    postContainer: {
        marginTop: 20
    },
    posts: {
        marginBottom: 20,
    },
    postImage: {
        width: widthFormInput,
        height: 300,
        borderRadius: 10
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 10,
        backgroundColor: "#F6F6F6",
        position: "absolute",
        top: -80
    },
    commentsAndLocation: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    locationPlace: {
        flexDirection: 'row',
    },
    location: {
        textDecorationLine: 'underline',
        alignSelf: 'flex-end'
    },
    commentField: {
        flexDirection: 'row'
    },
    counterComment: {
        alignSelf: 'flex-end'
    }
})