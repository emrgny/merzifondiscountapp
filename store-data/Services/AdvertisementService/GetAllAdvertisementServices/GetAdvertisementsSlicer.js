import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const getAdvertisementsSlice = createSlice({
  name: "AllAdvertisements",
  initialState,
  reducers: {
    setAdvertisements: (state, action) => {
      return action.payload; // Tüm reklam listesini state olarak ata
    },
    clearAdvertisements: () => [],
  },
});

export const { setAdvertisements, clearAdvertisements } =
  getAdvertisementsSlice.actions;
export default getAdvertisementsSlice.reducer;
