import Table from "@/app/components/table";
import React from "react";

export default function Completed() {
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
      id: "bookingStatus",
      header: "Booking Status",
    },
  ];

  const data = [
    {
      id: 1,
      departurePark: "Isale Oko Sagamu",
      departureTime: "09:00 AM",
      destinationCity: "Abuja",
      tripCode: "ABJSAG",
      fare: "N12,000",
      typeOfVehicle: "Bus",
      bookingStatus: "2 seats left",
    },
    {
      id: 2,
      departurePark: "Isale Oko Sagamu",
      departureTime: "09:00 AM",
      destinationCity: "Abuja",
      tripCode: "ABJSAG",
      fare: "N12,000",
      typeOfVehicle: "Bus",
      bookingStatus: "fully booked",
    },
    {
      id: 3,
      departurePark: "Isale Oko Sagamu",
      departureTime: "09:00 AM",
      destinationCity: "Abuja",
      tripCode: "ABJSAG",
      fare: "N12,000",
      typeOfVehicle: "Bus",
      bookingStatus: "2 seats left",
    },
  ];
  return (
    <>
      <div className="mt-[53px]">
        <Table
          columns={columns}
          data={data}
          action={{ viewLabel: "See Details", type: ["view"] }}
          noAction
        />
      </div>
    </>
  );
}
