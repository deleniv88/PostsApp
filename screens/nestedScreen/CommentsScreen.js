import { View, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const widthFormInput = '100%';


export default function CommentsScreen({ route }) {
    return (
        <View style={styles.container}>
            <View style={styles.photoContainer}>
                <Image source={{ uri: route.params.photo }} style={styles.postImage}></Image>
            </View>
            <View style={styles.typeComment}>
                <TouchableOpacity style={styles.icon}
                activeOpacity={0.8}>
                    <AntDesign name="upcircle" size={32} color="tomato" />
                </TouchableOpacity>

                <TextInput
                    style={styles.commentInput}
                    placeholder="Write comment...">
                </TextInput>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10
    },
    photoContainer: {
        margin: 10
    },
    postImage: {
        width: widthFormInput,
        height: 300,
        borderRadius: 10
    },
    typeComment: {
        position: 'absolute',
        bottom: 0,
        width: widthFormInput,
        height: 50,
        backgroundColor: '#E8E8E8',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#BDBDBD',
        marginBottom: 20
    },
    commentInput: {
        paddingLeft: 15,
        color: 'black'
    },
    icon: {
        position: 'absolute',
        right: 10,
    },
})