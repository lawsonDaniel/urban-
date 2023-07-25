// import styles from './page.module.css'
import Table from "../table";
import React, { useState, useEffect } from "react";
import SubHeader from "../headers/sub-header";
import CTA from "./comp/cta";
import DataCard from "./comp/dataCard";
import { useRouter } from "next/navigation";
import { routes } from "@/common/routes";
import { getAll } from "@/common/hooks/fireStore";
import { DocumentSnapshot } from "firebase/firestore";
import { parseCookies } from "nookies";
import { useUser } from "@/common/hooks/useUser";
import { useAuth } from "@/common/hooks/useAuth";
import parkOBJ from "@/common/classes/park.class";
// const inter = Inter({ subsets: ['latin'] })

export default function ParkOwner({ user }: any) {
  const router = useRouter();
  const userData = useUser();
  // console.log("getLoginUser:::userData::", userData.uid)

  const [parks, setParks] = useState<any>([]);
  const [mainParks, setMainParks] = useState<any>([]);
  const [paginaton,setPagination] = useState(1)
  const [pageLength,setPageLength] = useState<any>(0)

  

  const columns = [
    {
      id: "name",
      header: "Park Name",
    },
    {
      id: "totalTrip",
      header: "total trips",
    },
    {
      id: "successfulTrip",
      header: "successful trips",
    },
    {
      id: "scheduledTrip",
      header: "scheduled trips",
    },
    {
      id: "cancelledTrip",
      header: "cancelled trips",
    },
  ];

  const options =
    mainParks &&
    mainParks?.parks?.map((park: { id: any; name: any; }) => {
      return {
        value: park.id,
        label: park.name,
      };
    });

  options?.unshift({
    value: "all",
    label: "All",
  });

  const [selectedOption, setSelectedOption] = useState<any>();
  const getAllParks = async () => {
    try {
      const res = await parkOBJ.getAll();
      setParks(res?.parks);
      setPageLength(res?.totalPages)
      setMainParks(res);
      if (selectedOption) {
    
        const filteredParks =
          selectedOption && selectedOption.value !== "all" ?
        res?.parks.filter((a:any)=> a.id === selectedOption.value)
          : res?.parks
            
              console.log(filteredParks,'filter')
        setParks(filteredParks);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (userData) {
      getAllParks();
    }
  }, [ userData,paginaton,selectedOption]);
 console.log(parks,'page kk')
  return (
    <div className="">
      {/* <div className='p-14 min-h-full mt-10 rounded-xl bg-white'> */}
      <SubHeader
        header="Dashboard"
        hideBack
        inputText="Search Park"
        boxType="dropdown"
        allowFilter
        setSelectedOption={setSelectedOption}
        dropDownOptions={options}
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
        <Table
          columns={columns}
          data={parks}
          action={{ viewLabel: "View Statement", type: ["view"] }}
        />
      </div>
      <div className="flex gap-4 items-center justify-center mt-[10px]">
                 {
             parks &&  Array.from({ length: pageLength}, (_, index) => index + 1).map((a,i)=>(
                 <button onClick={()=>{
                  console.log(paginaton,i+1,'pagination')
                  setPagination((a)=>{
                    return a=i+1
                  })
                 }} className={`${paginaton === i+1 ? "bg-[#036e03]" : "bg-[#036e03b5]"} text-white p-[10px] w-[30px] h-[30px] flex items-center justify-center text-[12px]`} key={i}>{a}</button>
               ))
             }
                 </div>
      {/* <div className=' h-40 flex flex-col mt-10 items-center justify-center'>
				<ReactSVG src='./img/svg/stars.svg' />
				<p>Sorry, No information yet, Select Vehicle Type to start</p>
			</div> */}
      {/* </div> */}
    </div>
  );
}
