import { useSelector } from "react-redux";
import {
  selectUser,
  selectEmail,
  selectUid,
  selectStateChange,
  selectIsRefreshing,
  selectIsLoggedIn,
  selectError,
} from "../redux/auth/authSelectors";

export const useAuth = () => {
  return {
    userName: useSelector(selectUser),
    email: useSelector(selectEmail),
    uid: useSelector(selectUid),
    stateChange: useSelector(selectStateChange),
    isLoggedIn: useSelector(selectIsLoggedIn),
    isRefreshing: useSelector(selectIsRefreshing),
    error: useSelector(selectError),
  };
};
