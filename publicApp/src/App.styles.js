import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  topContainer: {
    backgroundColor: "#FFFFFF",
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    position: "relative",
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    position: "absolute",
    top: -60,
    left: 128,
  },
  addButton: {
    width: 25,
    height: 25,
    position: "absolute",
    bottom: 12,
    right: -12,
  },
  bottomContainer: {
    backgroundColor: "#FFFFFF",
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontFamily: "Roboto-Medium",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    color: "#212121",
  },
  form: {
    marginVertical: 24,
  },
  input: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    marginHorizontal: 16,
    height: 50,
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  showPassToogle: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    position: "absolute",
    top: "35%",
    right: 32,
    zIndex: 100,
  },
  button: {
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: 9,
    marginBottom: 16,
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },

  authToogleBox: {
    marginBottom: 78,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  authToogleText: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    marginRight: 10,
  },
  authToogle: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
  },
});

export default styles;
