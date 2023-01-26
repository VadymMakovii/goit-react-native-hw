import { View, Image, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export const PreviewPhoto = ({ data, onCancel, onAgree, visible }) => {

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Feather
            name="arrow-left"
            size={24}
            color="#FFFFFF"
            style={{ marginHorizontal: 16 }}
            onPress={onCancel}
          />
        </View>
        <Image
          source={{uri: data}}
          style={{ flex: 1 }}
          resizeMode={"contain"}
          objectFit={"fill"}
        />
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={onCancel}
          >
            <Feather name="delete" size={34} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.agreeBtn} onPress={onAgree}>
            <Feather name="check" size={34} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#00000090",
    paddingBottom: 20,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    height: 100,
    backgroundColor: "#00000090",
  },
  cancelBtn: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  agreeBtn: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
