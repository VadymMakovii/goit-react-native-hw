import { useEffect, useState } from "react";
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
import { createUser } from "../../../redux/auth/authOperations";
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

  const dispatch = useDispatch();

  const keyboardDismiss = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const formSubmitHandler = () => {
    dispatch(createUser(state));
    setState(initialState);
  };

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

  return (
    <TouchableWithoutFeedback onPress={keyboardDismiss}>
      <ImageBackground
        style={styles.bgImage}
        source={require("../../../../assets/images/BG.jpg")}
      >
        <TouchableWithoutFeedback onPress={keyboardDismiss}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
            <View style={styles.topContainer}>
              <View style={styles.avatarPlaceholder}>
                <Image />
                <TouchableOpacity style={styles.addButton}>
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
