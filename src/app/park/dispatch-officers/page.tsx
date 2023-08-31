"use client";
import React, { useState, useEffect } from "react";
import SubHeader from "../../components/headers/sub-header";
import QuickAction from "../../components/parkowner/quick-button";
import Table from "../../components/table";
import { routes } from "@/common/routes";
import Button from "../../components/button";
import { getAll } from "@/common/hooks/fireStore";
import { USER_TYPE } from "@/common/types";
import { DocumentSnapshot } from "firebase/firestore";
import { useUser } from "@/common/hooks/useUser";
import dispatch from "@/common/classes/dispatch.class";
import MainTable from "@/app/components/tables/main.table";
import {useSelector} from 'react-redux'

export default function DispatchOfficers() {
  const [DispactchRider, setDispatchRider] = useState<any[]>([]);
  const [inputField,setInputField] = useState<any>('')
  const [dispatchData,setDispatchData]  = useState<any[]>([]);
  const userData = useSelector((a:any)=> a?.authUser?.authUser);

  const getAllDispatchOfficers = async () => {};
  const columns = [
    {
      key: "fullName",
      header: "Dispatch Name",
    },
    {
      key: "email",
      header: "Email Address",
    },
    {
      key: "phoneNumber",
      header: "Phone No",
    },
    {
      key: "actions",
      header: "Action",
    }
  ]
  //edit,view statement, reset password , delete
  const actionObject = [
    {
      label: "Edit",
      function: (row:any) => {
        // Perform edit action using the 'row' data
       
      },
    },
    {
      label: "Veiw Statement",
      function: (row:any) => {
        // Perform edit action using the 'row' data
       
        const query = new URLSearchParams({
          id:row.id
        }).toString();
        // router.push(`/park-statements/manager?${query}`)
        console.log("Veiw Statement action clicked for row:", row);
      },
    },
    {
      label: "Reset Password",
      function: (row:any) => {
        // Perform edit action using the 'row' data
       
      
      },
    },
     {
      label: "Delete",
      function: (row:any) => {
        // Perform edit action using the 'row' data
       
      
      },
    },
  ];
  useEffect(()=>{
    dispatch.getAll().then((res)=>{
      setDispatchRider(res)
      setDispatchData(res)
     
    })
  },[])
const SearchRider = (e:any)=>{
  if (e.trim().length >= 1) {
    const searchFilter = dispatchData?.filter((parkfiltername:any) =>
    parkfiltername?.fullName.toLowerCase().includes(e.toLowerCase())
    );
    console.log(searchFilter,'swae')
    setDispatchRider(searchFilter)
  } else {
    setDispatchRider(dispatchData)
  }
}
  return (
    <main>
      <SubHeader header="Dispatch Officers" />
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
					type='button'
					className='w-full bg-primary_blue text-primary_blue bg-opacity-20 hover:bg-primary_blue hover:text-white'>
					See All Dispatch Officers
				</Button>
				<div></div>
			</div> */}
      <div className="mt-[53px]">
      {/* {
          DispactchRider?.length >=1 ? <Table
          columns={columns}
          data={DispactchRider}
          action={{
            type: ["view", "edit", "delete"],
            viewLabel: "View statememt",
          }}
        />: <div className="mt-[10rem] text-center">
        <p className="text-xl capitalize">
          Sorry, No information yet, Add a Dispatch Rider to start
        </p>
      </div>
        } */}
        
        <MainTable 
             columns={columns}
             data={DispactchRider}
             identifier=""
             actionObject={actionObject}
             searchBy="Dispatch name"
             handleSearch={(e:any)=> {SearchRider(e)}}
             handleFilter={(e:any)=>{}} 
             apiSearch={()=>{}}
             />
      </div>
    </main>
  );
}
