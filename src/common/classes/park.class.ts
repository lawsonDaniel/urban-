import api from "../API";
import { SetAllParkData } from "../hooks/token";

class ParkOBJ {
  //create park
  create = async (data: any) => {
    try {
      const response: any = await api.post("park", data);
      return response;
    } catch (err) {
      throw err;
    }
  };
  //get all park
  getAll = async () => {
    try {
      const response: any = await api.get("park");
      if (response?.data?.success) {
        //store response in redux
        return response.data.data;
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      throw err;
    }
  };
  //get one park
  getPark = async (id: string) => {
    try {
      const response: any = await api.get(`park/${id}`);
      if (response?.data?.success) {
        //store response in redux
        return response;
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      throw err;
    }
  };
  //create manager
  parkManager = async (data: any) => {
    try {
      const response: any = await api.post("park/add-manager", data);
      return response;
    } catch (err) {
      throw err;
    }
  };
  
}

const parkOBJ = new ParkOBJ();
export default parkOBJ;
