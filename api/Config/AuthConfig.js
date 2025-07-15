import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthApiClient = axios.create({
  baseURL: "https://feb26521cf86.ngrok-free.app/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

AuthApiClient.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Token alınırken sorun oluştu", error);
  }
  return config;
});

AuthApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.log("İstek zaman aşımına uğradı");
    }
    return Promise.reject(error);
  }
);

export default AuthApiClient;
