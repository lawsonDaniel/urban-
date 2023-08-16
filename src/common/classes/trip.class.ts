import api from "../API";

class tripOBJ {
     //get all trip
  getAll = async (user?:string) => {
    try {
      let response
      if(user){
         response = await api.get(`/trip/${user}`);
      }else{
         response = await api.get(`/trip`);
      }
     
      if (response?.data?.success) {
        return response?.data?.data;
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
  assignVechicle = async (data: any,id:any) => {
    try {
      const response: any = await api.post(`trip/${id}/assign-vehicle`, data);
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
        return response?.data?.data;
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      throw err;
    }
  }; 
 filter = async (user:string,status:string) => {
    try {
      let response
         response = await api.get(`/trip/${user}/filter/${status}`);
      if (response?.data?.success) {
        return response?.data?.data;
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      throw err;
    }
  }; 
  getRecords = async (user:string,startDate:any,  endDate:any,park?:any) => {
   let filterParams:any
    if(park){
    filterParams = {
      startDate:startDate,
      endDate:endDate,
      park:park
    };
   }else{
    filterParams = {
      startDate:startDate,
      endDate:endDate,
    
    };
   }
    
     const queryString = new URLSearchParams(filterParams).toString();
    try {
      let response
         response = await api.get(`/trip/${user}/records?${queryString}`);
      if (response?.data?.success) {
        return response?.data?.data;
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