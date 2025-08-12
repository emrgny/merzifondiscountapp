import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const loginSlice = createSlice({
  name: "LoginState",
  initialState,
  reducers: {
    setLoginState: (state, action) => {
      return action.payload; // Tüm kupon listesini state olarak ata
    },
    clearLoginState: () => initialState,
  },
});

export const { setLoginState, clearLoginState } = loginSlice.actions;
export default loginSlice.reducer;
