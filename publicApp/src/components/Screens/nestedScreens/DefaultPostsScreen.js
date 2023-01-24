import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Image, Text } from "react-native";
import { Post } from "../../Post/Post";
import { Feather } from "@expo/vector-icons";
import { ref, onValue } from "firebase/database";
import { database } from "../../../../firebase/config";
import { useAuth } from "../../../hooks";
import {UserCard} from "../../UserCard/UserCard";

const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const { userName, avatar, email } = useAuth();
  const getAllPosts = () => {
    const postRef = ref(database, "/posts/");

    onValue(postRef, (snapshot) => {
      const data = [];
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const value = childSnapshot.val();
        const obj = { postId: key, ...value };
        data.push(obj);
      });
      setPosts(() => [...data]);
    });
  };

  return (
    <View style={styles.container}>
      {posts.length < 1 ? (
        <View style={styles.welcomeBox}>
          <View style={styles.userBox}>
            <Image source={{ url: avatar }} style={styles.avatar} />
            <View style={styles.userData}>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userEmail}>{email}</Text>
            </View>
          </View>
          <Text style={styles.title}>
            Create your first post and share it with your friends!!!
          </Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          renderItem={(item) => (<Post data={item} navigation={navigation}><UserCard data={item} /></Post>)}
          keyExtractor={(item) => item.postId}
        />
      )}
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
  welcomeBox: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    justifyContent: "flex-start",
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
    backgroundColor: "#BDBDBD50",
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
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 18,
    lineHeight: 30,
    textAlign: "center",
  },
});
