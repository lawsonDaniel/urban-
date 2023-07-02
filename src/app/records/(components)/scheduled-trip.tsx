import Table from "@/app/components/table";
import React from "react";

export default function ScheduledTrips({ data }: any) {
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
      id: "fare",
      header: "Fare",
    },
    {
      id: "vehicleType",
      header: "Type Of Vehicle",
    },
    {
      id: "status",
      header: "Booking Status",
    },
  ];

  return (
    <>
      <div className="mt-10">
        <Table
          columns={columns}
          data={data}
          action={{
            // label: 'Edit',
            type: ["edit"],
            editLabel: "Edit Details",
          }}
        />
      </div>
    </>
  );
}
