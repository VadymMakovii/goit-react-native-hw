import { View, StyleSheet, Text, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { ZoomSlider } from "./ZoomSlider";

export const ZoomControls = ({ setCameraState, value }) => {
  const [isShowZoomSlider, setIsShowZoomSlider] = useState(false);
  const [activeButton, setActiveButton] = useState("");

  const onSliderBlur = () => {
    setTimeout(() => setIsShowZoomSlider(false), 1500);
  };

  const setCameraZoom = (value) => {
    setCameraState((prevState) => ({
      ...prevState,
      zoom: value / 10,
    }));
  };

  useEffect(() => {
    if (value <= 0.05) {
      setActiveButton("0");
    } else if (value > 0.05 && value < 0.15) {
      setActiveButton("1");
    } else setActiveButton("2");
  }, [value]);

  return (
    <View style={styles.buttonContainer} onTouchEnd={onSliderBlur}>
      <ZoomSlider
        value={value}
        setCameraState={setCameraState}
        onShow={setIsShowZoomSlider}
        visible={isShowZoomSlider}
      />
      <Pressable
        style={
          activeButton === "0"
            ? { ...styles.activeButton }
            : { ...styles.button }
        }
        onPress={() => setCameraZoom(0)}
        onLongPress={() => {
          setIsShowZoomSlider(true);
          setCameraZoom(0);
        }}
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
        onLongPress={() => {
          setIsShowZoomSlider(true);
          setCameraZoom(1);
        }}
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
        onLongPress={() => {
          setIsShowZoomSlider(true);
          setCameraZoom(2);
        }}
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
    justifyContent: "center",
    alignItems: "center",
  },
  currentValueBox: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    left: -10,
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
    justifyContent: "center",
    flexDirection: "row",
    borderColor: "#FFFFFF20",
    borderWidth: 1,
    paddingHorizontal: 4,
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "#21212150",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 2,
  },
  activeButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#BDBDBD50",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 2,
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
