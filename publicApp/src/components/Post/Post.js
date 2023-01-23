import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export const Post = ({ navigation, data }) => {
  const commentsAmount = data.item.comments ? Object.keys(data.item.comments).length : 0;
  const {
    title,
    location,
    photo,
    coordinate,
    postId,
    userId,
    userAvatar,
    userEmail,
    userName,
  } = data.item;
  return (
    <View style={styles.container}>
      <View style={styles.userBox}>
        <Image source={{ url: userAvatar }} style={styles.avatar} />
        <View style={styles.userData}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate("ReviewPhoto", { photo })}
      >
        <Image source={{ url: photo }} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
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
              style={styles.messageIcon}
            />
          </TouchableOpacity>
          <Text style={styles.commentsCounter}>{commentsAmount}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Map", { coordinate })}
        >
          <View style={styles.locationBox}>
            <Feather name="map-pin" size={24} style={styles.mapIcon} />
            <Text style={styles.location}>{location}</Text>
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
    marginTop: 32,
  },
  userBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  userData: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
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
