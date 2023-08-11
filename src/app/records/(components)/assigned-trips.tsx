import Table from "@/app/components/table";
import React from "react";

export default function AssignedTrips({ data }: any) {
  const columns = [
    {
      id: "startLocation",
      header: "Departure City",
    },
    {
      id: "time",
      header: "Departure Time",
    },
    {
      id: "endLocation",
      header: "Destination City",
    },
    {
      id: "tripCode",
      header: "Trip Code",
    },
    {
      id: "vehicleType",
      header: "Type Of Vehicle",
    },
  ];

  return (
    <>
      <div className="mt-[53px]">
        {
          data && data.length >=1 ?  <Table
          columns={columns}
          data={data}
          action={{
            type: ["view"],
            viewLabel: "View Details",
          }}
          type="companyTrack"
        />:(
            <div className="flex-col gap-7">
              <div className="grid grid-cols-3 mt-[32px] gap-8">
              </div>
              <div className="mt-[10rem] text-center">
                <p className="text-xl capitalize">
                  Sorry, No Trip yet
                </p>
              </div>
            </div>
          )
        }
       
      </div>
    </>
  );
}
