"use client";
import React, { useState, useEffect } from "react";
import SubHeader from "../../components/headers/sub-header";
import Dropdown from "../../components/dropdown";
import NotificationCard from "../../components/notification-card";
import Avatar from "../../components/avatar";
import { useRouter } from "next/navigation";
import { getAll } from "@/common/hooks/fireStore";
import { DocumentSnapshot } from "@firebase/firestore";
import parkOBJ from "@/common/classes/park.class";
import dispatch from "@/common/classes/dispatch.class";

export default function DispatcherStatements() {
  const router = useRouter();
  const [selectedPark, setSelectedPark] = useState();
  const [Park, setPark] = useState<any[]>([]);
  const [Manager, setManager] = useState<any[]>([]);
  const [mangerId, setManageId] = useState<any>()

  const options = [
    { value: "bus", label: "Bus" },
    { value: "sedan", label: "Sedan" },
    { value: "van", label: "Van" },
    { value: "others", label: "Others" },
  ];
  const getAllParks = async () => {};
  const getAllManager = async () => {};
  useEffect(() => {
    parkOBJ.getAllByUser().then((res)=>{
      setPark(res?.parks)
    })
  }, [Park]);
  useEffect(() => {
    getAllManager();
  }, [selectedPark]);
  
   let parkOption: { value: any; label: any; }[]
  
  if(Park &&  Park?.length >= 1){
    parkOption = Park?.map((park: any) => ({
      value: park.id,
      label: park.name,
    }))
  }else{
    parkOption = [{
      value:null,
      label : 'no Park found'
    }]
  }
  useEffect(()=>{
    if(selectedPark){
      let parkDetails:any = Park.filter((a)=> a?.id === selectedPark)
      dispatch.getAll().then((res:any)=>{
       const slectedRider:any = res.filter((a:any)=> a?.parkId === selectedPark)
       setManager(slectedRider)
      })
    }
  },[Park, selectedPark])

  return (
    <>
      <SubHeader header="Dispatcher Statements" allowFilter hideBack />
      <div className="mt-6">
        <Dropdown
          options={parkOption}
          placeholder="Select Park"
          label=""
          onSelect={(e: any) => setSelectedPark(e)}
          className="w-[510px]"
        />
      </div>
      <div className="mt-8 grid grid-col-1 gap-y-4">
        {Manager.length >=1 && selectedPark ? Manager?.map((a: any) => {
           const queryString = new URLSearchParams({
            ...a
            }).toString();
      
          console.log(a, 'managers info fro first')
          return (
            <>
              <NotificationCard
                hideRight
                textBody={
                  <p>
                    Manager Name:{" "}
                    <span className="text-primary">{a?.firstName.charAt(0).toUpperCase() + a?.firstName.slice(1)}</span>
                  </p>
                }
                left={<Avatar body={a?.firstName.charAt(0).toUpperCase()+ a?.firstName.charAt(1).toUpperCase()} />}
                onClick={() =>
                  router.push(`/park-statements/dispatcher/${a?.fullName}/records?${queryString}`)
                }
              />
            </>
          );
        }) :
        <>
              <NotificationCard
                hideRight
                textBody={
                  <p>
                    <span className="text-primary">No Dispatcher Found</span>
                  </p>
                }
                left={<Avatar body=""/>}
              />
            </>
        }
      </div>
    </>
  );
}
