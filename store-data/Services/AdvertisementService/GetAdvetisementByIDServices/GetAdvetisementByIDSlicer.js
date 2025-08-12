import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const GetAdvertisementByIDSlicer = createSlice({
  name: "GetAdvertisementByID",
  initialState,
  reducers: {
    setAdvertisementByID: (state, action) => {
      return action.payload; // Tüm reklam listesini state olarak ata
    },
    clearAdvertisementByID: () => [],
  },
});

export const { setAdvertisementByID, clearAdvertisementByID } =
  GetAdvertisementByIDSlicer.actions;
export default GetAdvertisementByIDSlicer.reducer;
