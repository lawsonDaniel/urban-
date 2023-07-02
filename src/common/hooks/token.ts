
import { parseCookies,setCookie,destroyCookie } from "nookies";


// Get the stored authentication token
export const GetStoredAuthToken = () => {
  const cookies = parseCookies();
  const storedUser:any = cookies.userToken ? cookies.userToken : null;
    return storedUser;
  };

  export const StoreAuthToken = (data:string)=>{
    setCookie(null, "userToken", data, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
  }

// Remove the stored authentication token
export const RemoveStoredAuthToken = () => {
    destroyCookie(null, 'userToken', { path: '/' });
};