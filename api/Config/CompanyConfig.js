import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const COMPANY_BASE_URL = "http://77.245.156.129:55";

const CompanyApiClient = axios.create({
  baseURL: COMPANY_BASE_URL, // BURADA /api YOK !!!
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

CompanyApiClient.interceptors.request.use(async (config) => {
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

CompanyApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.log("İstek zaman aşımına uğradı");
    }
    return Promise.reject(error);
  }
);

export default CompanyApiClient;
