import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const getCouponsSlice = createSlice({
  name: "AllCoupons",
  initialState,
  reducers: {
    setCoupons: (state, action) => {
      return action.payload; // Tüm kupon listesini state olarak ata
    },
    clearCoupons: () => [],
  },
});

export const { setCoupons, clearCoupons } = getCouponsSlice.actions;
export default getCouponsSlice.reducer;
