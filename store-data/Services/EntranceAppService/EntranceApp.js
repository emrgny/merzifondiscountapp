import ControlJwtToken from "./ControlJwtToken";
import ControlConnectionNet from "./ControlConnectionNet";
import EntranceApiRequests from "./EntranceApiRequests";

const EnteranceApp = async (dispatch) => {
  try {
    const isConnected = await ControlConnectionNet();
    if (!isConnected) return { success: false };

    const { isValid, decodedToken } = await ControlJwtToken();
    if (!isValid) return { success: false };

    await EntranceApiRequests(dispatch, decodedToken.sub);

    return { success: true };
  } catch (error) {
    console.error("EnteranceApp hatası:", error);
    return { success: false };
  }
};

export default EnteranceApp;
