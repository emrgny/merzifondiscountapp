import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const ControlJwtToken = async () => {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    console.log("Token yok");
    return { isValid: false, decodedToken: null };
  }

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  if (decodedToken.exp < currentTime) {
    console.log("Token süresi dolmuş, login sayfasına yönlendiriliyor...");
    await AsyncStorage.removeItem("token");
    return { isValid: false, decodedToken: null };
  }

  return { isValid: true, decodedToken };
};

export default ControlJwtToken;
