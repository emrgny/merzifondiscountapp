import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const USER_INFO_BASE_URL = "http://77.245.156.129:65";

const UserInfoApiClient = axios.create({
  baseURL: USER_INFO_BASE_URL, // BURADA /api YOK !!!
  timeout: 30000,
});

UserInfoApiClient.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      console.log("Token alındı:", token);
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Token alınırken sorun oluştu", error);
  }
  return config;
});

UserInfoApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.log("İstek zaman aşımına uğradı");
    }
    return Promise.reject(error);
  }
);

export default UserInfoApiClient;
