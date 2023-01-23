import { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useAuth } from "../../../../hooks";
import { Feather } from "@expo/vector-icons";
import { OwnPost } from "../../../OwnPost/OwnPost";
import { ref, onValue } from "firebase/database";
import { database } from "../../../../../firebase/config";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../redux/auth/authOperations";
import styles from "./ProfileScreen.styles";

const ProfileScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllPosts();
  }, []);

  const { userName, avatar, uid } = useAuth();

  const handleLogOut = () => {
    dispatch(logoutUser());
  };

  const getAllPosts = () => {
    const postRef = ref(database, "/user-posts/" + uid);

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
    <ImageBackground
      style={styles.bgImage}
      source={require("../../../../../assets/images/BG.jpg")}
    >
      <View style={styles.container}>
        <View style={styles.avatarPlaceholder}>
          {avatar && <Image source={{ uri: avatar }} style={styles.avatar} />}
          <TouchableOpacity style={styles.avatarButton}>
            <Feather name="x-circle" size={30} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
        <Feather
          name="log-out"
          size={24}
          color="#BDBDBD"
          style={styles.logoutButton}
          onPress={handleLogOut}
        />
        <View style={{ marginTop: 90 }}>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <SafeAreaView style={styles.listContainer}>
          {posts.length < 1 && (
            <View style={styles.welcomeBox}>
              <Text style={styles.title}>
                Please share your first post. After that, all your posts will be
                displayed on this page.
              </Text>
            </View>
          )}
          <FlatList
            data={posts}
            renderItem={(item) => (
              <OwnPost data={item} navigation={navigation} route={route} />
            )}
            keyExtractor={(item) => item.postId}
          />
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

export default ProfileScreen;
