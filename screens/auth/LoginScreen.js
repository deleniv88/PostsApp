import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, ImageBackground, TextInput, Button, TouchableOpacity, Platform, KeyboardAvoidingView, Keyboard, Dimensions } from 'react-native';
import imageBack from '../../assets/images/background.jpeg';

import { useDispatch } from 'react-redux';
import {authSignInUser} from '../../redux/auth/authOperations'

const widthFormInput = '90%';

const initialState = {
    email: '',
    password: ''
}

const image = imageBack;

export default function LoginScreen({ navigation }) {

    const [isShowKeyboadr, setIsShowKeyboard] = useState(false);
    const [state, setState] = useState(initialState);
    const dispatch = useDispatch()

    const [dimensions, setDimensions] = useState(Dimensions.get('window').width)

    const handelSubmit = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
        dispatch(authSignInUser(state))
        // navigation.navigate('Home')
        console.log(state);
    }

    const keyboardHide = () => {
        Keyboard.dismiss();
        setIsShowKeyboard(false)
    }

    useEffect(() => {
        const onChange = () => {
            const width = Dimensions.get('window').width;
            setDimensions(width)
        }
        Dimensions.addEventListener("change", onChange);
        return () => {
          Dimensions.removeEventListener("change", onChange);
        };
      }, []);
    

    return (
        <ImageBackground source={image} style={styles.image}>
            <TouchableWithoutFeedback onPress={keyboardHide}>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                    <View style={styles.containerLogin}>
                        <View style={styles.loginContainer} width={dimensions}
                            height={Dimensions.get('window').height/1.8}>
                            <Text style={styles.regitrationTitle}>Login</Text>
                            <View style={{ ...styles.form, marginBottom: isShowKeyboadr ? 20 : 50 }}>
                                <View style={{ marginTop: 10 }}>
                                    <TextInput style={styles.input}
                                        placeholder="Email"
                                        onFocus={() => setIsShowKeyboard(true)}
                                        value={state.email}
                                        onChangeText={(value) => setState((prevState) => ({ ...prevState, email: value }))}></TextInput>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <TextInput style={styles.input}
                                        placeholder="Password"
                                        secureTextEntry={true}
                                        onFocus={() => setIsShowKeyboard(true)}
                                        value={state.password}
                                        onChangeText={(value) => setState((prevState) => ({ ...prevState, password: value }))}>
                                    </TextInput>
                                </View>
                                <TouchableOpacity
                                    onPress={handelSubmit}
                                    activeOpacity={0.8}
                                    style={styles.btnSignUp}>
                                    <Text style={styles.btnTextSignUp}>Login</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                onPress={() => navigation.navigate('RegisterScreen')}
                                activeOpacity={0.8}
                                >
                                <Text style={styles.login}>Don't have an account? Register.</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    containerLogin:{
        flex:1,
        justifyContent: 'flex-end'
    },
    loginContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    regitrationTitle: {
        fontSize: 30
    },
    input: {
        borderWidth: 1,
        borderColor: "#E8E8E8",
        backgroundColor: "#F6F6F6",
        height: 50,
        borderRadius: 6,
        color: "black",
        fontSize: 16,
        paddingLeft: 10
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
    },
    form: {
        marginHorizontal: 40,
        width: widthFormInput,
    },
    btnSignUp: {
        height: 50,
        backgroundColor: "#FF6C00",
        color: "white",
        marginTop: 30,
        borderRadius: 20,
        fontSize: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    btnTextSignUp: {
        color: "white",
        fontSize: 16
    },
    login: {
        color: "#1B4371",
        textAlign: "center",
        fontSize: 16,
        marginTop: 10,
        fontFamily: 'Roboto-Regular'
    }
})