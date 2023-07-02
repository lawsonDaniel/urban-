import Table from "@/app/components/table";
import React from "react";

export default function CompletedTrips({ data }: any) {
  const columns = [
    {
      id: "departurePark",
      header: "Departure Park",
    },
    {
      id: "departureTime",
      header: "Departure Time",
    },
    {
      id: "destinationCity",
      header: "Destination City",
    },
    {
      id: "tripCode",
      header: "Trip Code",
    },
    {
      id: "vehicleType",
      header: "Type Of Vehicle",
    },
  ];

  return (
    <>
      <div className="mt-[53px]">
        <Table
          columns={columns}
          data={data}
          action={{
            // label: 'View',
            type: ["completed"],
          }}
        />
      </div>
    </>
  );
}
