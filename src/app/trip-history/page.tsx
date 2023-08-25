"use client";
import React, { useState } from "react";
import SubHeader from "../components/headers/sub-header";
import Table from "../components/table";
import MyTabs from "@/app/components/tabs";
import Completed from "./(comp)/completed";
import OpenTickets from "./(comp)/openTickets";
import tripOBJs from "@/common/classes/trip.class";
import { GetUserType } from "@/common/hooks/token";
import { useSelector } from "react-redux";

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
  let assignedTrips: any = null;
  let completedTrips: any = null;
  let userData =  useSelector((a:any)=> a?.authUser?.authUser)

  const [trips, setTrips] = useState<any[]>([]);
  tripOBJs
  .getByDispatchMainId(userData.id)
  .then((res: any) => {
    console.log(res, "records of park");
    setTrips(res);
  })
  .catch((err) => {
    console.log(err, "err");
  });

  if (trips && trips.length >= 1) {
    trips.map((a) => {
      if (a.status === "completed") {
        completedTrips = [];
        completedTrips.push(a);
      } else if (a.status !== "completed" && a.status !== "canceled" ) {
        assignedTrips = [];
        assignedTrips.push(a);
      }
    });
  }

  return (
    <>
      <SubHeader header="Trip History" hideBack allowFilter />
      <div className="mt-[53px]">
        <MyTabs
          headers={["Open tickets ", "Completed"]}
          components={[<Completed key="1" data={completedTrips}/>, <OpenTickets key="2" data={assignedTrips}/>]}
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
