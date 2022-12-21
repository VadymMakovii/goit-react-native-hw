import { useCallback, useState } from "react";
import {
  View,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import styles from "./App.styles";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [authScreen, setAuthScreen] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const keyboardDismiss = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#FF6C00" />;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <TouchableWithoutFeedback onPress={() => keyboardDismiss()}>
        <ImageBackground
          style={styles.bgImage}
          source={require("./assets/images/BG.jpg")}
        >
          {authScreen ? (
            <LoginScreen
              changeScreen={() => setAuthScreen(!authScreen)}
              keyboardStatus={isShowKeyboard}
              setKeyboardStatus={setIsShowKeyboard}
              keyboadrClose={keyboardDismiss}
            />
          ) : (
            <RegistrationScreen
              changeScreen={() => setAuthScreen(!authScreen)}
              keyboardStatus={isShowKeyboard}
              setKeyboardStatus={setIsShowKeyboard}
              keyboadrClose={keyboardDismiss}
            />
          )}
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}
