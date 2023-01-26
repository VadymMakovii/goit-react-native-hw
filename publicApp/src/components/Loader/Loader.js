import { useEffect, useRef } from "react";
import { View, ActivityIndicator, Animated, StyleSheet } from "react-native";

export const Loader = (loading) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loading &&
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
  }, [loading]);

  return (
    <Animated.View style={{ ...styles.overlay, opacity: fadeAnim }}>
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FF6C00" />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 2,
    backgroundColor: "#00000080",
  },
  loader: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
});
