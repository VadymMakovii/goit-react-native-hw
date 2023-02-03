import { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export const Loader = (loading) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (loading) {
    opacity.value = withSpring(1, { stiffness: 100, damping: 10 });
    }
  }, [loading]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  }, [opacity]);

  return (
    <Animated.View style={[styles.overlay, animatedStyle]}>
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
