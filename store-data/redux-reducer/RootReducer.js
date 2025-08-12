import { combineReducers } from "@reduxjs/toolkit";
import UserInfoSlicer from "../Services/UserInfoService/UserInfoSlicer";
import GetAdvertisementsSlicer from "../Services/AdvertisementService/GetAllAdvertisementServices/GetAdvertisementsSlicer";
import GetCompaniesSlicer from "../Services/CompanyServices/GetAllCompaniesServices/GetCompaniesSlicer";
import GetCouponsSlicer from "../Services/CouponService/GetAllCouponService/GetCouponsSlicer";
import GetAdvertisementByIDSlicer from "../Services/AdvertisementService//GetAdvetisementByIDServices/GetAdvetisementByIDSlicer";
import LoginSlicer from "../Services/LoginService/LoginSlicer";
import RegisterSlicer from "../Services/RegisterService/RegisterSlice";
import GetAdvertisementByCompanyIDSlicer from "../Services/AdvertisementService/GetAdvertisementsByCompanyIDServices/GetAdvertisementsByCompanyIDSlicer";
const RootReducer = combineReducers({
  UserInfo: UserInfoSlicer,
  AllAdvertisements: GetAdvertisementsSlicer,
  AllCompanies: GetCompaniesSlicer,
  AllCoupons: GetCouponsSlicer,
  GetAdvertisementByID: GetAdvertisementByIDSlicer,
  LoginStateSlicer: LoginSlicer,
  RegisterStateSlicer: RegisterSlicer,
  GetAdvertisementByCompanyID: GetAdvertisementByCompanyIDSlicer,
});

export default RootReducer;
