import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegistrationScreen from "./components/Screens/authScreens/RegistrationScreen";
import LoginScreen from "./components/Screens/authScreens/LoginScreen";
import HomeScreen from "./components/Screens/mainScreens/HomeScreen/HomeScreen";

const AuthStack = createNativeStackNavigator();

const useRoute = (isLoggedIn) => {
  if (!isLoggedIn) {
    return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Registration"
        component={RegistrationScreen}
      />
    </AuthStack.Navigator>
  );
  }
  return (
    <HomeScreen/>
  );
};

export default useRoute;
