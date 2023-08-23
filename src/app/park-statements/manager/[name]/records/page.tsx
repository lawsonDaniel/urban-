"use client";
import SubHeader from "@/app/components/headers/sub-header";
import MyTabs from "@/app/components/tabs";
import React from "react";
import Scheduled from "../(components)/scheduled";
import Completed from "../(components)/completed";
import Cancelled from "../(components)/cancelled";
import InfoCard from "@/app/components/dashboard/comp/infoCard";
import CarSideIcon from "@/app/components/custom svg/car-side";
import { HiCheck } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { BiCopy, BiMoney } from "react-icons/bi";
import { useRouter } from "next/router";
import {useEffect,useState} from 'react'
import tripOBJs from "@/common/classes/trip.class";
import { GetUserType } from "@/common/hooks/token";
import { useSelector } from "react-redux";

export default function Records() {
  const [managerInfo,setManagerInfo] = useState<any>("")
  
  const userType:string = useSelector((a:any)=> a?.authUser?.setAuthType)
 useEffect(()=>{
  const searchParams = new URLSearchParams(window.location.search);

// Convert the searchParams to a plain object
const params:any = {};
searchParams.forEach((value, key) => {
  params[key] = value;
});
setManagerInfo(params)

 },[])

  useEffect(()=>{
   


  

},[managerInfo?.id, userType])



  return (
    <>
      <SubHeader header={`${(managerInfo?.firstName || '').charAt(0).toUpperCase() + (managerInfo?.firstName || '').slice(1)} ${(managerInfo?.lastName || '').charAt(0).toUpperCase() + (managerInfo?.lastName || '').slice(1)}`} allowFilter />
      <div className="mt-8">
        <div className="my-[53px] grid grid-cols-4 gap-8">
          <InfoCard
            title="Total Trips Set"
            num={managerInfo?.totalTrip}
            icon={() => <CarSideIcon color="stroke-white" size={"16"} />}
          />
          <InfoCard
            title="Successful Trips"
            num={managerInfo?.successfulTrip}
            icon={() => <HiCheck color="white" />}
          />
          <InfoCard
            title="Cancelled Trips"
            num={managerInfo?.cancelledTrip}
            icon={() => <IoMdClose color="white" />}
          />
          <InfoCard
            title="Scheduled Trips"
            num={managerInfo?.scheduledTrip}
            icon={() => <BiMoney color="white" />}
          />
        </div>
        <MyTabs
          headers={["Scheduled ", "Completed Trips", "Cancelled"]}
          components={[
            <Scheduled key="1" managerInfo={managerInfo}/>,
            <Completed key="2" managerInfo={managerInfo} />,
            <Cancelled key="2" managerInfo={managerInfo}/>,
          ]}
        />
      </div>
    </>
  );
}
