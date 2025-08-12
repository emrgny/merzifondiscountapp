import AuthApiClient from "../../Config/AuthConfig.js";

const RegisterRequest = async (userData) => {
  console.log("RegisterRequest çalıştı");
  const response = await AuthApiClient.post(
    "/api/ClientUser/Register",
    userData
  );
  console.log("RegisterRequest çalıştı", userData);
  return response.data;
};

export default RegisterRequest;
