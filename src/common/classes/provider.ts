import api from "../API";

class providerOBJ {
    //get all
    getAll = async () => {
        try {
          const response: any = await api.get("providerRouter");
          console.log(response,'provider api')
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
}

const providerOBJs = new providerOBJ()
export default providerOBJs