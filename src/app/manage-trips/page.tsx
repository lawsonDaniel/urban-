"use client";
import { useState, useEffect } from "react";
import SubHeader from "../components/headers/sub-header";
import QuickAction from "../components/parkowner/quick-button";
import Table from "../components/table";
import { routes } from "@/common/routes";
import { useRouter } from "next/navigation";
import Button from "../components/button";
// import { useRouter } from 'next/navigation'
import Link from "next/link";
import { getAll } from "@/common/hooks/fireStore";
import { DocumentSnapshot } from "@firebase/firestore";
import { useUser } from "@/common/hooks/useUser";
import tripOBJs from "@/common/classes/trip.class";
import { GetUserType } from "@/common/hooks/token";
import {useSelector} from 'react-redux'
import MainTable from "@/app/components/tables/main.table";

export default function ManageTrips() {
  // const router = useRouter()
  const userData = useUser();
  const router = useRouter();
  const [Trip, setTrip] = useState<any[]>([]);
  const [inputField,setInputField] = useState<any>('')
  const [tripData,setTripData] = useState<any[]>([])
  const userType:string = useSelector((a:any)=> a?.authUser?.setAuthType)
  useEffect(() => {
    //getAllTrips
    tripOBJs.getAll(userType).then((res)=>{
      console.log(res,'from tripps')
      setTrip(res)
      setTripData(res)
    })
  }, []);
  //handle search
const SearchManager = (e:any)=>{
  if (e.trim().length >= 1) {
    const searchFilter = tripData?.filter((parkfiltername:any) =>
    parkfiltername?.tripCode.toLowerCase().includes(e.toLowerCase())
    );
    console.log(searchFilter,'swae')
    setTrip(searchFilter)
  } else {
    setTrip(tripData)
  }
}
  console.log(GetUserType(),'user type from trip')
  const columns = [
    {
      key: "endLocation",
      header: "Arival City",
    },
    {
      key: "time",
      header: "Departure Time",
    },
    {
      key: "startLocation",
      header: "Departure City",
    },
    {
      key: "tripCode",
      header: "Booking Code",
    },
    {
      key: "fare",
      header: "Fare",
    },
    
    {
      key: "status",
      header: "Booking Status",
    },
    {
      key: "actions",
      header: "Action",
    },
  ];
  const TripTableContent = Trip.map((a:any)=>{
    return({
      endLocation:a.endLocation,
      time:a.time,
      startLocation:a.startLocation,
      tripCode:a.tripCode,
      fare:`N${a.fare}`,
      status:a.status,
    
    })
    
  })
  const actionObject = [
    {
      label: "Veiw Details",
      function: (row:any) => {
        // Perform edit action using the 'row' data
        console.log("Veiw Statement action clicked for row:", row);
      },
    },
    {
      label: "Edit Details",
      function: (row:any) => {
        // Perform delete action using the 'row' data
        console.log("Edit action clicked for row:", row);
      },
    },
    {
      label: "Request Driver",
      function: (row:any) => {
        // Perform edit action using the 'row' data
        console.log("Veiw Statement action clicked for row:", row);
        let query ={
          tripCode:row.tripCode
        }
        const queryString = new URLSearchParams(query).toString();
        router.push(`/manage-trips/request-driver?${queryString}`)

      },
    },
    {
      label: "Assign Driver",
      function: (row:any) => {
        // Perform edit action using the 'row' data
        console.log("Veiw Statement action clicked for row:", row);
        let query ={
          tripCode:row.tripCode
        }
        const queryString = new URLSearchParams(query).toString();
        router.push(`/manage-trips/assign?${queryString}`)

      },
    },
  ];
console.log(Trip,'trips  ss')
  return (
    <>
      <SubHeader
        header="Manage Trips"
        hideBack
        
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
      //     Trip.length >=1 ?  <Table
      //     columns={columns}
      //     data={Trip}
      //     action={{
      //       editLabel: "Edit details",
      //       type: ["edit","view","Request Driver"],
      //       viewLabel:"Veiw Details",
      //       label: "Assign Driver",
      //     }}
      //     type="booking"
      //   /> : <div className="mt-[10rem] text-center">
      //   <p className="text-xl capitalize">
      //     Sorry, No information yet, Add a Trip to start
      //   </p>
      // </div>
   
        }
         <MainTable 
             columns={columns}
             data={Trip}
             identifier=""
             actionObject={actionObject}
             searchBy="Booking Code"
             handleSearch={(e:any)=> {SearchManager(e)}}
             handleFilter={(e:any)=>{}} 
             apiSearch={()=>{}}
             />
        </div>
        
    </>
  );
}
