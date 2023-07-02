// 'use client'

import { routes } from "@/common/routes";
import SubHeader from "../components/headers/sub-header";
import Table from "../components/table";

// const inter = Inter({ subsets: ['latin'] })

export default function CustomerBooking() {
  const columns = [
    {
      id: "name",
      header: "Name",
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
    {
      id: "status",
      header: "Status",
    },
  ];

  const data = [
    {
      id: 1,
      name: "Ganiu Sonubi",
      bookingCode: "ABJSAG",
      date: "09/09/2023",
      time: "20",
      status: "Completed",
    },
  ];

  return (
    <div className="">
      {/* <div className='p-14 min-h-full mt-10 rounded-xl bg-white'> */}
      <SubHeader
        header="Check Customer Booking"
        vertical
        inputContainerStyle="mt-10"
        inputStyle="w-[711px]"
        inputText="2334467464FA"
        showButton
        buttonText="Fetch"
      />
      <div className="mt-[53px]">
        <Table
          columns={columns}
          data={data}
          action={{ viewLabel: "View Receipt", type: ["view"] }}
        />
      </div>
    </div>
  );
}
