import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { useSelector } from "react-redux";
import authOBJ from "../classes/auth.class"

export const useUserInfo = () => {
  const [user, setUser] = useState();

  useEffect(() => {
   authOBJ.currentUser().then((res)=>{
    setUser(res)
   })
  }, []);

  return user;
};
