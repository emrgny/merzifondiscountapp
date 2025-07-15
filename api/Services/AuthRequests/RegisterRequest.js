import AuthApiClient from "../../Config/AuthApiClient";

const RegisterRequest = async (userData) => {
  const response = await AuthApiClient.post("/api/account/register", userData);

  return response.data;
};

export default RegisterRequest;
