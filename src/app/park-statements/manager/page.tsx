"use client";
import React, { useState, useEffect } from "react";
import SubHeader from "../../components/headers/sub-header";
import Dropdown from "../../components/dropdown";
import NotificationCard from "../../components/notification-card";
import Avatar from "../../components/avatar";
import { useRouter } from "next/navigation";
import parkOBJ from "@/common/classes/park.class";
import manager from "@/common/classes/manager.class";

export default function ManagerStatements() {
  const [selectedPark, setSelectedPark] = useState();
  const [Park, setPark] = useState<any[]>([]);
  const [Manager, setManager] = useState<any[]>([]);
  const [mangerId, setManageId] = useState<string>('')
  const router = useRouter();
  const options = [
    { value: "bus", label: "Bus" },
    { value: "sedan", label: "Sedan" },
    { value: "van", label: "Van" },
    { value: "others", label: "Others" },
  ];

  useEffect(() => {
    parkOBJ.getAllByUser().then((res)=>{
      setPark(res?.parks)
    })
  }, [Park]);
  let parkDetails:any
useEffect(()=>{
  if(selectedPark){
    let parkDetails:any = Park.filter((a)=> a?.id === selectedPark)
    manager.getOne(parkDetails[0]?.parkManagerId).then((res:any)=>{
      let query = {
        ...parkDetails[0],
        ...res
      }
      console.log(query,'query')
    const queryString = new URLSearchParams(query).toString();
    setManageId(queryString)
      setManager([res])
    })
  }
},[ selectedPark])

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
  console.log(mangerId,'manager id')
  return (
    <>
      <SubHeader header="Manager Statements" allowFilter hideBack hideRight />
      <div className="mt-6 w-[510px]">
        <Dropdown
          options={parkOption}
          placeholder="Select Park"
          label=""
          onSelect={(e: any) => setSelectedPark(e)}
          className="w-[510px]"
        />
      </div>
      <div className="mt-8 grid grid-col-1 gap-y-4">
        {Manager?.map((a: any) => {
          return (
            <>
              <NotificationCard
                hideRight
                textBody={
                  <p>
                    Manager Name:{" "}
                    <span className="text-primary">{a?.firstName}</span>
                  </p>
                }
                left={<Avatar body="DK" />}
                onClick={() =>
                  router.push(`/park-statements/manager/${a?.firstName}/records?${mangerId}`)
                }
              />
            </>
          );
        })}
      </div>
    </>
  );
}
