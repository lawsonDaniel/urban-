"use client";
import SubHeader from "../../components/headers/sub-header";
import Button from "@/app/components/button";
import { useRouter } from "next/navigation";

export default function BookRide() {
  const router = useRouter();

  return (
    <>
      <SubHeader header="Preview Booking Info" hideRight />
      <div className="mt-[99px] w-1/2">
        <table className="table-auto">
          <tbody>
            <tr className="">
              <td className=" px-4 py-2 ">Passenger’s Name:</td>
              <td className=" px-4 py-2 font-bold">Hassan Tunmise</td>
            </tr>
            <tr className="">
              <td className=" px-4 py-2 ">Departure City:</td>
              <td className=" px-4 py-2 font-bold">Sagamu</td>
            </tr>
            <tr className="">
              <td className=" px-4 py-2 ">Departure Time:</td>
              <td className=" px-4 py-2 font-bold">08:00 AM</td>
            </tr>
            <tr className="">
              <td className=" px-4 py-2 ">Destination City:</td>
              <td className=" px-4 py-2 font-bold">Abuja</td>
            </tr>
            <tr className="">
              <td className=" px-4 py-2 ">Price per seat:</td>
              <td className=" px-4 py-2 font-bold">N12,500</td>
            </tr>
            <tr className="">
              <td className=" px-4 py-2 ">Date:</td>
              <td className=" px-4 py-2 font-bold">Sept. 10.2023</td>
            </tr>
            <tr className="">
              <td className=" px-4 py-2 ">Email:</td>
              <td className=" px-4 py-2 font-bold">tunmisehassan@gmail.com</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-10">
          <p className="font-bold text-primary">Vehicle Type </p>
          <div className="w-full bg-primary_light mt-4 p-6 flex justify-between rounded-xl">
            <div>
              <p>
                Vehicle Name:<span className="text-primary"> Bus A</span>
              </p>
              <p>
                Departure Time: <span className="text-primary">08:00 AM</span>{" "}
              </p>
              <p>
                Available Seats:<span className="text-primary"> 6</span>
              </p>
              <p>
                Price per seats:<span className="text-primary"> N12,500</span>
              </p>
            </div>
            <button className="text-primary bg-white hover:text-primary_dark border border-primary text-xs rounded-full px-6 h-10 py-1">
              Normal luggage
            </button>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <p>Seat Number </p>
          <p>23</p>
        </div>
        <div>
          <Button
            type="submit"
            className="w-full mt-10 text-white"
            onClick={() => router.push("/book-ride/payment")}
          >
            Proceed to Pay N5,000
          </Button>
          <Button type="submit" className="w-full mt-10" style="outline">
            Edit info
          </Button>
        </div>
      </div>
    </>
  );
}
