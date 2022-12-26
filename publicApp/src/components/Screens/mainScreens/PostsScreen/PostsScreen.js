import {
  Text,
  View,
} from "react-native";

import styles from "./PostsScreen.styles";

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{color: "tomato"}}>PostsScreen</Text>
    </View>
  );
};

export default PostsScreen;
