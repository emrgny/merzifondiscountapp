import AuthApiClient from "../../Config/AuthConfig.js";

const ChangePasswordRequest = async (userData) => {
  console.log("ChangePasswordRequest called with data:", userData);
  const response = await AuthApiClient.post(
    "/api/ClientUser/ChangePassword",
    userData
  );
  return response.data;
};

export default ChangePasswordRequest;
