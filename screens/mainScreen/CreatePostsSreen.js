import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image } from "react-native"
import { Camera } from "expo-camera"
import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { EvilIcons, FontAwesome5 } from '@expo/vector-icons';


const cameraWidth = Dimensions.get('window').width / 1.05
const cameraHeigth = Dimensions.get('window').height / 1.05
const widthFormInput = '90%';

export default function CreatePostsScreen({ navigation }) {

    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    const [photoName, setPhotoName] = useState('');
    const [locationName, setLocationName] = useState(null)

    const [postName, setPostName] = useState('');

    // const [location, setLocation] = useState(null)

    const takePhoto = async () => {
        const photo = await camera.takePictureAsync();

        setPhoto(photo.uri);
        const location = await Location.getCurrentPositionAsync()
        console.log(location);
        console.log(photo);
        console.log(photo.uri);
        console.log({ photo });
    }

    const sendPhoto = () => {
        console.log(navigation);
        navigation.navigate("Profile", { photo, photoName, locationName })
        navigation.navigate("Home", { photo, photoName, locationName })   
        setPhotoName('');
        setLocationName('')
        console.log(photoName);
    }

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
            const { location } = await Location.requestPermissionsAsync();
            if (location !== 'granted') {
                setErrorMsg("No location")
            }
        })();
    }, [])

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No ascces to camera</Text>
    }

    return (
        <View style={styles.container}>
            {/* <View style={styles.cameraContainer}> */}
            <Camera style={styles.camera} ref={setCamera} type={type}>
                {photo && (<View style={styles.takePhotoContainer}>
                    <Image source={{ uri: photo }}></Image>
                </View>)}
                <View style={styles.cameraBackground}>
                    <FontAwesome5 name="camera" size={24} color="gray" onPress={takePhoto} />
                </View>
            </Camera>
            {/* </View> */}
            <View style={styles.photoSettings}>
                <TouchableOpacity onPress={takePhoto}>
                    <Text style={styles.textPhoto}>
                        Download photo
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        )
                    }}>
                    <Text style={styles.textPhoto}>Back/front camera</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.form}>
                <TextInput
                    placeholder="Name..."
                    style={styles.inputName}
                    value={photoName}
                    onChangeText={(value) => setPhotoName(value)}
                    ></TextInput>
            </View>
            <View style={styles.form}>
                <EvilIcons name="location" size={32} color="gray" style={styles.icon} />
                <TextInput
                    placeholder="Location..."
                    style={styles.inputLocation}
                    value={locationName}
                    onChangeText={(value) => setLocationName(value)}>
                </TextInput>

            </View>
            <TouchableOpacity
                onPress={sendPhoto}
                activeOpacity={0.8}
                style={styles.btnSignUp}>
                <Text style={styles.btnTextSignUp}>Create post</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5E5E5;'
    },
    text: {
        color: 'white'
    },
    cameraBackground: {
        backgroundColor: 'white',
        height: 70,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    camera: {
        width: cameraWidth,
        height: 300,
        marginTop: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#E8E8E8'
    },
    inputName: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: "#E8E8E8",
        height: 50,
        borderRadius: 6,
        color: "black",
        fontSize: 16,
        paddingLeft: 10
    },
    inputLocation: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: "#E8E8E8",
        height: 50,
        borderRadius: 6,
        color: "black",
        fontSize: 16,
        paddingLeft: 40
    },
    form: {
        width: widthFormInput,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    icon: {
        position: 'absolute',
        left: 0,
        top: 10
    },
    btnSignUp: {
        width: cameraWidth,
        height: 50,
        backgroundColor: "#F6F6F6",
        color: "white",
        marginTop: 30,
        borderRadius: 25,
        fontSize: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    btnTextSignUp: {
        color: "#BDBDBD",
        fontSize: 16
    },
    takePhotoContainer: {
        position: 'absolute',
        // top: 20,
        // left: 20,
        borderColor: 'white',
        borderWidth: 1,
        height: cameraHeigth,
        width: cameraWidth
    },
    photoSettings: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: widthFormInput,
    },
    textPhoto: {
        color: '#BDBDBD',
        marginTop: 5
    }
})