import api from '../API'

class managerOBJ {
     getAll = async (pageNu?:any) => {
        try {
          let response: any
          if(pageNu){
             response = await api.get(`manager?page=${pageNu}`);
          }else{
            response = await api.get(`manager`);
          }
        
          if (response?.data?.success) {
            //store response in redux
            return response?.data?.data;
          } else {
            throw new Error("something went wrong");
          }
        } catch (err) {
          throw err;
        }
      };
}

const manager = new managerOBJ()
export default manager