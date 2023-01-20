import {useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "../../router";
import { useDispatch } from "react-redux";
import { refreshUser } from "../../redux/auth/authOperations";
import { useAuth } from "../../hooks";

export const Main = () => {
    const { isLoggedIn } = useAuth();
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(refreshUser())
  }, [dispatch]);

  const roating = useRoute(isLoggedIn);

  return (
    <NavigationContainer>
        {roating}
    </NavigationContainer>
  );
};


