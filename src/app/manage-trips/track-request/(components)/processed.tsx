import Table from "@/app/components/table";
import { getAll } from "@/common/hooks/fireStore";
import { DocumentSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import tripOBJs from "@/common/classes/trip.class";
import { GetUserType } from "@/common/hooks/token";

export default function Processed({inputField}:any) {
  const [processedRequest, setprocessedRequest] = useState<any[]>([]);
  const columns = [
    {
      id: "providerAgency",
      header: "Provider Agency",
    },
    {
      id: "tandf",
      header: "To and FRO",
    },
    {
      id: "departureTime",
      header: "Departure Time",
    },
    {
      id: "status",
      header: "scheduled trips",
    },
    {
      id: "date",
      header: "Date",
    },
    {
      id: "tripCode",
      header: "Trip Code",
    }
  ];
  const userType:string = GetUserType()
  const getAllprocessedRequest = async () => {
    tripOBJs.filter(userType,'completed').then((res)=>{
      let filteredTrips = res;
      if (inputField.trim().length >= 1) {
            const searchFilter:any[] = filteredTrips.filter((trip: any) =>
              trip.tripCode.toLowerCase().includes(inputField.toLowerCase())
            );
            console.log(searchFilter,'filter data')
            setprocessedRequest(searchFilter);
          } else {
            setprocessedRequest(filteredTrips);
          }
     
    })
  };
  useEffect(() => {
    getAllprocessedRequest();
  }, [getAll,inputField]);
  console.log(processedRequest, "request");
  const RequestOption = processedRequest.map((a: any, i: any) => {
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
      {
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
      }
       
      </div>
    </>
  );
}
