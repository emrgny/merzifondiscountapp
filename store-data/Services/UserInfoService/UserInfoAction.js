import GetUserInfoRequest from "../../../api/Services/UserInfoRequests/GetUserInfoRequest";
import { setUserInfo } from "./UserInfoSlicer";

const GetUserInfo = (UserId) => async (dispatch) => {
  try {
    const response = await GetUserInfoRequest(UserId);

    dispatch(setUserInfo(response));
  } catch (error) {
    console.error("Kullanıcı bilgileri alınırken axios hatası geldi:", error); // Log the error
  } finally {
  }
};

export default GetUserInfo;
