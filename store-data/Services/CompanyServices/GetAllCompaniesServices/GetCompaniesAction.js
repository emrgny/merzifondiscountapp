import GetCompaniesRequest from "../../../../api/Services/CompanyRequests/GetCompaniesRequest";
import { setCompanies } from "./GetCompaniesSlicer";

const GetCompanies = () => async (dispatch) => {
  try {
    const response = await GetCompaniesRequest();
    console.log("GetCompanies response:", response);

    dispatch(setCompanies(response));
  } catch (error) {
    console.error("Kullanıcı bilgileri alınırken axios hatası geldi:", error); // Log the error
  } finally {
  }
};

export default GetCompanies;
