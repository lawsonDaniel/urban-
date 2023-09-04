"use client";
import { useEffect, useLayoutEffect } from "react";
import { parseCookies } from "nookies";
import ParkOwner from "./components/dashboard/parkOwner";
import ParkManager from "./components/dashboard/parkManager";
import DispatchOfficer from "./components/dashboard/dispatchOfficer";
import { useRouter } from "next/navigation";
import { GetUserType } from "@/common/hooks/token";
import "./dist.css";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useSelector} from 'react-redux'

export default function Home() {
  const cookies = parseCookies();
  const storedUser = cookies.user ? JSON.parse(cookies.user) : null;
  const userType = useSelector((a:any)=> a?.authUser?.setAuthType);
  const router = useRouter();

  console.log("storedUser:::", storedUser, cookies);

  // if (!storedUser) return router.push("/auth/login");

  // useLayoutEffect(()=>{
  //   if (!storedUser) router.push("/auth/login");
  // },[])
   var decoded:any = storedUser && jwt_decode(storedUser?.value)
  const currentTime = Math.floor(Date.now() / 1000);
  if( decoded?.exp < currentTime){
    toast.info('Session expired. Redirecting to login page.');

  }
  return (
    <div className="">
      <ToastContainer/>
      {userType === "parkOwner" ? (
        <ParkOwner user={storedUser} />
      ) : userType === "dispatchOfficer" ? (
        <DispatchOfficer user={storedUser} />
      ) : (
        userType === "parkManager" && <ParkManager user={storedUser} />
      )}
    </div>
  );
}
