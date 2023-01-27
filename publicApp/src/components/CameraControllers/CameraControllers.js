import { View, StyleSheet, Text, Pressable } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { useEffect, useState } from "react";

export const ZoomSlider = ({ value, setCameraState }) => {
  const zoomHandler = (value) => {
    setCameraState((prevState) => ({
      ...prevState,
      zoom: Number(value),
    }));
  };
  return (
    <View style={styles.sliderContainer}>
      <Slider
        value={value}
        onValueChange={(value) => {
          zoomHandler(value);
        }}
        minimumValue={0}
        vertical
        maximumValue={1}
        animateTransitions
        trackClickable
        minimumTrackTintColor="#FFFFFF"
        trackStyle={{ backgroundColor: "#BDBDBD30" }}
        thumbStyle={{ backgroundColor: "#FFFFFF" }}
      />
      <View style={styles.currentValueBox}>
        <Text style={{ color: "#FFFFFF" }}>{value.toFixed(1) * 10}</Text>
      </View>
    </View>
  );
};

export const ZoomButtons = ({ setCameraState, value }) => {
  const setCameraZoom = (value) => {
    setCameraState((prevState) => ({
      ...prevState,
      zoom: value / 10,
    }));
  };

  const [activeButton, setActiveButton] = useState("");

  useEffect(() => {
    if (value <= 0.05) {
      setActiveButton("0");
    } else if (value > 0.05 && value < 0.15) {
      setActiveButton("1");
    } else setActiveButton("2");
  }, [value]);

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={
          activeButton === "0"
            ? { ...styles.activeButton }
            : { ...styles.button }
        }
        onPress={() => setCameraZoom(0)}
      >
        <Text
          style={
            activeButton === "0"
              ? { ...styles.activeButtonText }
              : { ...styles.buttonText }
          }
        >
          0
        </Text>
      </Pressable>
      <Pressable
        style={
          activeButton === "1"
            ? { ...styles.activeButton }
            : { ...styles.button }
        }
        onPress={() => setCameraZoom(1)}
      >
        <Text
          style={
            activeButton === "1"
              ? { ...styles.activeButtonText }
              : { ...styles.buttonText }
          }
        >
          1
        </Text>
      </Pressable>
      <Pressable
        style={
          activeButton === "2"
            ? { ...styles.activeButton }
            : { ...styles.button }
        }
        onPress={() => setCameraZoom(2)}
      >
        <Text
          style={
            activeButton === "2"
              ? { ...styles.activeButtonText }
              : { ...styles.buttonText }
          }
        >
          2
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-end",
  },
  sliderContainer: {
    position: "absolute",
    top: "-200%",
    right: "-20%",
    width: 200,
    height: 20,
  },
  currentValueBox: {
    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
    top: "-150%",
    backgroundColor: "#FFFFFF30",
    borderRadius: 50,
  },
  buttonContainer: {
    position: "absolute",
    top: -50,
    width: 120,
    height: 45,
    backgroundColor: "#21212150",
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    borderColor: "#FFFFFF20",
    borderWidth: 1,
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "#21212150",
    alignItems: "center",
    justifyContent: "center",
  },
  activeButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#BDBDBD50",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 18,
    color: "#BDBDBD",
  },
  activeButtonText: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 20,
    color: "#FF6C00",
  },
});
