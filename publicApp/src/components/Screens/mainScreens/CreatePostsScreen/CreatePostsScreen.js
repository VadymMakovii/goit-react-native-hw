import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DefaultCreatePostScreen from "../../nestedScreens/DefaultCreatePostScreen/DefaultCreatePostScreen";
import CameraScreen from "../../nestedScreens/CameraScreen";
import LargePhotoScreen from "../../nestedScreens/LargePhotoScreen";
import { Feather } from "@expo/vector-icons";

const PostStack = createNativeStackNavigator();

const CreatePostsScreen = ({navigation}) => {
  return (
    <PostStack.Navigator initialRouteName="Default create posts" screenOptions={{
      headerTitleAlign: "center"}}>
      <PostStack.Screen
        name="Default create posts"
        component={DefaultCreatePostScreen}
        options={{
          headerShown: false,
        }}
      />
      <PostStack.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          headerLeft: () => (
            <Feather name="arrow-left" size={24} color="#FFFFFF" onPress={() => (navigation.navigate("Default create posts"))}/>
          ),
        title: "",
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerShown: true,}}
      />
      <PostStack.Screen
        name="Large photo"
        component={LargePhotoScreen}
        options={{
          headerLeft: () => (
            <Feather name="arrow-left" size={24} color="#FFFFFF" onPress={() => (navigation.navigate("Camera"))}/>
          ),
        title: "",
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerShown: true,}}
      />
    </PostStack.Navigator>
  );
};

export default CreatePostsScreen;

