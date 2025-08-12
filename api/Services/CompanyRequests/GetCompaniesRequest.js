import CompanyApiClient from "../../Config/CompanyConfig";

const GetCompaniesRequest = async () => {
  const response = await CompanyApiClient.get(
    `/api/companies/GetCompaniesToClientUser`
  );
  return response.data;
};

export default GetCompaniesRequest;
