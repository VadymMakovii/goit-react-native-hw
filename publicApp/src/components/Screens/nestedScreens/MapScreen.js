import {
  View, StyleSheet,
} from "react-native";
import MapView, {Marker} from 'react-native-maps';

const MapScreen = ({ route }) => {
  const coordinate = route.params.coordinate;

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: 0.002,
      longitudeDelta: 0.002,
    }}>
        <Marker coordinate={coordinate}/>
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
    width: '100%',
    height: '100%',
  },
});