import ApiClient from "../../Config/AuthConfig";

const GetUserInfoRequest = async (UserId) => {
  const response = await ApiClient.get(`/user/info/${UserId}`);
  return response.data;
};

export default GetUserInfoRequest;
