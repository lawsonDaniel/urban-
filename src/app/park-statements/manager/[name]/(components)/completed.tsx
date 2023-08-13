import Table from "@/app/components/table";
import React,{useState,useEffect} from "react";
import tripOBJs from "@/common/classes/trip.class";
import { GetUserType } from "@/common/hooks/token";

export default function Completed({managerInfo}:any) {
  const userType:string = GetUserType()
  const columns = [
    {
      id: "startLocation",
      header: "Departure Park",
    },
    {
      id: "time",
      header: "Departure Time",
    },
    {
      id: "tripCode",
      header: "Trip Code",
    },
    {
      id: "fare",
      header: "Fare",
    },
    {
      id: "typeOfVehicle",
      header: "Type Of Vehicle",
    },
    {
      id: "totalSeats",
      header: "Booking Status",
    },
  ]; const [completed,setCompleted] =useState<any>([])
  useEffect(()=>{
     tripOBJs.filter(userType,'completed').then((res)=>{
      let com = res?.filter((a:any)=> a?.park?.parkManager?.id === managerInfo?.id)
      setCompleted(com)
    })
  },[managerInfo?.id,userType])
  return (
    <>
        <div className="mt-[53px]">
        {
          completed && completed.length >=1 ?  <Table
          columns={columns}
          data={completed}
          action={{ viewLabel: "See Details", type: ["view"] }}
          noAction
        /> : (
            <div className="flex-col gap-7">
              <div className="grid grid-cols-3 mt-[32px] gap-8">
              </div>
              <div className="mt-[10rem] text-center">
                <p className="text-xl capitalize">
                  Sorry, No Trip yet
                </p>
              </div>
            </div>
          )
        }
       
      </div>
    </>
  );
}
