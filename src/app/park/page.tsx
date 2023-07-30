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
import dispatch from "@/common/classes/dispatch.class";

export default function Park() {
  const [DispactchRider, setDispatchRider] = useState<any[]>([]);
  const [Park, setPark] = useState<any[]>([]);
  const [inputField,setInputField] = useState<any>('')
  const [paginaton,setPagination] = useState(1)
  const [pageLength,setPageLength] = useState<any>(0)

  
  const userData = useUser();
  const getAllDispatchOfficers = async () => {};

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
  ];

  const userType = GetUserType();
  
  const [parks, setParks] = useState<any[]>([]);
  
    const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    if (userData) {
      parkOBJ.getAllByUser().then((res)=>{
      setParks(res?.parks)
      setPageLength(res?.totalPages)
      if (inputField.trim().length >= 1) {
        const searchFilter = res?.parks?.filter((parkfiltername:any) =>
        parkfiltername?.name.toLowerCase().includes(inputField.toLowerCase())
        );
        console.log(searchFilter,'swae')
       setParks(searchFilter)
      } else {
       setParks(res?.parks)
      }
      // if(inputField){
      //   console.log(inputField,Park,'info')
      // }
      }).catch((err)=>{
        console.log(err)
      })
    }
  }, [Park, inputField, paginaton, userData]);

  useEffect(()=>{
    dispatch.getAll().then((res)=>{
      setDispatchRider(res)
      if (inputField.trim().length >= 1) {
        const searchFilter = res?.filter((rider:any) =>
          rider?.fullName.toLowerCase().includes(inputField.toLowerCase())
        );
        setDispatchRider(searchFilter)
      } else {
        setDispatchRider(res);
      }
    }).catch((err)=>{
      console.log(err,'err from dispatch')
    })
  },[inputField, paginaton])
  console.log(DispactchRider,'dispatch rider')
  return (
    <div>
    <SubHeader header="Park" hideBack inputText="Search park" inputField={inputField} setInputField={setInputField} />
    {userType === USER_TYPE.PARK_OWNER ? (
      <>
        <div className="grid grid-cols-3 gap-4 mt-8">
          {routes?.PARK?.map((park: any, index: any) => (
            <div key={index} className="">
              <QuickAction
                path={park?.path}
                title={park?.title}
                iconClassName={park?.iconClassName}
                icon={park?.icon}
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
          {parks.length >=1 ? (
           <>
             <Table
              columns={columns}
              data={parks}
              action={{
                viewLabel: "View statement",
                type: ["view"],
              }}
            />
             <div className="flex gap-4 items-center justify-center mt-[10px]">
               {
             parks &&parks.length >=1 && Array.from({ length: pageLength }, (_, index) => index + 1).map((a,i)=>(
               <button onClick={()=>{
                console.log(paginaton,i+1,'pagination')
                setPagination((a)=>{
                  return a=i+1
                })
               }} className={`${paginaton === i+1 ? "bg-[#036e03]" : "bg-[#036e03b5]"} text-white p-[10px] w-[30px] h-[30px] flex items-center justify-center text-[12px]`} key={i}>{a}</button>
             ))
           }
               </div>
           </>
          ) : (
            <div className="flex-col gap-7">
              <div className="grid grid-cols-3 mt-[32px] gap-8">
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
            {DispactchRider && DispactchRider.length >=1 ? (
             <>
               <Table
                   columns={disColumns}
                   data={DispactchRider}
                   action={{
                     label: "",
                     type: ["view", "edit", "delete"],
                   }}
               />
               <div className="flex gap-4 items-center justify-center">
               {
           DispactchRider &&  DispactchRider.length >=1 && Array.from({ length: pageLength }, (_, index) => index + 1).map((a,i)=>(
               <button onClick={()=>{
                console.log(paginaton,i+1,'pagination')
                setPagination((a)=>{
                  return a=i+1
                })
               }} className={`${paginaton === i+1 ? "bg-[#036e03]" : "bg-[#036e03b5]"} text-white p-[10px] w-[30px] h-[30px] flex items-center justify-center text-[12px]`} key={i}>{a}</button>
             ))
           }
               </div>
              
             </>
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
