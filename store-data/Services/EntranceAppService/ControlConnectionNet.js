import NetInfo from "@react-native-community/netinfo";
import { BackHandler } from "react-native";

const ControlConnectionNet = async () => {
  const netInfo = await NetInfo.fetch();
  if (!netInfo.isConnected) {
    console.log("İnternet yok, uygulama kapatılıyor.");
    BackHandler.exitApp();
    return false;
  }
  return true;
};

export default ControlConnectionNet;
