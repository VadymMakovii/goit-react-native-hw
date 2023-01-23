import { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as db from "firebase/database";
import { Feather } from "@expo/vector-icons";
import styles from "./DefaultCreatePostScreen.styles";
import { storage, database } from "../../../../../firebase/config";
import { nanoid } from "nanoid";
import { useAuth } from "../../../../hooks";

const initialState = {
  title: "",
  location: "",
  coordinate: {},
  pictureURL: "",
};

const DefaultCreatePostScreen = ({ navigation, route }) => {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const { uid, userName, avatar, email } = useAuth();

  useEffect(() => {
    const keyboardHideHandler = Keyboard.addListener("keyboardDidHide", () =>
      keyboardDismiss()
    );
    return () => {
      keyboardHideHandler.remove();
    };
  }, [isShowKeyboard]);

  useEffect(() => {
    if (!route.params) {
      return;
    }
    const { coordinate, pictureURL } = route.params?.state;
    setState((prevState) => ({ ...prevState, coordinate, pictureURL }));
  }, [route.params]);

  const takePhoto = () => {
    navigation.navigate("Camera");
  };

  const sendPost = async () => {
    await uploadPostToServer();
    navigation.navigate("Default posts");
  };

  const formSubmitHandler = () => {
    sendPost();
    setState(initialState);
  };

  const keyboardDismiss = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const uploadPhotoToServer = async () => {
    const uniquePostId = nanoid();
    const imagesRef = ref(storage, `postImages/${uniquePostId}`);
    const response = await fetch(state.pictureURL);
    const file = await response.blob();
    await uploadBytes(imagesRef, file);
    const loadedPhoto = await getDownloadURL(imagesRef);
    return loadedPhoto;
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    const { title, location, coordinate } = state;
    const postData = {
      userName: userName,
      userId: uid,
      userAvatar: avatar,
      userEmail: email,
      title: title,
      location: location,
      coordinate: coordinate,
      photo: photo,
    };

    const newPostKey = db.push(db.child(db.ref(database), "posts")).key;
    const updates = {};
    updates["/posts/" + newPostKey] = postData;
    updates["/user-posts/" + uid + "/" + newPostKey] = postData;
    db.update(db.ref(database), updates);
  };

  const deletePostData = () => {
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardDismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Feather
            name="arrow-left"
            size={24}
            color="#21212180"
            style={{ marginHorizontal: 16 }}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Create post</Text>
        </View>
        <View style={styles.imageBox} >
          {state.pictureURL && <Image source={{ uri: state.pictureURL }} style={styles.image}/>}
          <TouchableOpacity style={styles.cameraBtn} onPress={takePhoto}>
            <Feather name="camera" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>

        <View style={styles.addPhoto}>
          <TouchableOpacity>
            <Text style={styles.addPhotoText}>Add photo</Text>
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Title..."
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, title: value }))
              }
              value={state.title}
              onFocus={() => !isShowKeyboard && setIsShowKeyboard(true)}
            />
            <View>
              <TextInput
                style={{ ...styles.input, paddingLeft: 28 }}
                placeholder="Location..."
                onChangeText={(value) =>
                  setState((prevState) => ({
                    ...prevState,
                    location: value,
                  }))
                }
                value={state.location}
                onFocus={() => !isShowKeyboard && setIsShowKeyboard(true)}
              />
              <Feather name="map-pin" size={24} style={styles.mapIcon} />
            </View>
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => formSubmitHandler()}
        >
          <Text style={styles.buttonText}>publish</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.deleteBtn} onPress={deletePostData}>
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DefaultCreatePostScreen;
