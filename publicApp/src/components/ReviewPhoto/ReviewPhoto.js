import { View, Image, StyleSheet, Modal } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import Loader from "../Loader/ContentLoader";

export const ReviewPhoto = ({ data, onClick, visible}) => {
  const [isLoading, setIsLoading] = useState(false);

  const loaderInit = () => {
    if (!data.url) {
     return
    }
    setIsLoading(true);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setIsModalOpen(!isModalOpen);
      }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Feather
            name="arrow-left"
            size={24}
            color="#FFFFFF"
            style={{ marginHorizontal: 16 }}
            onPress={onClick}
          />
        </View>
        {isLoading && <Loader />}
        <Image
          source={data}
          style={{ flex: 1 }}
          resizeMode={"contain"}
          objectFit={"fill"}
          onLoadStart={loaderInit}
          onLoadEnd={() => setIsLoading(false)}
        />
        <View style={styles.footer}></View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
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
    backgroundColor: "#000000",
    paddingBottom: 20,
  },
  footer: {
    position: "absolute",
    zIndex: 1,
    bottom: 0,
    width: "100%",
    height: 100,
    backgroundColor: "#000000",
  },
});
