import { createslice } from "@reduxjs/toolkit";

const initialState = {
  Id: null,
  Name: "",
  Surname: "",
  Email: "",
  PhoneNumber: "",
  BirthDate: null,
};

const userInfoSlice = createslice({
  name: "UserInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.Id = action.payload.Id;
      state.Name = action.payload.Name;
      state.Surname = action.payload.Surname;
      state.PhoneNumber = action.payload.PhoneNumber;
      state.Email = action.payload.Email;
      state.BirthDate = action.payload.BirthDate;
    },
    clearUserInfo: () => initialState,
  },
});

export const { setUserInfo, clearUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
