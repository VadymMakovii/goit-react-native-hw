import { useEffect, useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import {Feather} from "@expo/vector-icons";
import { PreviewPhoto } from "../../PreviewPhoto/PreviewPhoto";
import { manipulateAsync } from "expo-image-manipulator";
import {ZoomControls} from "../../CameraControllers/ZoomControls";
import { CameraControls } from "../../CameraControllers/CameraControls";
import { useAlert } from "../../../hooks";

const cameraInitialState = {
  zoom: 0,
  flashMode: "auto",
  autoFocus: "on",
  type: "back",
  quality: { value: 0.5, name: "quality-medium" },
};

const CameraScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [isOpenPreviewPhoto, setIsOpenPreviewPhoto] = useState(false);
  const [state, setState] = useState(null);
  const [cameraState, setCameraState] = useState(cameraInitialState);
  const [status, requestLocationPermission] =
    Location.useForegroundPermissions();
  
  useEffect(() => {
    (async () => {
      if (!hasCameraPermission) {
        try {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasCameraPermission(status === "granted");
        } catch (error) {
          useAlert(error.message);
        }
      }
      if (!status) {
        try {
          await requestLocationPermission();
        } catch (error) {
          useAlert(error.message);
        }
      }
    })();
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
    const manipResult = await manipulateAsync(photo.uri, [], {
      compress: cameraState.quality.value,
    });
    setState((prevState) => ({ ...prevState, pictureURL: manipResult.uri }));
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
        <CameraControls state={cameraState} onClick={setCameraState}/>
      </View>
      <Camera
        style={styles.camera}
        flashMode={cameraState?.flashMode}
        autoFocus={cameraState.autoFocus}
        zoom={cameraState.zoom}
        type={cameraState.type}
        whiteBalance="auto"
        ratio="16:9"
        ref={setCamera}
      />
      <View style={styles.footer}>
        <ZoomControls value={cameraState.zoom} setCameraState={setCameraState} />
        <TouchableOpacity style={styles.cameraBtn} onPress={takePhoto}>
          <View style={styles.entryBtn}></View>
        </TouchableOpacity>
      </View>
      {state?.pictureURL && (
        <PreviewPhoto
          data={state.pictureURL}
          onCancel={cancelPhoto}
          onAgree={acceptPhoto}
          visible={isOpenPreviewPhoto}
        />
      )}
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
    top: 0,
    width: "100%",
    height: 100,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    backgroundColor: "#000000",
    paddingBottom: 20,
  },
  footer: {
    bottom: 0,
    left: 0,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 150,
    backgroundColor: "#000000",
  },
  camera: {
    flex: 1,
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
    marginTop: 20,
  },
  entryBtn: {
    backgroundColor: "#FFFFFF",
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});
