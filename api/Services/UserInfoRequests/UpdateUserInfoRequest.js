import AsyncStorage from "@react-native-async-storage/async-storage";
import UserInfoApiClient from "../../Config/UserInfoConfig"; // axios instance

const UpdateUserInfoRequest = async (user) => {
  const formData = new FormData();

  if (user.id !== undefined && user.id !== null)
    formData.append("Id", user.id.toString());

  if (user.identityId) formData.append("IdentityId", user.identityId);

  // Burada tarihleri olduğu gibi gönderiyoruz (örnek: "2000-08-15T00:00:00")
  formData.append("BirthDate", user.birthDate || "");
  formData.append("CreateTime", user.createTime || "");

  formData.append("Name", user.name || "");
  formData.append("Surname", user.surname || "");
  formData.append("Email", user.email || "");
  formData.append("Gender", user.gender || "");
  formData.append("PhoneNumber", user.phoneNumber || "");

  if (user.imageUri && !user.imageUri.startsWith("http")) {
    const uriParts = user.imageUri.split(".");
    const fileType = uriParts[uriParts.length - 1];
    formData.append("ImageFile", {
      uri: user.imageUri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
  }

  if (user.imagePath) formData.append("ImagePath", user.imagePath);

  const token = await AsyncStorage.getItem("token");

  const response = await UserInfoApiClient.post(
    "/api/UserInfo/UpdateCompanClientUserProfile",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export default UpdateUserInfoRequest;
