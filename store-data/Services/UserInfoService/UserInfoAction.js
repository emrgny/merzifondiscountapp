import GetUserInfoRequest from "../../../api/Services/UserInfoRequests/GetUserInfoRequest";

const GetUserInfo = (UserId) => async (dispatch) => {
  try {
    const response = await GetUserInfoRequest(UserId);

    dispatch(
      fetchUserInfo({
        Id: responseid,
        Name: response.name,
        Surname: response.surname,
        Email: response.email,
        PhoneNumber: response.phoneNumber,
        BirthDate: response.birthDate,
      })
    );
  } catch (error) {
    console.error("Kullanıcı bilgileri alınırken axios hatası geldi:", error); // Log the error
  } finally {
  }
};

export default GetUserInfo;
