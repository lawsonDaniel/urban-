import api from "../API";
import axios from "axios";
import { StoreAuthToken,SetUserType } from "../hooks/token";
import { useRouter } from "next/navigation";

class AUTH {
  //login
  login = async (data: any) => {
    try {
      const response: any = await api.post("auth/login", data);
      //store jwt
      StoreAuthToken(response?.data?.data?.token);
      SetUserType(data?.userType)
      return response;
    } catch (err) {
      throw err;
    }
  };

  //register
  register = async (data: any, user: String) => {
    try {
      const response: any = await api.post(`/auth/register/${user}`, data);
      //store jwt
      if(data?.userType){
        SetUserType(data?.userType)
      }else{
        SetUserType('parkOwner')
      }
      StoreAuthToken(response?.data?.data?.token);
      return response;
    } catch (err) {
      throw err;
    }
  };
}

const authOBJ = new AUTH();
export default authOBJ;
