import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";

export const Post = ({
  navigation,
  data: {
    item: { title, location, pictureURL, coordinate },
  },
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: pictureURL }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.contentBox}>
        <View style={styles.commentsBox}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Comments", { pictureURL })}
          >
            <Feather
              name="message-circle"
              size={24}
              style={styles.messageIcon}
            />
          </TouchableOpacity>
          <Text style={styles.commentsCounter}>0</Text>
        </View>
        <View style={styles.locationBox}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Map", { coordinate })}
          >
            <Feather name="map-pin" size={24} style={styles.mapIcon} />
          </TouchableOpacity>
          <Text style={styles.location}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: 32,
  },
  image: {
    height: 240,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    marginVertical: 8,
  },
  contentBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentsBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginRight: 20,
  },
  messageIcon: {
    color: "#BDBDBD",
    marginRight: 6,
  },
  commentsCounter: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  locationBox: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    maxWidth: 270,
  },
  mapIcon: {
    color: "#BDBDBD",
    marginRight: 4,
  },
  location: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    flexWrap: "wrap",
  },
});
