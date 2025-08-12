import GetAdvertisementRequest from "../../../../api/Services/AdvertisementRequests/GetAdvertisementRequest";
import { setAdvertisements } from "./GetAdvertisementsSlicer";

const GetAdvertisements = () => async (dispatch) => {
  try {
    const response = await GetAdvertisementRequest();

    dispatch(setAdvertisements(response));
  } catch (error) {
    console.error("Kullanıcı bilgileri alınırken axios hatası geldi:", error); // Log the error
  } finally {
  }
};

export default GetAdvertisements;
