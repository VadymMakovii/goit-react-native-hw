import { useEffect, useState} from "react";
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
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { createUser } from "../../../redux/auth/authOperations";
import {setError} from "../../../redux/auth/authSlice";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebase/config";
import { nanoid } from "nanoid";
import { useAlert } from "../../../hooks";
import { Loader } from "../../Loader/Loader";
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
    if (!image) {
      return
    }
    try {
    const uniqueAvatarId = nanoid();
    const imagesRef = ref(storage, `usersAvatar/${uniqueAvatarId}`);
    const response = await fetch(image);
    const file = await response.blob();
    await uploadBytes(imagesRef, file);
    const loadedPhoto = await getDownloadURL(imagesRef);
    return loadedPhoto;
    } catch (error) {
      dispatch(setError(error.message));
      useAlert("Your avatar has not been uploaded. You can add a new avatar on your profile page at any time");
    }
  };

  const keyboardDismiss = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const formSubmitHandler = async () => {
    setIsLoading(true);
    const photo = await uploadPhotoToServer();
    dispatch(createUser({ ...state, photo }));
    setState(initialState);
    setImage(null);
    setIsLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardDismiss}>
      <ImageBackground
        style={styles.bgImage}
        source={require("../../../../assets/images/BG.jpg")}
      >{isLoading && <Loader loading={isLoading} />}
        <TouchableWithoutFeedback onPress={keyboardDismiss}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
            <View style={styles.topContainer}>
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
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;
