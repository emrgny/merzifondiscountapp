import CouponApiClient from "../../Config/CouponConfig";

const GetCouponsRequest = async (userId) => {
  const response = await CouponApiClient.get(
    `/api/coupons/GetClientUserCoupons/${userId}`
  );
  return response.data;
};

export default GetCouponsRequest;
