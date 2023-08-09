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
      id: "firstName",
      header: "Manager Name",
    },
    {
      id: "email",
      header: "Email",
    },
    {
      id: "phone number",
      header: "Phone No",
    },
    {
      id: "urbanId",
      header: "Manger id",
    }
  ];

  const userData = useUser();
  const [managerPark, setManagerPark] = useState<any[]>([]);
  const [inputField, setInputField] = useState<string>('');
  
  useEffect(() => {
    if (userData) {
      manager.getAll()
        .then((res) => {
          let filteredParks = res;
          if (inputField.trim().length >= 1) {
            const searchFilter:any[] = filteredParks.filter((park: any) =>
              park.urbanId.toLowerCase().includes(inputField.toLowerCase())
            );
            console.log(searchFilter,'filter data')
            setManagerPark(searchFilter);
          } else {
            setManagerPark(filteredParks);
          }
        })
        .catch((error) => {
          console.error("Error fetching manager data:", error);
        });
    }
    
  }, [inputField, userData]);
  
  // Rest of your component...

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
