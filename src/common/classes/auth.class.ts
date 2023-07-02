import api from "../API";
import {
  StoreAuthToken,
  SetUserType,
  SetUserData,
  RemoveAllToken,
} from "../hooks/token";

class AUTH {
  //login
  login = async (data: any) => {
    try {
      const response: any = await api.post("auth/login", data);
      //store jwt
      StoreAuthToken(response?.data?.data?.token);
      SetUserType(data?.userType);
      return response;
    } catch (err) {
      throw err;
    }
  };

  //register
  register = async (data: any, user: String) => {
    try {
      const response: any = await api.post(`auth/register/${user}`, data);
      //store jwt
      if (data?.userType) {
        SetUserType(data?.userType);
      } else {
        SetUserType("parkOwner");
      }
      StoreAuthToken(response?.data?.data?.token);
      return response;
    } catch (err) {
      throw err;
    }
  };

  //set currently user
  currentUser = async () => {
    try {
      const response: any = await api.get("auth/me");
      if (response?.data?.success) {
        SetUserData(JSON.stringify(response?.data?.data));
      }
      console.log(response?.data, "from currently stored user");
    } catch (err) {}
  };

  logOut = () => {
    RemoveAllToken();
  };
}

const authOBJ = new AUTH();
export default authOBJ;
