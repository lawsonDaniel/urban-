"use client";
import React, { useState, useEffect } from "react";
import SubHeader from "../components/headers/sub-header";
import QuickAction from "../components/parkowner/quick-button";
import Table from "../components/table";
import { routes } from "@/common/routes";
import Button from "../components/button";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useUserType } from "@/common/hooks/useUserType";
import { USER_TYPE } from "@/common/types";
import { getAll } from "@/common/hooks/fireStore";
import { DocumentSnapshot } from "@firebase/firestore";
import { useUser } from "@/common/hooks/useUser";

export default function Park() {
  const [DispactchRider, setDispatchRider] = useState<any[]>([]);
  const [Park, setPark] = useState<any[]>([]);
  const userData = useUser();
  const getAllDispatchOfficers = async () => {};
  const getAllParks = async () => {};

  useEffect(() => {
    if (userData) {
      getAllDispatchOfficers();
      getAllParks();
    }
  }, [getAll, userData]);

  console.log(Park, "park");
  const router = useRouter();
  const columns = [
    {
      id: "parkName",
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
  const disColumns = [
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

  const userType = useUserType();

  return (
    <div>
      <SubHeader header="Park" hideBack inputText="Search park" />
      {userType === USER_TYPE.PARK_OWNER ? (
        <>
          <div className="grid grid-cols-3 gap-4 mt-8">
            {routes.PARK.map((park: any, index: any) => (
              <div key={index} className="">
                <QuickAction
                  path={park.path}
                  title={park.title}
                  iconClassName={park.iconClassName}
                  icon={park.icon}
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-[32px]">
            <Button
              type="button"
              onClick={() => router.push("/park/managers")}
              className="w-full text-primary bg-primary bg-opacity-20 hover:bg-primary hover:text-white"
            >
              See All Park Managers
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/park/dispatch-officers")}
              className="w-full bg-primary_blue text-primary_blue bg-opacity-20 hover:bg-primary_blue hover:text-white"
            >
              See All Dispatch Officers
            </Button>
            <div></div>
          </div>
          <div className="mt-[53px]">
            <Table
              columns={columns}
              data={Park}
              action={{
                viewLabel: "View statement",
                type: ["view"],
              }}
            />
          </div>
        </>
      ) : (
        userType === USER_TYPE.PARK_MANAGER && (
          <div className="mt-8">
            <QuickAction
              path={routes.PARK[2].path}
              title={routes.PARK[2].title}
              iconClassName={routes.PARK[2].iconClassName}
              icon={routes.PARK[2].icon}
            />
            <div className="mt-[53px]">
              <Table
                columns={disColumns}
                data={DispactchRider}
                action={{
                  label: "",
                  type: ["view", "edit", "delete"],
                }}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
}
