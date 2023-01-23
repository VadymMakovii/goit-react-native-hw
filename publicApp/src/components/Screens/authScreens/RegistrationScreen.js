import { useEffect, useState, useRef} from "react";
import { useDispatch } from "react-redux";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  ActivityIndicator,
  Animated,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { createUser } from "../../../redux/auth/authOperations";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebase/config";
import { nanoid } from "nanoid";
import styles from "./AuthScreens.styles";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
   isLoading && Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isLoading]);

  useEffect(() => {
    Keyboard.scheduleLayoutAnimation(
      Platform.OS === "ios" && { easing: "keyboard" }
    );
    const keyboardHideHandler = Keyboard.addListener("keyboardDidHide", () =>
      keyboardDismiss()
    );
    return () => {
      keyboardHideHandler.remove();
    };
  }, [isShowKeyboard]);

  const dispatch = useDispatch();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });
    !result.canceled && setImage(result.assets[0].uri);
  };

  const uploadPhotoToServer = async () => {
    const uniqueAvatarId = nanoid();
    const imagesRef = ref(storage, `usersAvatar/${uniqueAvatarId}`);
    const response = await fetch(image);
    const file = await response.blob();
    await uploadBytes(imagesRef, file);
    const loadedPhoto = await getDownloadURL(imagesRef);
    return loadedPhoto;
  };

  const keyboardDismiss = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const formSubmitHandler = async () => {
    try {
      setIsLoading(true);
      const photo = await uploadPhotoToServer();
      dispatch(createUser({ ...state, photo }));
      setState(initialState);
      setImage(null);
    } catch (error) {
      console.log(error.message)
    }
    setIsLoading(false);
  };


  return (
    <TouchableWithoutFeedback onPress={keyboardDismiss}>
      <ImageBackground
        style={styles.bgImage}
        source={require("../../../../assets/images/BG.jpg")}
      >{isLoading && (<View style={styles.loader}>
        <ActivityIndicator size="large" color="#FF6C00" />
      </View>)}
        <TouchableWithoutFeedback onPress={keyboardDismiss}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
            <Animated.View style={{ ...styles.topContainer, opacity: fadeAnim, }}>
              <View style={styles.avatarPlaceholder}>
                {image && <Image source={{ uri: image }} style={styles.avatar}/>}
                <TouchableOpacity style={styles.addButton} onPress={pickImage}>
                  <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 92 }}>
                <Text style={styles.headerTitle}>Create account</Text>
              </View>
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder="Login"
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                  value={state.login}
                  onFocus={() => !isShowKeyboard && setIsShowKeyboard(true)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                  value={state.email}
                  onFocus={() => !isShowKeyboard && setIsShowKeyboard(true)}
                />
                <View style={{ position: "relative" }}>
                  <Text
                    style={styles.showPassToogle}
                    onPress={() => setIsShowPassword(!isShowPassword)}
                  >
                    {!isShowPassword ? "Show" : "Hide"}
                  </Text>
                  <TextInput
                    style={{ ...styles.input, paddingRight: 70 }}
                    placeholder="Password"
                    secureTextEntry={!isShowPassword}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                    value={state.password}
                    onFocus={() => !isShowKeyboard && setIsShowKeyboard(true)}
                  />
                </View>
              </View>

              <View
                style={
                  !isShowKeyboard ? styles.bottomContainer : { display: "none" }
                }
              >
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.7}
                  onPress={() => formSubmitHandler()}
                >
                  <Text style={styles.buttonText}>LOG IN</Text>
                </TouchableOpacity>
                <View style={styles.authToogleBox}>
                  <Text style={styles.authToogleText}>
                    Already have an account?
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.authToogle}>sign in</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;
