import GetAdvertisements from "../AdvertisementService/GetAllAdvertisementServices/GetAdvertisementsAction";
import GetCompanies from "../CompanyServices/GetAllCompaniesServices/GetCompaniesAction";
import GetCoupons from "../CouponService/GetAllCouponService/GetCouponsAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import GetUserInfo from "../UserInfoService/UserInfoAction";

const EntranceApiRequests = async (dispatch, userId) => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      console.warn("Token bulunamadı.");
      return false;
    }

    // Token içinden sub değerini al
    const decodedToken = jwtDecode(token);
    const sub = decodedToken.sub;
    console.log("Decoded sub:", sub);

    // API isteklerini sırayla yap
    await dispatch(GetAdvertisements());
    console.log("Advertisement çalıştı:");
    await dispatch(GetCompanies());
    console.log("Company çalıştı:");
    await dispatch(GetUserInfo(sub));
    console.log("UserInfo çalıştı:");
    await dispatch(GetCoupons(sub)); // sub parametresini veriyoruz
    console.log("Coupon çalıştı:");

    return true;
  } catch (error) {
    console.error("EntranceApiRequests hata:", error);
    return false;
  }
};

export default EntranceApiRequests;
