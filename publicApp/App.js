import { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet } from "react-native";
import useRoute from "./src/router";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  const roating = useRoute();

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
        {roating}
      </View>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});