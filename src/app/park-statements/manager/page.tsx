"use client";
import React, { useState, useEffect } from "react";
import SubHeader from "../../components/headers/sub-header";
import Dropdown from "../../components/dropdown";
import NotificationCard from "../../components/notification-card";
import Avatar from "../../components/avatar";
import { useRouter } from "next/navigation";
import { getAll } from "@/common/hooks/fireStore";
import { DocumentSnapshot } from "@firebase/firestore";
import manager from "@/common/classes/manager.class";
import parkOBJ from "@/common/classes/park.class";

export default function ManagerStatements() {
  const [selectedPark, setSelectedPark] = useState();
  const [Park, setPark] = useState<any[]>([]);
  const [Manager, setManager] = useState<any[]>([]);
  const router = useRouter();
  const options = [
    { value: "bus", label: "Bus" },
    { value: "sedan", label: "Sedan" },
    { value: "van", label: "Van" },
    { value: "others", label: "Others" },
  ];

  useEffect(() => {
   
    parkOBJ.getAll().then((res)=>{
      setPark(res?.parks)
    })
    
  }, []);

  const parkOption = Park.map((a: any) => {
    return {
      value: a?.id,
      label: a?.name,
    };
  });
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
        {Manager.map((a: any) => {
          return (
            <>
              <NotificationCard
                hideRight
                textBody={
                  <p>
                    Manager Name:{" "}
                    <span className="text-primary">{a.firstName}</span>
                  </p>
                }
                left={<Avatar body="DK" />}
                onClick={() =>
                  router.push("/park-statements/manager/tade/records")
                }
              />
            </>
          );
        })}
      </div>
    </>
  );
}
