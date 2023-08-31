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
import { useSelector } from "react-redux";
import MainTable from "../components/tables/main.table";

export default function Park() {
  const [DispactchRider, setDispatchRider] = useState<any[]>([]);
  const [DispatchData,setDispatchData]= useState<any>([])
  const [Park, setPark] = useState<any[]>([]);
  const [parkData,setParkData] = useState<any>([])
  const [inputField,setInputField] = useState<any>('')
  const [paginaton,setPagination] = useState(1)
  const [pageLength,setPageLength] = useState<any>(0)

  
  const userData = useSelector((a:any)=> a?.authUser?.authUser);
  const getAllDispatchOfficers = async () => {};

  const router = useRouter();
  const columns = [
    {
      key: "name",
      header: "Park Name",
    },
    {
      key: "totalTrip",
      header: "total trips",
    },
    {
      key: "successfulTrip",
      header: "successful trips",
    },
    {
      key: "scheduledTrip",
      header: "scheduled trips",
    },
    {
      key: "cancelledTrip",
      header: "cancelled trips",
    },
    {
      key: "actions",
      header: "Action",
    },
  ];
  const disColumns = [
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
    },
  ];
  const actionObject = [
    {
      label: "Veiw Statement",
      function: (row:any) => {
        // Perform edit action using the 'row' data
       
        const query = new URLSearchParams({
          id:row.id
        }).toString();
        router.push(`/park-statements/manager?${query}`)
        console.log("Veiw Statement action clicked for row:", row);
      },
    },
    {
      label: "Edit",
      function: (row:any) => {
        // Perform delete action using the 'row' data
        console.log("Edit action clicked for row:", row);
      },
    },
  ];
  const userType = useSelector((a:any)=> a?.authUser?.setAuthType)
  
  const [parks, setParks] = useState<any[]>([]);
  
    const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    if (userData) {
      parkOBJ.getAllByUser().then((res)=>{
      setParks(res?.parks)
      setParkData(res?.parks)
      setPageLength(res?.totalPages)
     
      }).catch((err)=>{
        console.log(err)
      })
    }
  }, [Park, paginaton, userData]);
  //handle search
  const SearchPark = (e:any)=>{
    if (e.trim().length >= 1) {
      const searchFilter = parkData?.filter((parkfiltername:any) =>
      parkfiltername?.name.toLowerCase().includes(e.toLowerCase())
      );
      console.log(searchFilter,'swae')
     setParks(searchFilter)
    } else {
     setParks(parkData)
    }
  }

  useEffect(()=>{
    dispatch.getAllCreated().then((res)=>{
        setDispatchRider(res)
      setDispatchData(res)
    }).catch((err)=>{
      console.log(err,'err from dispatch')
    })
  },[])
  //handle search
  const SearchDispatch = (e:any)=>{
    if (e.trim().length >= 1) {
      const searchFilter = DispatchData?.filter((rider:any) =>
        rider?.fullName.toLowerCase().includes(e.toLowerCase())
      );
      setDispatchRider(searchFilter)
    } else {
      setDispatchRider(DispatchData);
    }
  }
  return (
    <div>
    <SubHeader header="Park" hideBack  />
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
          
             <MainTable 
             columns={columns}
             data={parks}
             identifier=""
             actionObject={actionObject}
             searchBy="park name"
             handleSearch={(e:any)=> SearchPark(e)}
             handleFilter={()=>{}} 
             apiSearch={()=>{}}
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
          <MainTable 
             columns={disColumns}
             data={DispactchRider}
             identifier=""
             searchBy="Rider's Name "
             handleSearch={(e:any)=> SearchDispatch(e)}
             handleFilter={()=>{}} 
             apiSearch={()=>{}}
             />
          </div>
        </div>
      )
    )}
  </div>
  );
}
