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
import { GetUserType } from "@/common/hooks/token";

export default function ManageTrips() {
  // const router = useRouter()
  const userData = useUser();

  const [Trip, setTrip] = useState<any[]>([]);
  const [inputField,setInputField] = useState<any>('')
  const userType:string = GetUserType()
  useEffect(() => {
    //getAllTrips
    tripOBJs.getAll(userType).then((res)=>{
      console.log(res,'from tripps')
      setTrip(res)
      if (inputField.trim().length >= 1) {
        const searchFilter = res?.filter((trip:any) =>
          trip?.tripCode.toLowerCase().includes(inputField.toLowerCase())
        );
        setTrip(searchFilter)
      } else {
        setTrip(res);
      }
    })
  }, [inputField]);
 
  console.log(GetUserType(),'user type from trip')
  const columns = [
    {
      id: "endLocation",
      header: "Arival City",
    },
    {
      id: "time",
      header: "Departure Time",
    },
    {
      id: "startLocation",
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
      id: "status",
      header: "Booking Status",
    },
  ];
console.log(Trip,'trips  ss')
  return (
    <>
      <SubHeader
        header="Manage Trips"
        hideBack
        inputText="Search Trips"
        allowFilter
        inputField={inputField} 
        setInputField={setInputField}
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
        {
          Trip.length >=1 ?  <Table
          columns={columns}
          data={Trip}
          action={{
            editLabel: "Edit details",
            type: ["edit","view","Request Driver"],
            viewLabel:"Veiw Details",
            label: "Assign Driver",
          }}
          type="booking"
        /> : <div className="mt-[10rem] text-center">
        <p className="text-xl capitalize">
          Sorry, No information yet, Add a Trip to start
        </p>
      </div>
   
        }
        </div>
        
    </>
  );
}
