import { combineReducers } from "@reduxjs/toolkit";
import UserInfoSlicer from "../Services/UserInfoService/UserInfoSlicer";

const RootReducer = combineReducers({
  UserInfo: UserInfoSlicer,
});

export default RootReducer;
