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
  const [selectedPark, setSelectedPark] = useState<string | null>(null);
  const [Park, setPark] = useState<any[]>([]);
  const [Manager, setManager] = useState<any[]>([]);
  const [mangerId, setManagerId] = useState<string>('');
  const [paramMeter, setParameter] = useState<any>('');
  const router = useRouter();
  const options = [
    { value: "bus", label: "Bus" },
    { value: "sedan", label: "Sedan" },
    { value: "van", label: "Van" },
    { value: "others", label: "Others" },
  ];

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    // Convert the searchParams to a plain object
    const params: any = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    setParameter(params);
    setSelectedPark(params.id);
  }, []);

  useEffect(() => {
    parkOBJ.getAllByUser().then((res) => {
      setPark(res?.parks);
    });
  }, []);

  useEffect(() => {
    if (selectedPark) {
      const parkDetails = Park.find((a) => a?.id === selectedPark);
      console.log(parkDetails, 'park details....');
      if (parkDetails) {
        manager.getOne(parkDetails.parkManagerId).then((res: any) => {
          let query = {
            ...parkDetails,
            ...res
          };
          const queryString = new URLSearchParams(query).toString();
          setManagerId(queryString);
          setManager([res]);
        });
      }
    }
  }, [selectedPark, Park]);

  let parkOption: { value: any; label: any; }[] = [];
  if (Park && Park.length >= 1) {
    parkOption = Park.map((park: any) => ({
      value: park.id,
      label: park.name,
    }));
  } else {
    parkOption = [{
      value: null,
      label: 'No Park found'
    }];
  }

  return (
    <>
      <SubHeader header="Manager Statements" allowFilter hideBack hideRight />
      <div className="mt-6 w-[510px]">
        {!paramMeter?.id && (
          <Dropdown
            options={parkOption}
            placeholder="Select Park"
            label=""
            onSelect={(e: any) => setSelectedPark(e)}
            className="w-[510px]"
          />
        )}
      </div>
      <div className="mt-8 grid grid-col-1 gap-y-4">
     {   
      Manager.length >=1? Manager.map((a: any, index: number) => {
          return(
            <>
              {
              a &&  a?.firstName ? <NotificationCard
              key={index}
              hideRight
              textBody={
                <p>
                  Manager Name:{" "}
                  <span className="text-primary">{a?.firstName.charAt(0).toUpperCase() + a?.firstName.slice(1)}</span>
                </p>
              }
              left={<Avatar body={a?.firstName.charAt(0).toUpperCase()} />}
              onClick={() =>
                router.push(`/park-statements/manager/${a?.firstName}/records?${mangerId}`)
              }
            />: <NotificationCard
            hideRight
            textBody={
              <p>
                <span className="text-primary">No Manager Found</span>
              </p>
            }
            left={<Avatar body="" />}
          />
            }
            </>
          )
        })  : <NotificationCard
        hideRight
        textBody={
          <p>
            <span className="text-primary">No Manager Found</span>
          </p>
        }
        left={<Avatar body="" />}
      />
      }
      </div>
    </>
  );
}
