import api from "../API";

class providerOBJ {
    //get all
    getAll = async () => {
        try {
          const response: any = await api.get("provider");
          console.log(response,'provider api')
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

const providerOBJs = new providerOBJ()
export default providerOBJs