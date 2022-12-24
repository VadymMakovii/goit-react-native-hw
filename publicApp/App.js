import { useCallback } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";
import RegistrationScreen from "./src/components/Screens/RegistrationScreen";
import LoginScreen from "./src/components/Screens/LoginScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import styles from "./src/App.styles";

SplashScreen.preventAutoHideAsync();

const AuthStack = createNativeStackNavigator();

export default function App() {
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

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#FF6C00" />;
  }

  return (
    <NavigationContainer>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <AuthStack.Navigator>
          <AuthStack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
          <AuthStack.Screen options={{headerShown: false}} name="Registration" component={RegistrationScreen} />
        </AuthStack.Navigator>
      </View>
    </NavigationContainer>
  );
}
