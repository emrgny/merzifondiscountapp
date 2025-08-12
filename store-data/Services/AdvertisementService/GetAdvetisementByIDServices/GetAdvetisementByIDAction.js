import GetAdvertisementByIDRequest from "../../../../api/Services/AdvertisementRequests/GetAdvertisementByIDRequest";
import { setAdvertisementByID } from "./GetAdvetisementByIDSlicer";

const GetAdvertisementByID = (advertisementId) => {
  return async (dispatch) => {
    try {
      const response = await GetAdvertisementByIDRequest(advertisementId);
      dispatch(setAdvertisementByID(response));
    } catch (error) {
      console.error("İlan verisi alınırken hata oluştu:", error);
    }
  };
};

export default GetAdvertisementByID;
