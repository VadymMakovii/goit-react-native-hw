import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../../firebase/config";
import { setUser, updateUser, logOutUser, setError } from "./authSlice";

export const createUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: login });
      const user = auth.currentUser;
      dispatch(
        setUser({
          email: user.email,
          uid: user.uid,
          userName: user.displayName,
        })
      );
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

export const loginUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      dispatch(
        setUser({
          email: user.email,
          uid: user.uid,
          userName: user.displayName,
        })
      );
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

export const refreshUser = () => async (dispatch) => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        return;
      }
      const { email, uid, displayName } = user;
      dispatch(updateUser({ email, uid, userName: displayName }));
    });
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const logoutUser = () => async (dispatch, getState) => {
  signOut(auth);
  dispatch(logOutUser());
};
