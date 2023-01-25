import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

const CameraScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [status, requestLocationPermission] =
    Location.useForegroundPermissions();
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  const getPermission = async () => {
    if (!hasCameraPermission) {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        console.log("status camera", status);
        setHasCameraPermission(status === "granted");
      } catch (error) {
        console.log("error", error);
      }
    }
    if (!status) {
      requestLocationPermission();
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
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
      <Camera
        style={styles.camera}
        flashMode="auto"
        autoFocus="on"
        focusDepth="0.5"
        type="back"
        ref={setCamera}
      >
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
    backgroundColor: "#FFFFFF",
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
