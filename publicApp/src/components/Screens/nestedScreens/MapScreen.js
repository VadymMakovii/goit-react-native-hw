import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Feather } from "@expo/vector-icons";

const MapScreen = ({ navigation, route }) => {
  const {coordinate} = route.params;
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
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
      >
        <Marker coordinate={coordinate} />
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  header: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    width: "100%",
    height: 90,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start ",
    backgroundColor: "#21212190",
    paddingBottom: 20,
  },
});
