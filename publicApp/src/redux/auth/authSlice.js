import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userName: null,
    email: null,
    uid: null,
    isLoggedIn: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => ({...state, ...action.payload, isLoggedIn: true}),
    updateUser: (state, action) => ({ ...state, ...action.payload, isLoggedIn: true }),
    logOutUser: () => ({ userName: null, email: null, uid: null, isLoggedIn: false, error: null }),
    setError: (state, action) => ({ ...state, error: action.payload})
  },
});

export const authReducer = authSlice.reducer;
export const { setUser, updateUser, logOutUser, setError} = authSlice.actions;