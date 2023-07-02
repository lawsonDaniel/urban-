import Table from "@/app/components/table";
import { getAll } from "@/common/hooks/fireStore";
import { DocumentSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";

export default function Cancelled() {
  const [cancelRequest, setcancelRequest] = useState<any[]>([]);
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
      id: "date",
      header: "Date",
    },
    {
      id: "time",
      header: "Time",
    },
  ];

  const getAllcancelRequest = async () => {};
  useEffect(() => {
    getAllcancelRequest();
  }, [getAll]);
  console.log(cancelRequest, "request");
  const RequestOption = cancelRequest.map((a: any, i: any) => {
    return {
      id: i,
      providerAgency: a?.data?.selectedPark,
      tandf: a?.data?.fare,
      departureTime: a?.data?.departureTime,
      date: a?.data?.date,
      time: "10:30 AM",
    };
  });

  return (
    <>
      <div className="mt-[53px]">
        <Table
          columns={columns}
          data={RequestOption}
          // action={{ label: 'See Details', type: 'details' }}
          noAction
        />
      </div>
    </>
  );
}
