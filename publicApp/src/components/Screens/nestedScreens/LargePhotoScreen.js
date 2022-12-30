import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

const LargePhotoScreen = ({ navigation, route }) => {
  const { pictureURL } = route.params.state;
  const state = route.params.state;

  return (
    <View style={styles.container}>
      <Image source={{ uri: pictureURL }} style={styles.image} />
      <TouchableOpacity
        style={styles.agreeBtn}
        onPress={() => navigation.navigate("Default create posts", { state })}
      >
        <Feather name="check" size={40} color="#FF6C00" />
      </TouchableOpacity>
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
  agreeBtn: {
    position: "absolute",
    bottom: 60,
    left: 155,
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
