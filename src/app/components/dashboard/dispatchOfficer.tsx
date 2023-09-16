// 'use client'
import Table from "../table";
import SubHeader from "../headers/sub-header";
import CTA from "./comp/cta";
import DataCard from "./comp/dataCard";
import { useRouter } from "next/navigation";
import { routes } from "@/common/routes";
import authOBJ from "@/common/classes/auth.class";
// const inter = Inter({ subsets: ['latin'] })
import tripOBJs from "@/common/classes/trip.class";
import MainTable from "../tables/main.table";
import { useEffect, useState } from "react";

export default function DispatchOfficer({ user }: any) {
  const [bookingInfo,setBookInfo] = useState<[]>([])
  const router = useRouter();
  useEffect(()=>{
    authOBJ.currentUser().then((res)=>{
      tripOBJs.getBooking(res.id).then((res:any)=>{
        setBookInfo(res)
      })
      })
  },[])

  const bookingData = bookingInfo && bookingInfo.map((a:any)=>{
    console.log(a,'from the booking map function')
    return({
      passengerName:a.passenger.name,
      passengerEmail:a.passenger.email,
      bookingCode:a.bookingCode,
      date:a.TravelDate.split('GMT')[0]
    })
  })

  const columns = [
    {
      key: "passengerName",
      header: "Passenger Name",
    },
    {
      key:"passengerEmail",
      header:"Passenger Email",
    },
    {
      key: "bookingCode",
      header: "Booking Code",
    },
    {
      key: "date",
      header: "Depature Date",
    },
    
  ];

  

  return (
    <div className="">
      {/* <div className='p-14 min-h-full mt-10 rounded-xl bg-white'> */}
      <SubHeader header="Dashboard" hideBack />
      <DataCard title="Total Booking" amount="345,000" percentage="20%" />

      <div className="grid grid-cols-3 gap-3 mt-[32px]">
        <CTA
          text="Book a Ride"
          type="green"
          onClick={() => router.push(routes.dispatchOfficer.book_ride.path)}
        />
        <CTA
          text="Check Customer Booking"
          type="blue"
          onClick={() =>
            router.push(routes.dispatchOfficer.customer_booking.path)
          }
        />
      </div>

      <div className="mt-[53px]">
        {/* <Table
          columns={columns}
          data={data}
          action={{ viewLabel: "View Receipt", type: ["view"] }}
          path="/book-ride/payment/receipt"
        /> */}
        <MainTable 
             columns={columns}
             data={bookingData}
             identifier=""
             searchBy="park name"
             handleSearch={(e:any)=> {}}
             handleFilter={(e:any)=> {}} 
             apiSearch={()=>{}}
             />
      </div>
    </div>
  );
}
