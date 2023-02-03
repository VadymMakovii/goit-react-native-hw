import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text, SafeAreaView } from "react-native";
import { Post } from "../../Post/Post";
import { Feather } from "@expo/vector-icons";
import { ref, onValue } from "firebase/database";
import { database } from "../../../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../redux/auth/authOperations";
import { useAuth } from "../../../hooks";
import { UserCard } from "../../UserCard/UserCard";
import {selectIsReviewPhoto} from "../../../redux/dashboard/dashboardSelectors"; 

const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const isPreviewActive = useSelector(selectIsReviewPhoto);

  useEffect(() => {
    getAllPosts();
  }, []);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logoutUser());
  };

  const { userName, avatar, email } = useAuth();

  const data = {
    item: {
      userAvatar: avatar,
      userEmail: email,
      userName: userName,
    },
  };

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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Posts</Text>
        <Feather
          name="log-out"
          size={24}
          color="#BDBDBD"
          style={{ marginHorizontal: 32 }}
          onPress={handleLogOut}
        />
      </View>
      <View style={styles.mainSection}>
        {posts.length < 1 ? (
          <View style={styles.welcomeBox}>
            <UserCard data={data} />
            <Text style={styles.title}>
              Create your first post and share it with your friends!!!
            </Text>
          </View>
        ) : (
          <FlatList
            data={posts}
            renderItem={(item) => (
              <Post data={item} navigation={navigation}>
                <UserCard data={item} />
              </Post>
            )}
            keyExtractor={(item) => item.postId}
          />
        )}
      </View>
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
    justifyContent: "flex-start",
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 18,
    lineHeight: 30,
    textAlign: "center",
    marginHorizontal: 16,
  },
  header: {
    top: 0,
    width: "100%",
    height: 90,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD30",
    paddingBottom: 11,
  },
  headerTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    color: "#212121",
    marginRight: 80,
  },
  mainSection: {
    flex: 1,
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
