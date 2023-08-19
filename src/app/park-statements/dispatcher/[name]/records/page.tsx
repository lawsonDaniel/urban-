"use client";
import SubHeader from "@/app/components/headers/sub-header";
import MyTabs from "@/app/components/tabs";
import React,{useState,useEffect} from "react";
import Table from "@/app/components/table";

export default function Records() {
   const [managerInfo,setManagerInfo] = useState<any>("")
    useEffect(()=>{
  const searchParams = new URLSearchParams(window.location.search);

// Convert the searchParams to a plain object
const params:any = {};
searchParams.forEach((value, key) => {
  params[key] = value;
});
setManagerInfo(params)

 },[])
 console.log(managerInfo,'manager info ')
  const columns = [
    {
      id: "passegerName",
      header: "Passenger Name",
    },
    {
      id: "tripCode",
      header: "Trip Code",
    },
    {
      id: "date",
      header: "Date",
    },
    {
      id: "time",
      header: "Time",
    },
  ];

  const data = [
    {
      id: 1,
      passegerName: "Isale Oko Sagamu",
      tripCode: "ABJSAG",
      date: "09/09/2023",
      time: "09:00AM",
    },
    {
      id: 2,
      passegerName: "Isale Oko Sagamu",
      tripCode: "ABJSAG",
      date: "09/09/2023",
      time: "09:00AM",
    },
    {
      id: 3,
      passegerName: "Isale Oko Sagamu",
      tripCode: "ABJSAG",
      date: "09/09/2023",
      time: "09:00AM",
    },
  ];
  return (
    <>
      <SubHeader header={`${(managerInfo?.fullName || '').charAt(0).toUpperCase() + (managerInfo?.fullName || '').slice(1)} ${(managerInfo?.lastName || '').charAt(0).toUpperCase() + (managerInfo?.lastName || '').slice(1)}`} allowFilter />
      <div className="mt-[53px]">
        <Table
          columns={columns}
          data={data}
          action={{ viewLabel: "View Reciept", type: ["view"] }}
          path="/park-statements/dispatcher/tade/statement"
        />
      </div>
    </>
  );
}
