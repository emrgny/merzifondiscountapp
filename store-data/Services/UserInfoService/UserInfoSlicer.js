import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userInfoSlice = createSlice({
  name: "UserInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      return action.payload; // Tüm kupon listesini state olarak ata
    },
    clearUserInfo: () => initialState,
  },
});

export const { setUserInfo, clearUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
