import { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";

import styles from "./AuthScreens.styles";

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const keyboardDismiss = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const formSubmitHandler = () => {
    console.log(state);
    setState(initialState);
    navigation.navigate("Home");
  };

  useEffect(() => {
    Keyboard.scheduleLayoutAnimation(Platform.OS === "ios" && { easing: "keyboard" });
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
              <View style={{ marginTop: 32 }}>
                <Text style={styles.headerTitle}>Sign in</Text>
              </View>
              <View style={styles.form}>
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
                  <Text style={styles.buttonText}>SIGN IN</Text>
                </TouchableOpacity>
                <View style={styles.authToogleBox}>
                  <Text style={styles.authToogleText}>
                    Don't have an account?
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate("Registration")}
                  >
                    <Text style={styles.authToogle}>log in</Text>
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

export default LoginScreen;
