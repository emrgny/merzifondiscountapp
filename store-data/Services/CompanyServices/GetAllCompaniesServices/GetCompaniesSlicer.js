import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const getCompaniesSlice = createSlice({
  name: "AllCompanies",
  initialState,
  reducers: {
    setCompanies: (state, action) => {
      return action.payload; // Tüm şirket listesini state olarak ata
    },
    clearCompanies: () => [],
  },
});

export const { setCompanies, clearCompanies } = getCompaniesSlice.actions;
export default getCompaniesSlice.reducer;
