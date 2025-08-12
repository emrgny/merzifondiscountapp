import AdvertisementApiClient from "../../Config/AdvertisementConfig";

const GetAdvertisementRequest = async () => {
  const response = await AdvertisementApiClient.get(
    `/api/advertisements/AdvertisementListForClientUser`
  );
  return response.data;
};

export default GetAdvertisementRequest;
