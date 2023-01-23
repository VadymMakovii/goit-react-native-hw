import { useAuth } from "../../hooks";
import { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";

export const Comment = ({ data }) => {
  const [isOwnComment, setIsOwnComment] = useState(false);
  const { commentTime, content, userId, userAvatar} = data.item;

  const { uid } = useAuth();

  useEffect(() => {
    uid === userId && setIsOwnComment(true);
  }, []);

  return (
    <View
      style={
        isOwnComment
          ? {
              alignSelf: "flex-end",
              flexDirection: "row",
              ...styles.commentBox,
            }
          : {
              alignSelf: "flex-start",
              flexDirection: "row-reverse",
              ...styles.commentBox,
            }
      }
    >
      <View style={isOwnComment ? {...styles.contentBox,  borderTopRightRadius: 0} : {...styles.contentBox, borderTopLeftRadius: 0}}>
        <Text style={styles.content}>{content}</Text>
        <Text style={{ ...styles.commentTime, alignSelf: !isOwnComment && "flex-end"}}>{commentTime}</Text>
      </View>
      <Image source={{ url: userAvatar }} style={styles.userAvatar} />
    </View>
  );
};

const styles = StyleSheet.create({
  commentBox: {
    alignItems: "flex-start",
    marginTop: 24,
    marginHorizontal: 16,
  },
  contentBox: {
    backgroundColor: "#00000008",
    padding: 16,
    borderRadius: 6,
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
