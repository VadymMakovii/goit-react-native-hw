import { useEffect, useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";
import { Slider } from "@miblanchard/react-native-slider";
import { PreviewPhoto } from "../../PreviewPhoto/PreviewPhoto";

const CameraScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [isOpenPreviewPhoto, setIsOpenPreviewPhoto] = useState(false);
  const [state, setState] = useState(null);
  const [cameraZoom, setCameraZoom] = useState(0);
  const [status, requestLocationPermission] =
    Location.useForegroundPermissions();

  const getPermission = async () => {
    if (!hasCameraPermission) {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
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

  const acceptPhoto = () => {
    if (!state.coordinate) {
      return;
    }
    setIsOpenPreviewPhoto(false);
    navigation.navigate("Default create posts", { state });
    setState(null);
  };

  const cancelPhoto = () => {
    setIsOpenPreviewPhoto(false);
    setState(null);
  };

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setState((prevState) => ({ ...prevState, pictureURL: photo.uri }));
    setIsOpenPreviewPhoto(true);
    const location = await Location.getCurrentPositionAsync();
    const coordinate = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setState((prevState) => ({ ...prevState, coordinate }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather
          name="arrow-left"
          size={24}
          color="#FFFFFF"
          style={{ marginHorizontal: 16 }}
          onPress={() => navigation.goBack()}
        />
      </View>
      <Camera
        style={styles.camera}
        flashMode="auto"
        autoFocus="on"
        focusDepth="0.5"
        type="back"
        zoom={cameraZoom}
        ref={setCamera}
      />
      <View style={styles.footer}>
        <Slider
          value={cameraZoom.toString()}
          step={0.001}
          onValueChange={(value) => setCameraZoom(...value)}
          maximumValue={0.5}
          minimumValue={0}
          animateTransitions={true}
          trackClickable={true}
          minimumTrackTintColor="#FFFFFF"
          trackStyle={{ backgroundColor: "#BDBDBD30", height: 3 }}
          thumbStyle={{ backgroundColor: "#FFFFFF" }}
          containerStyle={{ width: 150, height: 30, marginBottom: 10 }}
        />
        <TouchableOpacity style={styles.cameraBtn} onPress={takePhoto}>
          <View style={styles.entryBtn}></View>
        </TouchableOpacity>
      </View>
      <PreviewPhoto
        data={state?.pictureURL}
        onCancel={cancelPhoto}
        onAgree={acceptPhoto}
        visible={isOpenPreviewPhoto}
      />
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
  header: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    width: "100%",
    height: 100,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start ",
    backgroundColor: "#00000090",
    paddingBottom: 20,
  },
  footer: {
    position: "absolute",
    zIndex: 1,
    bottom: 0,
    left: 0,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 150,
    backgroundColor: "#00000090",
  },
  camera: {
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#F6F6F6",
  },
  cameraBtn: {
    width: 70,
    height: 70,
    backgroundColor: "#FFFFFF30",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  entryBtn: {
    backgroundColor: "#FFFFFF",
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});
