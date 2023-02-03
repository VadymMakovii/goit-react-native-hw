import { View, StyleSheet, Text } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export const ZoomSlider = ({ value, setCameraState, onShow, visible }) => {
  const translateY = useSharedValue(8);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, { stiffness: 150, damping: 25 });
      opacity.value = withSpring(1, { stiffness: 150, damping: 25 });
    } else {
      translateY.value = withSpring(8, { stiffness: 150, damping: 25 });
      opacity.value = withSpring(0, { stiffness: 150, damping: 25 });
    }
  }, [visible]);

  const zoomHandler = (value) => {
    setCameraState((prevState) => ({
      ...prevState,
      zoom: Number(value),
    }));
  };

  const renderAboveThumbComponent = () => {
    return (
      <View style={styles.currentValueBox}>
        <Text style={{ color: "#FFFFFF" }}>{value.toFixed(1) * 10}</Text>
      </View>
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  }, [translateY, opacity]);

  return (
    <Animated.View
      style={[styles.sliderContainer, animatedStyle]}
      onTouchMove={() => onShow(true)}
    >
      <Slider
        value={value}
        onValueChange={(value) => {
          zoomHandler(value);
        }}
        minimumValue={0}
        maximumValue={1}
        animateTransitions
        trackClickable
        minimumTrackTintColor="#FFFFFF"
        trackStyle={{ backgroundColor: "#BDBDBD30" }}
        thumbStyle={{ backgroundColor: "#FFFFFF" }}
        renderAboveThumbComponent={renderAboveThumbComponent}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    position: "absolute",
    top: "-90%",
    left: "-40%",
    width: 200,
    height: 10,
  },
});
