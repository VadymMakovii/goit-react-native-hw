import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { ref, onValue, push, child, update } from "firebase/database";
import { database } from "../../../../firebase/config";
import { useAuth } from "../../../hooks";
import Loader from "../../Loader/Loader";
import { Comment } from "../../../components/Comment/Comment";

const CommentsScreen = ({ route }) => {
  const [comments, setComments] = useState([]);
  const [value, setValue] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { photo, postId, userId} = route.params;

  const { userName, avatar, uid } = useAuth();

  useEffect(() => {
    getAllComments();
  }, []);

  const keyboardDismiss = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const formSubmitHandler = async () => {
    await createComment();
    keyboardDismiss();
    setValue("");
  };

  const createComment = async () => {
    const date = new Date(Date.now());
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    };
    const postComment = {
      userAvatar: avatar,
      userName: userName,
      userId: uid,
      content: value,
      commentTime: date.toLocaleString("en-US", options),
    };
    const newCommentKey = push(child(ref(database), "comments")).key;
    const updates = {};
    updates["/posts/" + postId + "/comments/" + newCommentKey] = postComment;
    updates[
      "/user-posts/" + userId + "/" + postId + "/comments/" + newCommentKey
    ] = postComment;
    await update(ref(database), updates);
  };

  const getAllComments = async () => {
    const postRef = ref(database, "/posts/" + postId + "/comments/");

    onValue(postRef, (snapshot) => {
      const data = [];
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const value = childSnapshot.val();
        const obj = { commentId: key, ...value };
        data.push(obj);
      });
      setComments(() => [...data]);
    });
  };

  return (
    <View style={styles.inner}>
      <TouchableWithoutFeedback onPress={keyboardDismiss}>
        <View style={styles.imageBox}>
          <Image
            source={{ url: photo }}
            style={styles.image}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
          />
          {isLoading && <Loader />}
        </View>
      </TouchableWithoutFeedback>
      <SafeAreaView style={styles.listContainer}>
        <FlatList
          data={comments}
          renderItem={(item) => <Comment data={item} />}
          keyExtractor={(item) => item.commentId}
        />
      </SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            ...styles.form,
            marginBottom: isShowKeyboard && Platform.OS === "ios" ? 100 : 0,
          }}
        >
          <TextInput
            style={styles.input}
            placeholder="Add comment..."
            multiline
            onChangeText={(value) => setValue(value)}
            value={value}
            onFocus={() => !isShowKeyboard && setIsShowKeyboard(true)}
            onBlur={keyboardDismiss}
          />
          <TouchableOpacity style={styles.button} onPress={formSubmitHandler}>
            <Feather name="arrow-up" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  inner: {
    paddingBottom: 20,
    paddingTop: 20,
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
  },
  imageBox: {
    height: 240,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    marginHorizontal: 16,
    overflow: "hidden",
  },
  image: {
    flex: 1,
  },
  form: {
    width: 343,
    height: 50,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  input: {
    width: 270,
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 16,
  },
  button: {
    width: 34,
    height: 34,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
});
