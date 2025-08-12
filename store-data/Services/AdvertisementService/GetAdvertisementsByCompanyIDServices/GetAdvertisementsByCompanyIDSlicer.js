import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const GetAdvertisementByCompanyIDSlicer = createSlice({
  name: "GetAdvertisementByCompanyID",
  initialState,
  reducers: {
    setAdvertisementByCompanyID: (state, action) => {
      return action.payload; // Tüm reklam listesini state olarak ata
    },
    clearAdvertisementByCompanyID: () => [],
  },
});

export const { setAdvertisementByCompanyID, clearAdvertisementByCompanyID } =
  GetAdvertisementByCompanyIDSlicer.actions;
export default GetAdvertisementByCompanyIDSlicer.reducer;
