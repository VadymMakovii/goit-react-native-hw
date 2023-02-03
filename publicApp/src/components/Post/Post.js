import {
  View,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { useState } from "react";
import { ReviewPhoto } from "../ReviewPhoto/ReviewPhoto";
import { PostFooter } from "./PostFooter";
import { setIsReviewPhoto } from '../../redux/dashboard/dashboardSlice';
import { useDispatch, useSelector } from "react-redux";
import {selectIsReviewPhoto} from "../../redux/dashboard/dashboardSelectors"; 

export const Post = ({ navigation, data, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const isPreviewActive = useSelector(selectIsReviewPhoto);

  const modalShowHandler = () => {
    dispatch(setIsReviewPhoto(!isPreviewActive));
    setIsModalOpen(!isModalOpen);
  };

  return (
    <View style={styles.container}>
      {children && children}
      <Pressable style={styles.imageBox} onPress={modalShowHandler}>
        <Image source={{ url: data.item.photo }}
            style={styles.image}
            resizeMode={"cover"} />
      </Pressable>
      <ReviewPhoto
            data={data}
            onClick={modalShowHandler}
            visible={isModalOpen}
          />
      <PostFooter navigation={navigation} data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
  },
  imageBox: {
    height: 240,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    marginHorizontal: 16,
    zIndex: 4,
    overflow: "hidden",
  },
  image: {
    flex: 1,

  }
});
