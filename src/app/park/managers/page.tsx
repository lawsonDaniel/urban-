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

  // const data = [
  //   {
  //     id: 1,
  //     parkName: "John Doe",
  //     totalTrips: "23",
  //     successfulTrips: "20",
  //     scheduledTrips: "20",
  //     cancelledTrips: "20",
  //   },
  //   {
  //     id: 2,
  //     parkName: "oshodi Doe",
  //     totalTrips: "20",
  //     successfulTrips: "20",
  //     scheduledTrips: "20",
  //     cancelledTrips: "20",
  //   },
  //   {
  //     id: 3,
  //     parkName: "oshodi Doe",
  //     totalTrips: "20",
  //     successfulTrips: "21",
  //     scheduledTrips: "20",
  //     cancelledTrips: "20",
  //   },
  //   {
  //     id: 4,
  //     parkName: "oshodi Doe",
  //     totalTrips: "20",
  //     successfulTrips: "20",
  //     scheduledTrips: "20",
  //     cancelledTrips: "20",
  //   },
  //   {
  //     id: 5,
  //     parkName: "oshodi Doe",
  //     totalTrips: "20",
  //     successfulTrips: "20",
  //     scheduledTrips: "20",
  //     cancelledTrips: "20",
  //   },
  // ];
  const userData = useUser();
  const [parks, setParks] = useState<any[]>([]);

  const getAllParks = async () => {};

  useEffect(() => {
    if (userData) {
      // getAllDispatchOfficers();
      getAllParks();
    }
  }, [getAll, userData]);

  return (
    <main>
      <SubHeader header="Park Managers" inputText="Search Managers" />
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
        <Table
          columns={columns}
          data={parks}
          action={{
            type: ["view", "delete"],
            viewLabel: "View statememt",
            deleteLabel: "Remove manager",
          }}
        />
      </div>
    </main>
  );
}
