import Table from "@/app/components/table";
import React,{useState,useEffect} from "react";
import MainTable from "@/app/components/tables/main.table";

export default function AssignedTrips({ data }: any) {
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
    },{
      key: "actions",
      header: "Action",
    },
  ];
const [Data,setData] = useState<any[]>([])
const [trip,setTrip] = useState<any[]>([])
const actionObject = [
  {
    label: "Veiw Details",
    function: (row:any) => {
      // Perform edit action using the 'row' data
      console.log("Veiw Statement action clicked for row:", row);
    },
  }

];
const options = [
  { value: "bus", item: "Bus" },
  { value: "sedan", item: "Sedan" },
  { value: "van", item: "Van" },
  { value: "others", item: "Others" },
]
useEffect(()=>{
  setData(data)
setTrip(data)
},[data])
 //handle filter
 const FilterPark = (e:any)=>{

  if(e){
    let filteredParks;
  if(e.item ! == "All"){
    setTrip(Data?.filter((a:any)=> a.vehicleType === e.value))
  }
  }else{
    setTrip(Data)
  }  
}
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
console.log(trip,'trips')
  return (
    <>
      <div className="mt-10">
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
             filterMenu={options}
             handleFilter={(e:any)=>{FilterPark(e)}} 
             actionObject={actionObject}
             handleSearch={(e:any)=> {Search(e)}}
             apiSearch={()=>{}}
             />
      </div>
    </>
  );
}
