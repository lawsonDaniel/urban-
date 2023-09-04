import Table from "@/app/components/table";
import React,{useEffect,useState} from "react";
import MainTable from "@/app/components/tables/main.table";

export default function CompletedTrips({ data }: any) {
  const columns = [
    {
      key: "startLocation",
      header: "Departure City",
    },
    {
      key: "time",
      header: "Departure Time",
    },
    {
      key: "endLocation",
      header: "Destination City",
    },
    {
      key: "tripCode",
      header: "Trip Code",
    },
    {
      key: "vehicleType",
      header: "Type Of Vehicle",
    },
  ];
  const [Data,setData] = useState<any[]>([])
  const [trip,setTrip] = useState<any[]>([])
  useEffect(()=>{
  setData(data)
setTrip(data)
},[data])
const Search = (e:any)=>{
  if (e.trim().length >= 1) {
    const searchFilter = Data?.filter((parkfiltername:any) =>
    parkfiltername?.tripCode.toLowerCase().includes(e.toLowerCase())
    );
    console.log(searchFilter,'swae')
    setTrip(searchFilter)
  } else {
    setTrip(Data)
  }
}
  return (
    <>
      <div className="mt-[53px]">
      {/* {
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
        } */}
        <MainTable 
             columns={columns}
             data={trip}
             identifier=""
             searchBy="Booking code"
             handleSearch={(e:any)=> {Search(e)}}
             handleFilter={(e:any)=>{}} 
             apiSearch={()=>{}}
             />
      </div> 
      
    </>
  );
}
