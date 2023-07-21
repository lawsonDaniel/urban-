"use client";
import { useState, useEffect } from "react";
import SubHeader from "../components/headers/sub-header";
import QuickAction from "../components/parkowner/quick-button";
import Table from "../components/table";
import { routes } from "@/common/routes";
import Button from "../components/button";
// import { useRouter } from 'next/navigation'
import Link from "next/link";
import { getAll } from "@/common/hooks/fireStore";
import { DocumentSnapshot } from "@firebase/firestore";
import { useUser } from "@/common/hooks/useUser";
import tripOBJs from "@/common/classes/trip.class";

export default function ManageTrips() {
  // const router = useRouter()
  const userData = useUser();

  const [Trip, setTrip] = useState<any[]>([]);
  
  useEffect(() => {
    //getAllTrips
    tripOBJs.getAll().then((res)=>{
      setTrip(res)
    })
  }, []);
 
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
      id: "departureCity",
      header: "Departure City",
    },
    {
      id: "tripCode",
      header: "Booking Code",
    },
    {
      id: "fare",
      header: "Fare",
    },
    {
      id: "typeOfVechicle",
      header: "Vehicle Type",
    },
    {
      id: "bookingStatus",
      header: "Booking Status",
    },
  ];

  return (
    <>
      <SubHeader
        header="Manage Trips"
        hideBack
        inputText="Search Trips"
        allowFilter
      />
      <div className="grid grid-cols-3 gap-x-4 mt-8">
        {routes.TRIPS.map((trip: any, index: any) => (
          <div key={index}>
            <QuickAction
              path={trip.path}
              title={trip.title}
              iconClassName={trip.iconClassName}
              icon={trip.icon}
            />
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Link href="/manage-trips/set-trip">
          <Button
            className="bg-opacity-10 w-[664.85px] text-primary hover:text-white"
            // onClick={() => router.push('/manage-trips/set-trip')}
            type="button"
          >
            Set Trip
          </Button>
        </Link>
      </div>
      <div className="mt-[53px]">
        <Table
          columns={columns}
          data={Trip}
          action={{
            label: "Edit details",
            type: ["edit"],
            editLabel: "Edit Details",
          }}
          type="booking"
        />
      </div>
    </>
  );
}
