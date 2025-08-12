import GetAdvertisementsByCompanyIdRequest from "../../../../api/Services/AdvertisementRequests/GetAdvertisementsByCompanyIdRequest";
import { setAdvertisementByCompanyID } from "./GetAdvertisementsByCompanyIDSlicer";

const GetAdvertisementByCompanyIDAction = (companyId) => {
  return async (dispatch) => {
    try {
      const response = await GetAdvertisementsByCompanyIdRequest(companyId);
      dispatch(setAdvertisementByCompanyID(response));
    } catch (error) {
      console.error("İlan verisi alınırken hata oluştu:", error);
    }
  };
};

export default GetAdvertisementByCompanyIDAction;
