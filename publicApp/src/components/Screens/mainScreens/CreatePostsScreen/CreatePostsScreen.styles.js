import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end"
  },
  camera: {
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: 32,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",

  },
  cameraBtn: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF30", 
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  textCameraBtn: {
    color: "#fff",
  },
  addPhoto: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  addPhotoText: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  preview: {
    position: "absolute",
    top: 20,
    left: 20,
    borderColor: "#fff",
    borderWidth: 1,
  },
  form: {
    marginVertical: 24,
    marginHorizontal: 16,
  },
  input: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    height: 50,
    marginVertical: 8,
  },
  mapIcon: {
    position: "absolute",
    left: 0,
    bottom: 22,
    color: "#BDBDBD",
  },
  button: {
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  footer: {
    width: "100%",
    bottom: 10,
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",

  },
  deleteBtn: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
