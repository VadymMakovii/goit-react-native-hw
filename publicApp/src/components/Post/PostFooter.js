import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export const PostFooter = ({ navigation, data, nested }) => {

    const commentsAmount = data.item.comments
    ? Object.keys(data.item.comments).length
    : 0;

  const { title, location, photo, coordinate, postId, userId } = data.item;

  return (
    <View style={styles.container}>
      <Text style={{...styles.title, color: nested && "#FFFFFF"}}>{title}</Text>
      <View style={styles.contentBox}>
        <View style={styles.commentsBox}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Comments", { photo, postId, userId })
            }
          >
            <Feather
              name="message-circle"
              size={24}
              style={{...styles.messageIcon, color: nested ? "#FFFFFF" : "#BDBDBD"}}
            />
          </TouchableOpacity>
          <Text style={{...styles.commentsCounter, color: nested ? "#FFFFFF" : "#BDBDBD"}}>{commentsAmount}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Map", { coordinate })}
        >
          <View style={styles.locationBox}>
            <Feather name="map-pin" size={24} style={{...styles.mapIcon, color: nested ? "#FFFFFF" : "#BDBDBD"}} />
            <Text style={{...styles.location, color: nested && "#FFFFFF"}}>{location}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
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
    marginRight: 6,
  },
  commentsCounter: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  locationBox: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    maxWidth: 270,
  },
  mapIcon: {
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
