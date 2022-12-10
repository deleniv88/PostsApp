import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { EvilIcons } from '@expo/vector-icons';


const widthFormInput = '100%';

export default function Home({ route, navigation }) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (route.params) {
            setPosts((prevState) => [...prevState, route.params])
        }
    }, [route.params]);

    return (
        <View style={styles.container}>
            <View style={styles.userInformation}>
                <View style={styles.avatar}></View>
                <View>
                    <Text style={styles.userName}>Name</Text>
                    <Text style={styles.userEmail}>Email</Text>
                </View>
            </View>
            <View style={styles.postContainer}>
                <FlatList data={posts} keyExtractor={(item, indx) => indx.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.posts}>
                            <Image source={{ uri: item.photo }}
                                style={styles.postImage}></Image>
                            <View>
                                <Text>Name of post</Text>
                            </View>
                            <View style={styles.commentsAndLocation}>
                                <TouchableOpacity style={styles.commentField}>
                                <EvilIcons name="comment" size={24} color="black" />
                                    <Text
                                        style={styles.counterComment}
                                        onPress={() => navigation.navigate("Comments")}>0</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.locationPlace}>
                                    <EvilIcons name="location" size={24}></EvilIcons>
                                    <Text
                                        onPress={() => navigation.navigate("Map")}
                                        style={styles.location}>Location</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10
    },
    userInformation: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userName: {
        marginLeft: 10,
        fontWeight: 'bold'
    },
    userEmail: {
        marginLeft: 10,
        color: "gray"
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
        width: 100,
        height: 100,
        borderRadius: 10,
        backgroundColor: "black",

    },
    commentsAndLocation: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    locationPlace:{
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