import AdvertisementApiClient from "../../Config/AdvertisementConfig";

const GetAdvertisementByIDRequest = async (advertisementId) => {
  const response = await AdvertisementApiClient.get(
    `/api/advertisements/GetAdvertisementByIdForClientUser/${advertisementId}`
  );
  return response.data;
};

export default GetAdvertisementByIDRequest;
