import Table from "@/app/components/table";
import { getAll } from "@/common/hooks/fireStore";
import { DocumentSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";

export default function Processed() {
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
      id: "scheduledTrips",
      header: "scheduled trips",
    },
    {
      id: "date",
      header: "Date",
    },
  ];

  const getAllprocessedRequest = async () => {};
  useEffect(() => {
    getAllprocessedRequest();
  }, [getAll]);
  console.log(processedRequest, "request");
  const RequestOption = processedRequest.map((a: any, i: any) => {
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
          action={{
            label: "See Details",
            type: ["view"],
            viewLabel: "See Details",
          }}
          type="detailsTrack"
        />
      </div>
    </>
  );
}
