import AuthApiClient from "../../Config/AuthConfig";
import qs from "qs";

const LoginRequest = async (email, password) => {
  console.log("LoginRequest çalıştı", email, password);
  const data = qs.stringify({
    username: email,
    password: password,
    grant_type: "password",
    client_id: "AdvertisementClientUserId",
    client_secret: "clientusersecret",
    scope:
      "openid email profile roles offline_access AdvertisementFullPermission CompanyFullPermission CouponFullPermission UserInfoFullPermission",
  });

  const response = await AuthApiClient.post("/connect/token", data, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return response.data;
};

export default LoginRequest;
