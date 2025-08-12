import UserInfoApiClient from "../../Config/UserInfoConfig";

const GetUserInfoRequest = async (UserId) => {
  const response = await UserInfoApiClient.get(
    `/api/UserInfo/GetClientUserProfile/${UserId}`
  );
  return response.data;
};

export default GetUserInfoRequest;
