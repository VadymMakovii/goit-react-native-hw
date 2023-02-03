import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import DefaultPostsScreen from "../../nestedScreens/DefaultPostsScreen";
import MapScreen from "../../nestedScreens/MapScreen";
import CommentsScreen from "../../nestedScreens/CommentsScreen";


const PostStack = createNativeStackNavigator();

const PostsScreen = ({ navigation }) => {
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
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
      <PostStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
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
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
    </PostStack.Navigator>
  );
};

export default PostsScreen;
