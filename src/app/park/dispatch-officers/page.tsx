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

export default function DispatchOfficers() {
  const [DispactchRider, setDispatchRider] = useState<any[]>([]);
  const [inputField,setInputField] = useState<any>('')

  const userData = useUser();

  const getAllDispatchOfficers = async () => {};
  const columns = [
    {
      id: "fullName",
      header: "Dispatch Name",
    },
    {
      id: "email_",
      header: "Email Address",
    },
    {
      id: "phoneNumber",
      header: "Phone No",
    },
  ]

  useEffect(()=>{
    dispatch.getAll().then((res)=>{
      setDispatchRider(res)
      if (inputField.trim().length >= 1) {
        const searchFilter = res?.data((parkfiltername:any) =>
        parkfiltername.name.toLowerCase().includes(inputField.toLowerCase())
        );
        
        setDispatchRider(searchFilter)
      } else {
        setDispatchRider(res)
      }
    })
  },[inputField])

  return (
    <main>
      <SubHeader header="Dispatch Officers" inputText="Search Officers" setInputField={setInputField}/>
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
      {
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
        }
        
        
      </div>
    </main>
  );
}
