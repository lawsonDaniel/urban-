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

export default function Managers() {
  const columns = [
    {
      id: "parkName",
      header: "Park Name",
    },
    {
      id: "totalTrips",
      header: "total trips",
    },
    {
      id: "successfulTrips",
      header: "successful trips",
    },
    {
      id: "scheduledTrips",
      header: "scheduled trips",
    },
    {
      id: "cancelledTrips",
      header: "cancelled trips",
    },
  ];

  const userData = useUser();
  const [managerPark, setManagerPark] = useState<any[]>([]);
  const [inputField,setInputField] = useState<any>('')

  useEffect(() => {
    if (userData) {
      manager.getAll().then((res)=>{
        setManagerPark(res?.data)
        if (inputField.trim().length >= 1) {
          const searchFilter = res?.data((parkfiltername:any) =>
          parkfiltername.name.toLowerCase().includes(inputField.toLowerCase())
          );
          console.log(searchFilter,'swae')
          setManagerPark(searchFilter)
        } else {
          setManagerPark(res?.data)
        }
      })
    }
  }, [inputField, userData]);

  return (
    <main>
      <SubHeader header="Park Managers" inputText="Search Managers"  setInputField={setInputField}/>
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
          managerPark?.length >=1 ? <Table
          columns={columns}
          data={managerPark}
          action={{
            type: ["view", "delete"],
            viewLabel: "View statememt",
            deleteLabel: "Remove manager",
          }}
        />: <div className="mt-[10rem] text-center">
        <p className="text-xl capitalize">
          Sorry, No information yet, Add a Park Manager to start
        </p>
      </div>
        }
        
      </div>
    </main>
  );
}
