import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { useState } from "react";


const CameraScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [status, requestLocationPermission] =
    Location.useForegroundPermissions();

  const takePhoto = async () => {
    await requestPermission();
    if (!permission.granted) {
      throw new Error("Need camera permission");
    }
    const photo = await camera.takePictureAsync();
    await requestLocationPermission();
    if (!status.granted) {
      throw new Error("Need location permission");
    }
    const location = await Location.getCurrentPositionAsync();
    const coordinate = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    const state = {
      pictureURL: photo.uri,
      coordinate,
    };
    navigation.navigate("Large photo", { state });
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera} onCameraReady={() => {}}>
        <TouchableOpacity style={styles.cameraBtn} onPress={takePhoto}>
          <View style={styles.entryBtn}></View>
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  camera: {
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#F6F6F6",
  },
  cameraBtn: {
    width: 60,
    height: 60,
    marginBottom: 60,
    backgroundColor: "#FFFFFF30",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  entryBtn: {
    backgroundColor: "#FFFFFF",
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
