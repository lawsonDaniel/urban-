import Table from "@/app/components/table";
import { getAll } from "@/common/hooks/fireStore";
import { DocumentSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import tripOBJs from "@/common/classes/trip.class";
import { GetUserType } from "@/common/hooks/token";
import { useSelector } from "react-redux";
import MainTable from "@/app/components/tables/main.table";


export default function Pending({inputField}:any) {
  const [pendingRequest, setPendingRequest] = useState<any[]>([]);
  const [tripData,setTripData] =useState<any[]>([]);
  
  const columns = [
    {
      key: "providerAgency",
      header: "Provider Agency",
    },
    {
      key: "tandf",
      header: "To and FRO",
    },
    {
      key: "departureTime",
      header: "Departure Time",
    },
    {
      key: "status",
      header: "scheduled trips",
    },
    {
      key: "date",
      header: "Date",
    },
    {
      key: "tripCode",
      header: "Trip Code",
    }
    
  ];
  const userType:string = useSelector((a:any)=> a?.authUser?.setAuthType)
  const getAllPendingRequest = async () => {
    tripOBJs.filter(userType,'in_progress').then((res)=>{
      setPendingRequest(res);
      setTripData(res)
    })
  };
  const Search = (e:any)=>{
    if (e.trim().length >= 1) {
      const searchFilter = tripData?.filter((parkfiltername:any) =>
      parkfiltername?.tripCode.toLowerCase().includes(e.toLowerCase())
      );
      console.log(searchFilter,'swae')
      setPendingRequest(searchFilter)
    } else {
      setPendingRequest(tripData)
    }
  }
  console.log(inputField,'search')
  useEffect(() => {
    getAllPendingRequest();
  }, [getAll]);
  console.log(pendingRequest, "request");
  const RequestOption = pendingRequest.map((a: any, i: any) => {
    return {
      id: i,
      providerAgency: a?.park?.name,
      tandf: a?.fare,
      departureTime: a?.time,
      date: a?.date?.split('T')[0],
      time: a?.time,
      status:a?.status,
      tripCode:a?.tripCode
    };
  });

  return (
    <>
      <div className="mt-[53px]">
      {/* {
        RequestOption.length >=1  ?  <Table
        columns={columns}
        data={RequestOption}
        action={{
          label: "See Details",
          type: ["view"],
          viewLabel: "See Details",
        }}
        type="detailsTrack"
      />: (
          <div className="flex-col gap-7">
            <div className="grid grid-cols-3 mt-[32px] gap-8">
            </div>
            <div className="mt-[10rem] text-center">
              <p className="text-xl capitalize">
                Sorry, No information yet
              </p>
            </div>
          </div>
        )
      } */}
      <MainTable 
             columns={columns}
             data={RequestOption}
             identifier=""
            //  actionObject={}
             searchBy="Booking Code"
             handleSearch={(e:any)=> {Search(e)}}
             handleFilter={(e:any)=>{}} 
             apiSearch={()=>{}}
             />
      </div>
    </>
  );
}
