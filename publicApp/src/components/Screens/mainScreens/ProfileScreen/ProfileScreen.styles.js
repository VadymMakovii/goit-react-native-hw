import { StatusBar } from "react-native";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-start",
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    position: "relative",
    top: 150,
    flex: 1,
  },
  logoutButton: {
    position: "absolute",
    top: 20,
    right: 16,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    position: "absolute",
    zIndex: 100,
    top: -60,
    left: "33%",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  avatarButton: {
    width: 30,
    height: 30,
    position: "absolute",
    zIndex: 100,
    bottom: 15,
    right: -15,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    borderRightWidth: 0,
  },
  userName: {
    fontFamily: "Roboto-Medium",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    color: "#212121",
  },
  welcomeBox: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 18,
    lineHeight: 30,
    textAlign: "center",
  },
   listContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    marginBottom: 170,
  },
});

export default styles;
