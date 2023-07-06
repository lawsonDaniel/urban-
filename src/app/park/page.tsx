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
import { GetUserType } from "@/common/hooks/token";
import CTA from "../components/dashboard/comp/cta";
import parkOBJ from "@/common/classes/park.class";

export default function Park() {
  const [DispactchRider, setDispatchRider] = useState<any[]>([]);
  const [Park, setPark] = useState<any[]>([]);
  const userData = useUser();
  const getAllDispatchOfficers = async () => {};

  console.log(Park, "park");
  const router = useRouter();
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

  const userType = GetUserType();
  const disData = [
    {
      id: 1,
      dispatchName: "John Doe",
      email: "test@gmail.com",
      phoneNo: "09103456789",
    },
    {
      id: 2,
      dispatchName: "oshodi Doe",
      email: "test@gmail.com",
      phoneNo: "09103456789",
    },
    {
      id: 3,
      dispatchName: "oshodi Doe",
      email: "test@gmail.com",
      phoneNo: "09103456789",
    },
  ];
  const [parks, setParks] = useState<any[]>([]);

  const getAllParks = async () => {
    try {
      const res = await parkOBJ.getAll();
      console.log("park ress::", res)
      const parks: any[] = [];
      // res.forEach((doc: DocumentSnapshot) => {
      //   parks.push(doc.data());
      // });
      setParks(res);
      // setMainParks(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (userData) {
      getAllParks();
    }
  }, [userData]);

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
            {parks ? (
              <Table
                columns={columns}
                data={parks}
                action={{
                  viewLabel: "View statement",
                  type: ["view"],
                }}
              />
            ) : (
              <div className="flex-col gap-7">
                <div className="grid grid-cols-3 mt-[32px] gap-8">
                  <div className="col-span-1 ">
                    <CTA
                      text="Veiw achieve"
                      type="green"
                      onClick={() => router.push("#")}
                    />
                  </div>
                </div>
                <div className="mt-[10rem] text-center">
                  <p className="text-xl capitalize">
                    Sorry, No information yet, Add a Park to start
                  </p>
                </div>
              </div>
            )}
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
              {DispactchRider ? (
                <Table
                  columns={disColumns}
                  data={disData}
                  action={{
                    label: "",
                    type: ["view", "edit", "delete"],
                  }}
                />
              ) : (
                <div className="flex-col gap-7">
                  <div className="grid grid-cols-3 mt-[32px] gap-8">
                    <div className="col-span-1 ">
                      <CTA
                        text="Veiw achieve"
                        type="green"
                        onClick={() => router.push("#")}
                      />
                    </div>
                  </div>
                  <div className="mt-[10rem] text-center">
                    <p className="text-xl capitalize">
                      Sorry, No information yet, Add a dispatch Rider to start
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}
