import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    isReviewPhoto: false,
  },
  reducers: {
    setIsReviewPhoto: (state, action) => ({...state, isReviewPhoto: action.payload}),
  },
});

export const dashboardReducer = dashboardSlice.reducer;
export const { setIsReviewPhoto } = dashboardSlice.actions;