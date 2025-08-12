import GetCouponsRequest from "../../../../api/Services/CouponRequests/GetCouponRequest";
import { setCoupons } from "./GetCouponsSlicer";

const GetCoupons = (userId) => async (dispatch) => {
  try {
    const response = await GetCouponsRequest(userId);
    console.log("GetCoupons response:", response);

    dispatch(setCoupons(response));
  } catch (error) {
    console.error("Kullanıcı bilgileri alınırken axios hatası geldi:", error); // Log the error
  } finally {
  }
};

export default GetCoupons;
