import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import DefaultProfileScreen from "../../nestedScreens/DefaultProfileScreen/DefaultProfileScreen";
import MapScreen from "../../nestedScreens/MapScreen";
import CommentsScreen from "../../nestedScreens/CommentsScreen";

const PostStack = createNativeStackNavigator();

const ProfileScreen = ({ navigation }) => {
  return (
    <PostStack.Navigator
      initialRouteName="Default profile"
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <PostStack.Screen
        name="Default profile"
        component={DefaultProfileScreen}
        options={{
          headerBackTitleVisible: false,
          headerShown: false,
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
              onPress={() => navigation.navigate("Default profile")}
            />
          ),
        }}
      />
    </PostStack.Navigator>
  );
};

export default ProfileScreen;
