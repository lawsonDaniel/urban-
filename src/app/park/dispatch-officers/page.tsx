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

export default function DispatchOfficers() {
  const [DispactchRider, setDispatchRider] = useState<any[]>([]);
  const userData = useUser();

  const getAllDispatchOfficers = async () => {};
  useEffect(() => {
    getAllDispatchOfficers();
  }, [getAll]);
  console.log(DispactchRider, "riders");
  const columns = [
    {
      id: "dispatcherName",
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
  ];

  return (
    <main>
      <SubHeader header="Dispatch Officers" inputText="Search Officers" />
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
        <Table
          columns={columns}
          data={DispactchRider}
          action={{
            type: ["view", "edit", "delete"],
            viewLabel: "View statememt",
          }}
        />
      </div>
    </main>
  );
}
