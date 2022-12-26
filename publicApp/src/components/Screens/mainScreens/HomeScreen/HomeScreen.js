import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import PostsScreen from "../PostsScreen/PostsScreen";
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";

const MainTab = createBottomTabNavigator();

const HomeScreen = ({navigation}) => {
  return (
    <MainTab.Navigator
      screenOptions={{
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
          headerRight: () => (
            <MaterialIcons name="logout" size={24} color="#BDBDBD" style={{ marginHorizontal: 16 }} onPress={() => (navigation.navigate("Login"))} />
          ),
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="appstore-o" size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Create post"
        component={CreatePostsScreen}
        options={{
          headerLeft: () => (
            <Feather name="arrow-left" size={24} color="#21212180" style={{ marginHorizontal: 16 }} />
          ),
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="plus" size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

export default HomeScreen;
