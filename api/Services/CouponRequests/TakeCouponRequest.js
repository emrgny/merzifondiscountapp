import CouponApiClient from "../../Config/CouponConfig";

const TakeCouponRequest = async (coupon) => {
  console.log("TakeCouponRequest coupon:", coupon);
  const response = await CouponApiClient.post(
    `/api/coupons/TakeCouponForClientUser`,
    coupon
  );
  return response.data;
};

export default TakeCouponRequest;
