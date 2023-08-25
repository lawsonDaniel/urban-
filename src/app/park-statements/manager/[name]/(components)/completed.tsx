import Table from "@/app/components/table";
import React,{useState,useEffect} from "react";
import tripOBJs from "@/common/classes/trip.class";
import { GetUserType } from "@/common/hooks/token";
import { useSelector } from "react-redux";
import MainTable from "@/app/components/tables/main.table";

export default function Completed({managerInfo}:any) {
  const userType:string = useSelector((a:any)=> a?.authUser?.setAuthType)
  const columns = [
    {
      key: "startLocation",
      header: "Departure Park",
    },
    {
      key: "time",
      header: "Departure Time",
    },
    {
      key: "tripCode",
      header: "Trip Code",
    },
    {
      key: "fare",
      header: "Fare",
    },
    {
      key: "typeOfVehicle",
      header: "Type Of Vehicle",
    },
    {
      key: "totalSeats",
      header: "Booking Status",
    },
  ]; 
    const [completed,setCompleted] =useState<any>([])
    const [Data,setData] = useState<any[]>([])
    
  useEffect(()=>{
     tripOBJs.filter(userType,'completed').then((res)=>{
      let com = res?.filter((a:any)=> a?.park?.parkManager?.id === managerInfo?.id)
      setCompleted(com)
      setData(com)
    })
  },[managerInfo?.id,userType])

  const Search = (e:any)=>{
    if (e.trim().length >= 1) {
      const searchFilter = Data?.filter((parkfiltername:any) =>
      parkfiltername?.tripCode.toLowerCase().includes(e.toLowerCase())
      );
      console.log(searchFilter,'swae')
      setCompleted(searchFilter)
    } else {
      setCompleted(Data)
    }
  }

  return (
    <>
        <div className="mt-[53px]">
        {/* {
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
        } */}
       
       <MainTable 
             columns={columns}
             data={completed}
             identifier=""
             searchBy="Booking code"
             handleSearch={(e:any)=> {Search(e)}}
             handleFilter={(e:any)=>{}} 
             apiSearch={()=>{}}
             />

      </div>
    </>
  );
}
