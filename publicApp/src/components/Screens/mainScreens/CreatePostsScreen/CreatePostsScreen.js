import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DefaultCreatePostScreen from "../../nestedScreens/DefaultCreatePostScreen/DefaultCreatePostScreen";
import CameraScreen from "../../nestedScreens/CameraScreen";

const PostStack = createNativeStackNavigator();

const CreatePostsScreen = () => {
  return (
    <PostStack.Navigator
      initialRouteName="Default create posts"
    >
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
          headerShown: false,
        }}
      />
    </PostStack.Navigator>
  );
};

export default CreatePostsScreen;
