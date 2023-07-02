import Table from "@/app/components/table";
import React from "react";

export default function OpenTickets() {
  const columns = [
    {
      id: "name",
      header: "Name",
    },
    {
      id: "bookingCode",
      header: "Booking Code",
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
      name: "John Doe",
      bookingCode: "ABJSAG",
      date: "09/09/2023",
      time: "09:00AM",
    },
    {
      id: 2,
      name: "oshodi Doe",
      bookingCode: "ABJSAG",
      date: "09/09/2023",
      time: "09:00AM",
    },
  ];
  return (
    <>
      <div className="mt-[53px]">
        <Table
          columns={columns}
          data={data}
          action={{ editLabel: "Update Booking", type: ["edit"] }}
        />
      </div>
    </>
  );
}
