import { View } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

export const CameraControls = ({ state, onClick }) => {
  const setCameraFlashMode = () => {
    let mode = "";
    switch (state.flashMode) {
      case "auto":
        mode = "off";
        break;
      case "off":
        mode = "on";
        break;
      default:
        mode = "auto";
    }
    onClick((prevState) => ({
      ...prevState,
      flashMode: mode,
    }));
  };

  const setCameraType = () => {
    onClick((prevState) => ({
      ...prevState,
      type: state.type === "front" ? "back" : "front",
    }));
  };

  const setPictureQuality = () => {
    let quality = null;
    let iconName = "";
    switch (state.quality.value) {
      case 0:
        quality = 0.5;
        iconName = "quality-medium";
        break;
      case 0.5:
        quality = 1;
        iconName = "quality-high";
        break;
      default:
        quality = 0;
        iconName = "quality-low";
    }
    onClick((prevState) => ({
      ...prevState,
      quality: { value: quality, name: iconName },
    }));
  };

  return (
    <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
      <MaterialIcons
        name={`flash-${state?.flashMode}`}
        size={24}
        color="#FFFFFF"
        style={{ marginHorizontal: 20 }}
        onPress={setCameraFlashMode}
      />
      <MaterialIcons
        name="flip-camera-ios"
        size={24}
        color="#FFFFFF"
        style={{ marginHorizontal: 20 }}
        onPress={setCameraType}
      />
      <MaterialCommunityIcons
        name={state.quality.name}
        size={24}
        color="#FFFFFF"
        style={{ marginHorizontal: 20 }}
        onPress={setPictureQuality}
      />
    </View>
  );
};
