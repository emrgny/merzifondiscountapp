import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const registerSlice = createSlice({
  name: "RegisterState",
  initialState,
  reducers: {
    setRegisterState: (state, action) => {
      return action.payload; // Tüm kupon listesini state olarak ata
    },
    clearRegisterState: () => initialState,
  },
});

export const { setRegisterState, clearRegisterState } = registerSlice.actions;
export default registerSlice.reducer;
