import { useEffect, useState, useDispatch } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, ImageBackground, 
    TextInput, Button, TouchableOpacity, Platform, KeyboardAvoidingView, Keyboard, 
    Dimensions } from 'react-native';
import imageBack from '../../assets/images/background.jpeg';

const widthFormInput = '90%';

const initialState = {
    login: '',
    email: '',
    password: ''
}

const image = imageBack;

export default function RegistrationScreen({ navigation }){

    const [isShowKeyboadr, setIsShowKeyboard] = useState(false);
    const [state, setState] = useState(initialState);
    // const dispatch = useDispatch()

    const [dimensions, setDimensions] = useState(Dimensions.get('window').width)

    useEffect(() => {
        const onChange = () => {
            const width = Dimensions.get('window').width;
            setDimensions(width)
        }
        Dimensions.addEventListener("change", onChange);
        return () => {
            Dimensions.removeEventListener("change", onChange)
        }
    },[])

    const handelSubmit = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
        // dispatch(authSignUpUser(state))
        setState(initialState);
        console.log(state);
    }

    return (

        <ImageBackground source={image} style={styles.image}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}>
                    <View style={styles.constainer}>
                        <View style={styles.registrationContainer} width={dimensions}
                            height={Dimensions.get('window').height / 1.4}>
                            <View style={styles.avatar}></View>
                            <Text style={styles.regitrationTitle}>Registration</Text>
                            <View style={{ ...styles.form, marginBottom: isShowKeyboadr ? -40 : 50 }}>
                                <View style={{ marginTop: 30 }}>
                                    <TextInput style={styles.input}
                                        placeholder="Login"
                                        onFocus={() => setIsShowKeyboard(true)}
                                        value={state.login}
                                        onChangeText={(value) => setState((prevState) => ({ ...prevState, login: value }))}></TextInput>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <TextInput style={styles.input}
                                        placeholder="Email"
                                        onFocus={() => setIsShowKeyboard(true)}
                                        value={state.email}
                                        onChangeText={(value) => setState((prevState) => ({ ...prevState, email: value }))}></TextInput>
                                </View>
                                <View style={styles.passwordStyle}>
                                    <TextInput style={styles.input}
                                        placeholder="Password"
                                        secureTextEntry={true}
                                        onFocus={() => setIsShowKeyboard(true)}
                                        value={state.password}
                                        onChangeText={(value) => setState((prevState) => ({ ...prevState, password: value }))}>
                                    </TextInput>
                                    {/* <Text>Show</Text> */}
                                </View>
                                <TouchableOpacity
                                    onPress={handelSubmit}
                                    activeOpacity={0.8}
                                    style={styles.btnSignUp}>
                                    <Text style={styles.btnTextSignUp}>Sign Up</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('LoginScreen')}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.login}>Already have an account? Login.</Text>
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
    constainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    registrationContainer: {
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: 'white',
        borderRadius: 10,
    },
    regitrationTitle: {
        fontSize: 30
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
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
    form: {
        marginHorizontal: 40,
        width: widthFormInput,
    },
    passwordStyle: {
        marginTop: 10,
        justifyContent: 'space-between'
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
        marginTop: 10
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 10,
        backgroundColor: "#F6F6F6",
        position: "absolute",
        top: -80
    }
})

