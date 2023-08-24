"use client";
import React, { useEffect, useState } from "react";
import SubHeader from "../../components/headers/sub-header";
import QuickAction from "../../components/parkowner/quick-button";
import Table from "../../components/table";
import { routes } from "@/common/routes";
import Button from "../../components/button";
import { getAll } from "@/common/hooks/fireStore";
import { DocumentSnapshot } from "@firebase/firestore";
import { useUser } from "@/common/hooks/useUser";
import manager from "@/common/classes/manager.class";
import MainTable from "@/app/components/tables/main.table";
import {useSelector} from 'react-redux'
export default function Managers() {
  const columns = [
    {
      key: "firstName",
      header: "Manager Name",
    },
    {
      key: "email",
      header: "Email",
    },
    {
      key: "phone number",
      header: "Phone No",
    },
    {
      key: "urbanId",
      header: "Manger id",
    }
  ];

  const userData = useSelector((a:any)=> a?.authUser?.authUser);
  const [managerPark, setManagerPark] = useState<any[]>([]);
  const [inputField, setInputField] = useState<string>('');
  const [managerData,setMangerData] = useState<any[]>([]);
  
  useEffect(() => {
    if (userData) {
      manager.getAll()
        .then((res) => {
          setMangerData(res)
          setManagerPark(res)
          
        })
        .catch((error) => {
          console.error("Error fetching manager data:", error);
        });
    }
    
  }, [userData]);
  
  //handle search
const SearchManager = (e:any)=>{
  if (e.trim().length >= 1) {
    const searchFilter = managerData?.filter((parkfiltername:any) =>
    parkfiltername?.urbanId.toLowerCase().includes(e.toLowerCase())
    );
    console.log(searchFilter,'swae')
    setManagerPark(searchFilter)
  } else {
    setManagerPark(managerData)
  }
}
  return (
    <main>
      <SubHeader header="Park Managers"/>
      {/* <div className='grid grid-cols-3 gap-4 mt-8'>
				{routes.PARK.map((park: any, index: any) => (
					<div key={index} className=''>
						<QuickAction
							path={park.path}
							title={park.title}
							iconClassName={park.iconClassName}
							icon={park.icon}
						/>
					</div>
				))}
			</div> */}

      {/* <div className='grid grid-cols-3 gap-4 mt-[32px]'>
				<Button
					type='button'
					className='w-full text-primary bg-primary bg-opacity-20 hover:bg-primary hover:text-white'>
					See All Park Managers
				</Button>
				<Button
				 alert(JSON.stringify(values, null, 2));
      openModal();>
					See All Dispatch Officers
				</Button>
				<div></div>
			</div> */}
      <div className="mt-[53px]">
        {
        //   managerPark?.length >=1 ? <Table
        //   columns={columns}
        //   data={managerPark}
        //   action={{
        //     type: ["view", "delete"],
        //     viewLabel: "View statememt",
        //     deleteLabel: "Remove manager",
        //   }}
        // />: 
        }
        <MainTable 
             columns={columns}
             data={managerPark}
             identifier=""
             searchBy="Urban id"
             handleSearch={(e:any)=> {SearchManager(e)}}
             handleFilter={(e:any)=>{}} 
             apiSearch={()=>{}}
             />
      </div>
    </main>
  );
      
}