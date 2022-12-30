import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Post } from "../../Post/Post";
import { Feather } from "@expo/vector-icons";

const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevstate) => [...prevstate, route.params.state]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={(item) => <Post data={item} navigation={navigation} />}
        keyExtractor={(item, indx) => indx.toString()}
      />
      <View style={styles.footer}>
        <View style={styles.item}>
          <Feather
            name="grid"
            size={25}
            color="#21212180"
            onPress={() => navigation.navigate("Posts")}
          />
        </View>
        <View style={styles.accentItem}>
          <Feather
            name="plus"
            size={25}
            color="#FFFFFF"
            onPress={() => navigation.navigate("Create post")}
          />
        </View>
        <View style={styles.item}>
          <Feather
            name="user"
            size={25}
            color="#21212180"
            onPress={() => navigation.navigate("Profile")}
          />
        </View>
      </View>
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  footer: {
    bottom: 0,
    width: "100%",
    height: 80,
    borderTopWidth: 1,
    borderTopColor: "#BDBDBD50",
    justifyContent: "space-around",
    alignItems: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 52,
    paddingTop: 9,
  },
  item: {
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  accentItem: {
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
