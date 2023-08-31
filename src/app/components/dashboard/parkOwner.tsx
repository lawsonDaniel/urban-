// import styles from './page.module.css'
import Table from "../table";
import React, { useState, useEffect } from "react";
import SubHeader from "../headers/sub-header";
import CTA from "./comp/cta";
import DataCard from "./comp/dataCard";
import { useRouter } from "next/navigation";
import { routes } from "@/common/routes";
import parkOBJ from "@/common/classes/park.class";
import {useSelector} from 'react-redux'
// const inter = Inter({ subsets: ['latin'] })
import MainTable from "../tables/main.table";

export default function ParkOwner({ user }: any) {
  const router = useRouter();
  const userData = useSelector((a:any)=> a?.authUser?.authUser);
  // console.log("getLoginUser:::userData::", userData.uid)

  const [parks, setParks] = useState<any>([]);
  const [parkData,setParkData] = useState<any>([])
  const [mainParks, setMainParks] = useState<any>([]);
  const [paginaton,setPagination] = useState(1)
  const [pageLength,setPageLength] = useState<any>(0)

  

  const columns = [
    {
      key: "name",
      header: "Park Name",
    },
    {
      key: "totalTrip",
      header: "total trips",
    },
    {
      key: "successfulTrip",
      header: "successful trips",
    },
    {
      key: "scheduledTrip",
      header: "scheduled trips",
    },
    {
      key: "cancelledTrip",
      header: "cancelled trips",
    },
    {
      key: "actions",
      header: "Action",
    }
  ];
  const actionObject = [
    {
      label: "Veiw Statement",
      function: (row:any) => {
        const query = new URLSearchParams({
          id:row.id
        }).toString();
        router.push(`/park-statements/manager?${query}`)
        console.log("Veiw Statement action ", row);
      },
    },
    {
      label: "Edit",
      function: (row:any) => {
        // Perform delete action using the 'row' data
       
       
        console.log("Edit action clicked for row:", row);
      },
    },
  ];
  const options =
    mainParks &&
    mainParks?.parks?.map((park: { id: any; name: any; }) => {
      return {
        value: park.id,
        item: park.name,
      };
    });


  const [selectedOption, setSelectedOption] = useState<any>();
  const getAllParks = async () => {
    try {
      const res = await parkOBJ.getAllByUser();
      console.log(res,'parks')
      setParks(res?.parks);
      setParkData(res?.parks)
      setPageLength(res?.totalPages)
      setMainParks(res);
     
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (userData) {
      getAllParks();
    }
  }, [ userData,paginaton,selectedOption]);
  //handle filter
  const FilterPark = (e:any)=>{
    console.log('data from filter',parkData,e.value,parkData?.filter((a:any)=> a.id === e.value))
    if(e){
      let filteredParks;
    if(e.item ! == "All"){
      setParks(parkData?.filter((a:any)=> a.id === e.value))
    }
    }else{
      setParks(parkData)
    }  
  }
//handle search
const SearchPark = (e:any)=>{
  if (e.trim().length >= 1) {
    const searchFilter = parkData?.filter((parkfiltername:any) =>
    parkfiltername?.name.toLowerCase().includes(e.toLowerCase())
    );
    console.log(searchFilter,'swae')
   setParks(searchFilter)
  } else {
   setParks(parkData)
  }
}


  return (
    <div className="">
      {/* <div className='p-14 min-h-full mt-10 rounded-xl bg-white'> */}
      <SubHeader
        header="Dashboard"
        hideBack
        
      />
      <DataCard title="Total Income" amount="N345,000" percentage="10%" />

      <div className="grid grid-cols-3 gap-3 mt-[32px]">
        <CTA
          text="Add Park"
          type="green"
          onClick={() => router.push(routes.PARK[0].path)}
        />
        <CTA
          text="Add Park Manager"
          type="blue"
          onClick={() => router.push(routes.PARK[1].path)}
        />
        <CTA
          text="Add Dispatch Officer"
          type="red"
          onClick={() => router.push(routes.PARK[2].path)}
        />
      </div>

      <div className="mt-[53px]">
        {/* <Table
          columns={columns}
          data={parks}
          action={{ viewLabel: "View Statement", type: ["view"] }}
        /> */}
        <MainTable 
             columns={columns}
             data={parks}
             identifier=""
             actionObject={actionObject}
             filterMenu={options}
             searchBy="park name"
             handleSearch={(e:any)=> SearchPark(e)}
             handleFilter={(e:any)=>FilterPark(e)} 
             apiSearch={()=>{}}
             />
      </div>
    
      {/* <div className=' h-40 flex flex-col mt-10 items-center justify-center'>
				<ReactSVG src='./img/svg/stars.svg' />
				<p>Sorry, No information yet, Select Vehicle Type to start</p>
			</div> */}
      {/* </div> */}
    </div>
  );
}
