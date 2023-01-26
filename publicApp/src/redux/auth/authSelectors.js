export const selectUser = state => state.auth.userName;
export const selectEmail = state => state.auth.email;
export const selectUid = state => state.auth.uid;
export const selectUserAvatar = state => state.auth.avatar;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectError = state => state.auth.error;