"use client";
import { useEffect, useLayoutEffect } from "react";
import { parseCookies } from "nookies";
import ParkOwner from "./components/dashboard/parkOwner";
import ParkManager from "./components/dashboard/parkManager";
import DispatchOfficer from "./components/dashboard/dispatchOfficer";
import { useRouter } from "next/navigation";
export default function Home() {
  const cookies = parseCookies();
  const storedUser = cookies.user ? JSON.parse(cookies.user) : null;
  const userType = storedUser?.userType;
  const router = useRouter();

  console.log("storedUser:::", storedUser,cookies);

  // if (!storedUser) return router.push("/auth/login");

  // useLayoutEffect(()=>{
  //   if (!storedUser) router.push("/auth/login");
  // },[])

  return (
    <div className="">
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
