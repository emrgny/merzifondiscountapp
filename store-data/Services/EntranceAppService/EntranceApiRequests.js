import GetUserInfo from "../UserService-Slice/UserInfoActions";

const EntranceApiRequests = async (dispatch, userId) => {
  try {
    await dispatch(GetUserInfo(userId));
    return true;
  } catch (error) {
    console.error("EntranceApiRequests hata:", error);
    return false;
  }
};

export default EntranceApiRequests;
