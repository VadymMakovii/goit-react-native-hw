import { useState } from "react";
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";

const ReviewPhotoScreen = ({ route }) => {
  const [isLoading, setIsLoading] = useState(false);

  const photo = route.params.photo;

  return (
    <View style={styles.container}>
      <Image
        source={{ url: photo }}
        style={styles.image}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#FF6C00" />
        </View>
      )}
    </View>
  );
};

export default ReviewPhotoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  image: {
    flex: 1,
  },
  loader: {
    position: "absolute",
    left: "50%",
    top: "50%",
  },
});
