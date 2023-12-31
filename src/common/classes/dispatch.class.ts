import api from "../API";

class dispatchOBJ {
     //get all driver
  getAll = async (pageNu?:Number) => {
    let response:any
    try {
    if(pageNu){
      response = await api.get(`dispatch-officer?page=${pageNu}`);
    }else{
      response = await api.get(`dispatch-officer`);
    }
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

  //get all driver
  getAllCreated = async (pageNu?:Number) => {
    let response:any
    try {
    if(pageNu){
      response = await api.get(`dispatch-officer/created`);
    }else{
      response = await api.get(`dispatch-officer/created`);
    }

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
   //get one driver
  getOne = async (id: string) => {
    try {
      const response: any = await api.get(`dispatch-officer/${id}`);
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

  //get one driver
  getdriver = async (id: string) => {
    try {
      const response: any = await api.get(`driver/${id}`);
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
}

const dispatch = new dispatchOBJ()
export default dispatch