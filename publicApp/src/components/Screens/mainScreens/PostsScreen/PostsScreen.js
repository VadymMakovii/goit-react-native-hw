import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";

import DefaultPostsScreen from "../../nestedScreens/DefaultPostsScreen";
import MapScreen from "../../nestedScreens/MapScreen";
import CommentsScreen from "../../nestedScreens/CommentsScreen";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../redux/auth/authOperations";

const PostStack = createNativeStackNavigator();

const PostsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logoutUser());
  };

  return (
    <PostStack.Navigator
      initialRouteName="Default posts"
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <PostStack.Screen
        name="Default posts"
        component={DefaultPostsScreen}
        options={{
          title: "Posts",
          headerRight: () => (
            <Feather
              name="log-out"
              size={24}
              color="#BDBDBD"
              style={{ marginHorizontal: 16 }}
              onPress={handleLogOut}
            />
          ),
        }}
      />
      <PostStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerBackTitleVisible: false,
          headerLeft: () => (
            <Feather
              name="arrow-left"
              size={24}
              color="#21212180"
              onPress={() => navigation.navigate("Default posts")}
            />
          ),
        }}
      />
      <PostStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerBackTitleVisible: false,
          headerLeft: () => (
            <Feather
              name="arrow-left"
              size={24}
              color="#21212180"
              onPress={() => navigation.navigate("Default posts")}
            />
          ),
        }}
      />
    </PostStack.Navigator>
  );
};

export default PostsScreen;
