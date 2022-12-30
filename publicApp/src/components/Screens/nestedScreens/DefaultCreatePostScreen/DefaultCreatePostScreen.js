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

import { Feather } from "@expo/vector-icons";
import styles from "./DefaultCreatePostScreen.styles";

const initialState = {
  title: "",
  location: "",
  pictureURL: "",
  coordinate: {},
};

const DefaultCreatePostScreen = ({ navigation, route }) => {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  useEffect(() => {
    if (!route.params) {
      return;
    }
    const { coordinate, pictureURL } = route.params?.state;
    setState((prevState) => ({ ...prevState, pictureURL, coordinate }));
  }, [route.params]);

  const takePhoto = () => {
    navigation.navigate("Camera");
  };

  const sendPost = () => {
    navigation.navigate("Default posts", { state });
  };

  const keyboardDismiss = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const formSubmitHandler = () => {
    sendPost();
    setState(initialState);
  };

  useEffect(() => {
    const keyboardHideHandler = Keyboard.addListener("keyboardDidHide", () =>
      keyboardDismiss()
    );
    return () => {
      keyboardHideHandler.remove();
    };
  }, [isShowKeyboard]);

  return (
    <TouchableWithoutFeedback onPress={keyboardDismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Feather
            name="arrow-left"
            size={24}
            color="#21212180"
            style={{ marginHorizontal: 16 }}
            onPress={() => navigation.navigate("Home", { screen: "Posts" })}
          />
          <Text style={styles.headerTitle}>Create post</Text>
        </View>
        <View style={styles.imageBox}>
          {state.pictureURL && (
            <Image source={{ uri: state.pictureURL }} style={styles.image} />
          )}
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
          <TouchableOpacity style={styles.deleteBtn} onPress={() => setState(initialState)}>
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DefaultCreatePostScreen;
