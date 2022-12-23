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
  Image,
} from "react-native";
import AddBtn from '../AddBtn/AddBtn';
import styles from "../../App.styles";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = ({
  changeScreen,
  keyboardStatus,
  setKeyboardStatus,
  keyboadrClose,
}) => {
  const [state, setState] = useState(initialState);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const formSubmitHandler = () => {
    console.log(state);
    setState(initialState);
  };

  useEffect(() => {
    Keyboard.scheduleLayoutAnimation({ duration: 300, easing: "easeIn" });
    const keyboardHideHandler = Keyboard.addListener("keyboardDidHide", () =>
      keyboadrClose()
    );
    return () => {
      keyboardHideHandler.remove();
    };
  }, [keyboardStatus]);

  return (
    <TouchableWithoutFeedback onPress={() => keyboadrClose()}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
        <View style={styles.topContainer}>
          <View style={styles.avatarPlaceholder}>
            <Image />
            <TouchableOpacity style={styles.addButton}>
              <AddBtn/>
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
              onFocus={() => !keyboardStatus && setKeyboardStatus(true)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, email: value }))
              }
              value={state.email}
              onFocus={() => !keyboardStatus && setKeyboardStatus(true)}
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
                  setState((prevState) => ({ ...prevState, password: value }))
                }
                value={state.password}
                onFocus={() => !keyboardStatus && setKeyboardStatus(true)}
              />
            </View>
          </View>
          {!keyboardStatus && (
            <View style={styles.bottomContainer}>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={() => formSubmitHandler()}
              >
                <Text style={styles.buttonText}>LOG IN</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} onPress={changeScreen}>
                <Text style={styles.authToogle}>
                  Already have an account? SIGN IN
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;
