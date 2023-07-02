"use client";
import SubHeader from "@/app/components/headers/sub-header";
import Button from "@/app/components/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CardBg from "@/app/components/custom svg/card-bg";
import { AiOutlineShareAlt, AiOutlinePrinter } from "react-icons/ai";

export default function Receipt() {
  const router = useRouter();

  return (
    <>
      <SubHeader header="Statement" hideRight />
      <div className="mt-[99px] w-1/2">
        <div className=" bg-primary flex justify-between items-center w-full h-[123px]">
          <CardBg height="100%" />
          <div>
            <Image
              src="/img/urban_logo.svg"
              alt="urban logo"
              width={90}
              height={18.5}
              priority
            />
            <p className="text-sm text-white">TRIP RECEIPT</p>
          </div>
          <CardBg height="100%" />
        </div>
        <table className="table-auto border w-full">
          <tbody className="p-4">
            <tr className="">
              <td className="px-4 py-2">Passenger’s Name:</td>
              <td className="px-4 py-2 font-bold">Hassan Tunmise</td>
            </tr>
            <tr className="">
              <td className="px-4 py-2">Departure City:</td>
              <td className="px-4 py-2 font-bold">Sagamu</td>
            </tr>
            <tr className="">
              <td className="px-4 py-2">Departure Time:</td>
              <td className="px-4 py-2 font-bold">08:00 AM</td>
            </tr>
            <tr className="">
              <td className="px-4 py-2">Destination City:</td>
              <td className="px-4 py-2 font-bold">Abuja</td>
            </tr>
            <tr className="">
              <td className="px-4 py-2">Price per seat:</td>
              <td className="px-4 py-2 font-bold">N12,500</td>
            </tr>
            <tr className="">
              <td className="px-4 py-2">Date:</td>
              <td className="px-4 py-2 font-bold">Sept. 10, 2023</td>
            </tr>
            <tr className="">
              <td className="px-4 py-2">Booking Time:</td>
              <td className="px-4 py-2 font-bold">10:00 AM</td>
            </tr>
            <tr className="">
              <td className="px-4 py-2">Seat Number:</td>
              <td className="px-4 py-2 font-bold">Seat 5</td>
            </tr>
          </tbody>
        </table>
        <div className="flex mt-10">
          <Button
            type="submit"
            className="w-full text-white flex items-center justify-center"
            // onClick={() => router.push('/book-ride/payment')}
          >
            Share Receipt <AiOutlineShareAlt size={24} className="ml-2" />
          </Button>
          <Button
            type="submit"
            className="w-full ml-4 flex items-center justify-center"
            style="outline"
          >
            Print Receipt <AiOutlinePrinter size={24} className="ml-2" />
          </Button>
        </div>
      </div>
    </>
  );
}
