// 'use client'
import Table from "../table";
import SubHeader from "../headers/sub-header";
import CTA from "./comp/cta";
import DataCard from "./comp/dataCard";
import { useRouter } from "next/navigation";
import { routes } from "@/common/routes";

// const inter = Inter({ subsets: ['latin'] })

export default function DispatchOfficer({ user }: any) {
  const router = useRouter();

  const columns = [
    {
      id: "passengerName",
      header: "Passenger Name",
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
      passengerName: "Ganiu Sonubi",
      bookingCode: "ABJSAG",
      date: "09/09/2023",
      time: "20",
    },
    {
      id: 2,
      passengerName: "Ganiu Sonubi",
      bookingCode: "ABJSAG",
      date: "09/09/2023",
      time: "20",
    },
    {
      id: 3,
      passengerName: "Ganiu Sonubi",
      bookingCode: "ABJSAG",
      date: "09/09/2023",
      time: "20",
    },
    {
      id: 4,
      passengerName: "Ganiu Sonubi",
      bookingCode: "ABJSAG",
      date: "09/09/2023",
      time: "20",
    },
    {
      id: 5,
      passengerName: "Ganiu Sonubi",
      bookingCode: "ABJSAG",
      date: "09/09/2023",
      time: "20",
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
        <Table
          columns={columns}
          data={data}
          action={{ viewLabel: "View Receipt", type: ["view"] }}
          path="/book-ride/payment/receipt"
        />
      </div>
    </div>
  );
}
