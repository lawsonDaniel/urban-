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

export default function DispatcherStatements() {
  const router = useRouter();
  const [selectedPark, setSelectedPark] = useState();
  const [Park, setPark] = useState<any[]>([]);
  const [Manager, setManager] = useState<any[]>([]);

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
        {Manager.map((a: any) => {
          return (
            <>
              <NotificationCard
                hideRight
                textBody={
                  <p>
                    Dispatcher Name:{" "}
                    <span className="text-primary">{a.firstName}</span>
                  </p>
                }
                left={<Avatar body="DK" />}
                onClick={() =>
                  router.push("/park-statements/dispatcher/tade/records")
                }
              />
            </>
          );
        })}
      </div>
    </>
  );
}
