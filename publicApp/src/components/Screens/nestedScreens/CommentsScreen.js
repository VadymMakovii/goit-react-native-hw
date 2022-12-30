import { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Keyboard,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const CommentsScreen = ({
  route: {
    params: { pictureURL },
  },
}) => {
  const [comments, setComments] = useState([]);
  const [value, setValue] = useState("");

 const formSubmitHandler = () => {
    const date = new Date(Date.now());
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    };
    const comment = {
      content: value,
      commentTime: date.toLocaleString("en-US", options),
      userAvatar: "",
      userId: "",
    };
    setComments((prevstate) => [...prevstate, comment]);
    setValue("");
  };

  const Comment = ({ data }) => {
    const { commentTime, content } = data.item;
    return (
      <View style={styles.commentBox}>
        <View style={styles.contentBox}>
          <Text style={styles.content}>{content}</Text>
          <Text style={styles.commentTime}>{commentTime}</Text>
        </View>
        <Image style={styles.userAvatar} />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Image source={{ uri: pictureURL }} style={styles.image} />
          <View style={{ flex: 1}}>
            <FlatList
              data={comments}
              renderItem={(item) => <Comment data={item}/>}
            keyExtractor={(item, indx) => indx.toString()}
            />
          </View>
          <View style={styles.form }>
            <TextInput
              style={styles.input}
              placeholder="Add comment..."
              multiline
              onChangeText={(value) => setValue(value)}
              value={value}
            />
            <TouchableOpacity style={styles.button} onPress={formSubmitHandler}>
              <Feather name="arrow-up" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    paddingBottom: 32,
    paddingTop: 32,
    flex: 1,
    justifyContent: "flex-end",
  },
  image: {
    height: 240,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    marginHorizontal: 16,
  },

  form: {
    width: 343,
    height: 50,
    marginHorizontal: 16,
    marginBottom: 60,
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

  commentBox: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    marginTop: 24,
    marginHorizontal: 16,
  },
  contentBox: {
    backgroundColor: "#00000008",
    padding: 16,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 6,
    marginHorizontal: 16,
  },
  content: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    marginBottom: 8,
  },
  commentTime: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
  userAvatar: {
    width: 28,
    height: 28,
    borderRadius: 100,
    backgroundColor: "#E8E8E8",
  },
});
