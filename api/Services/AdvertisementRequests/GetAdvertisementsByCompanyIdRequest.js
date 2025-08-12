import AdvertisementApiClient from "../../Config/AdvertisementConfig";

const GetAdvertisementsByCompanyIdRequest = async (companyId) => {
  const response = await AdvertisementApiClient.get(
    `/api/advertisements/GetAdvertisementsByCompanyIdForClientUser/${companyId}`
  );
  return response.data;
};

export default GetAdvertisementsByCompanyIdRequest;
