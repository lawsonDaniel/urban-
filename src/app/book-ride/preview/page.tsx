"use client";
import SubHeader from "../../components/headers/sub-header";
import Button from "@/app/components/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';

export default function BookRide() {
  const router = useRouter();
  const [TripInfo,setTripInfo] = useState<any>([]);
  useEffect(()=>{
    const searchParams = new URLSearchParams(window.location.search);
  
  // Convert the searchParams to a plain object
  const params:any = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
 console.log(params,'from info');
 setTripInfo(params)
   },[])
  return (
    <>
      <SubHeader header="Preview Booking Info" hideRight />
      <div className="mt-[99px] w-1/2">
       {
        TripInfo &&  <table className="table-auto">
        <tbody>
          <tr className="">
            <td className=" px-4 py-2 ">Passenger’s Name:</td>
            <td className=" px-4 py-2 font-bold">{TripInfo?.passengerName}</td>
          </tr>
          <tr className="">
            <td className=" px-4 py-2 ">Departure City:</td>
            <td className=" px-4 py-2 font-bold">{TripInfo?.endLocation}</td>
          </tr>
          <tr className="">
            <td className=" px-4 py-2 ">Departure Time:</td>
            <td className=" px-4 py-2 font-bold">{TripInfo.time}</td>
          </tr>
          <tr className="">
            <td className=" px-4 py-2 ">Destination City:</td>
            <td className=" px-4 py-2 font-bold">{TripInfo?.DestinationCity}</td>
          </tr>
          <tr className="">
            <td className=" px-4 py-2 ">Price per seat:</td>
            <td className=" px-4 py-2 font-bold">₦{TripInfo?.fare}</td>
          </tr>
          <tr className="">
            <td className=" px-4 py-2 ">Date:</td>
            <td className=" px-4 py-2 font-bold">{TripInfo?.travelDate}</td>
          </tr>
          <tr className="">
            <td className=" px-4 py-2 ">Email:</td>
            <td className=" px-4 py-2 font-bold">{TripInfo?.passengerEmail}</td>
          </tr>
        </tbody>
      </table>
       }
        <div className="mt-10">
          <p className="font-bold text-primary">Vehicle Type </p>
          <div className="w-full bg-primary_light mt-4 p-6 flex justify-between rounded-xl">
            <div>
              <p>
                Vehicle Name:<span className="text-primary"> {TripInfo?.vehicleType}</span>
              </p>
              <p>
                Departure Time: <span className="text-primary">{TripInfo?.time}</span>{" "}
              </p>
              <p>
                Available Seats:<span className="text-primary"> {TripInfo?.totalSeats - TripInfo?.bookedSeats}</span>
              </p>
              <p>
                Price per seats:<span className="text-primary"> ₦{TripInfo?.fare}</span>
              </p>
            </div>
            <button className="text-primary bg-white hover:text-primary_dark border border-primary text-xs rounded-full px-6 h-10 py-1">
             {TripInfo?.lugage}
            </button>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <p>Seat Number </p>
          <p>{Number(TripInfo?.bookedSeats) + Number(1) <= Number(TripInfo?.totalSeats) ? Number(TripInfo?.bookedSeats) + Number(1) : Number(TripInfo?.totalSeats) }</p>
        </div>
        <div>
          <Button
            type="submit"
            className="w-full mt-10 text-white"
            onClick={() => {
              const queryParams = new URLSearchParams(TripInfo).toString();
              const url = `/book-ride/manifest?${queryParams}`;
              // Push the data to the other page
              router.push(url);
            }}
          >
            Proceed to Manifest
          </Button>
          <Button type="submit" className="w-full mt-10" style="outline">
            Edit info
          </Button>
        </div>
      </div>
    </>
  );
}
