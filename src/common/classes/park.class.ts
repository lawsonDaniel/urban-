import api from "../API";

class parkOBJ {
  //create park
  create = async (data: any) => {
    try {
      const response = await api.post("park");
    } catch (err) {
      throw err;
    }
  };
}
