import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

const LargePhotoScreen = ({ navigation, route }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    setState({...route.params.state});
  }, []);

  const confirmPhoto = () => {
    navigation.navigate("Default create posts", { state });
    setState(null);
  }; 

  return (
    <View style={styles.container}>
      <Image source={{ uri: state?.pictureURL }} style={styles.image} />
      <View style={styles.btnContainer}>
      <TouchableOpacity
        style={styles.cancelBtn}
        onPress={() => navigation.navigate("Camera")}
      >
        <Feather name="delete" size={34} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.agreeBtn}
        onPress={confirmPhoto}
      >
        <Feather name="check" size={34} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LargePhotoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  btnContainer: {
    position: "absolute",
    bottom: 60,
    left: 0,
    width: '100%',
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    height: 60,
  },
  cancelBtn: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF50",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  agreeBtn: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF50",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
