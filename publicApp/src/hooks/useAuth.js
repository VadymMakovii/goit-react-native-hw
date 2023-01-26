import { useSelector } from "react-redux";
import {
  selectUser,
  selectEmail,
  selectUid,
  selectUserAvatar,
  selectIsLoggedIn,
  selectError,
} from "../redux/auth/authSelectors";

export const useAuth = () => {
  return {
    userName: useSelector(selectUser),
    email: useSelector(selectEmail),
    uid: useSelector(selectUid),
    avatar: useSelector(selectUserAvatar),
    isLoggedIn: useSelector(selectIsLoggedIn),
    error: useSelector(selectError),
  };
};
