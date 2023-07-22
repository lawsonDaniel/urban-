import api from "../API";

class tripOBJ {
     //get all trip
  getAll = async () => {
    try {
      const response: any = await api.get("/trip");
      if (response?.data?.success) {
        return response.data.data;
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      throw err;
    }
  }; 
   //create trip
   create = async (data: any) => {
    try {
      const response: any = await api.post("trip", data);
      return response;
    } catch (err) {
      throw err;
    }
  };  
  //assign Vechicle
  assignVechicle = async (data: any) => {
    try {
      const response: any = await api.post(`trip/${data}/assign-vehicle`, data);
      return response;
    } catch (err) {
      throw err;
    }
  };  
   //get all trip
   get = async (data:string) => {
    try {
      const response: any = await api.get(`trip/${data}`);
      if (response?.data?.success) {
        return response.data.data;
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      throw err;
    }
  }; 
}
const tripOBJs = new tripOBJ()
export default tripOBJs