import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import PostsScreen from "../PostsScreen/PostsScreen";
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";

const MainTab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <MainTab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          paddingTop: 9,
          justifyContent: "space-between",
          alignItems: "center",
        },
        tabBarItemStyle: {
          borderRadius: 20,
          maxWidth: 70,
          marginHorizontal: 10,
        },
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarActiveTintColor: "#FFFFFF",
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ size, color }) => (
            <Feather name="grid" size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Create post"
        component={CreatePostsScreen}
        options={{
          tabBarStyle: { display: "none" },
          headerShown: false,
          headerTransparent: false,
          tabBarIcon: ({ size, color }) => (
            <Feather name="plus" size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

export default HomeScreen;
