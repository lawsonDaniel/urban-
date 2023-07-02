"use client";
import React from "react";
import SubHeader from "../components/headers/sub-header";
import Table from "../components/table";
import MyTabs from "@/app/components/tabs";
import Completed from "./(comp)/completed";
import OpenTickets from "./(comp)/openTickets";

export default function TripHistory() {
  // const columns = [
  //     {
  //         id: 'name',
  //         header: 'Name',
  //     },
  //     {
  //         id: 'bookingCode',
  //         header: 'Booking Code',
  //     },
  //     {
  //         id: 'date',
  //         header: 'Date',
  //     },
  //     {
  //         id: 'time',
  //         header: 'Time',
  //     },

  // ]

  // const data = [
  //     {
  //         id: 1,
  //         name: 'John Doe',
  //         bookingCode: 'ABJSAG',
  //         date: '09/09/2023',
  //         time: '09:00AM',
  //     },
  //     {
  //         id: 2,
  //         name: 'oshodi Doe',
  //         bookingCode: 'ABJSAG',
  //         date: '09/09/2023',
  //         time: '09:00AM',
  //     },
  // ]
  return (
    <>
      <SubHeader header="Trip History" hideBack allowFilter />
      <div className="mt-[53px]">
        <MyTabs
          headers={["Open tickets ", "Completed"]}
          components={[<Completed key="1" />, <OpenTickets key="2" />]}
        />
        {/* <Table
                    columns={columns}
                    data={data}
                    action={{ label: 'Download Receipt', type: ['download'] }}
                // type='booking'
                /> */}
      </div>
    </>
  );
}
