"use client";
import SubHeader from "../components/headers/sub-header";
import Dropdown from "../components/dropdown";
import { useEffect, useState } from "react";
import { RadioButton } from "../components/radio/auth.radio";
import "react-tabs/style/react-tabs.css";
import ScheduledTrips from "./(components)/scheduled-trip";
import AssignedTrips from "./(components)/assigned-trips";
import CompletedTrips from "./(components)/completedTrips";
import Button from "../components/button";
import MyTabs from "../components/tabs";
import { useRouter } from "next/navigation";
import Input from "@/app/components/input";
import parkOBJ from "@/common/classes/park.class";
import { classifyDate } from "@/common/utils";
import tripOBJs from "@/common/classes/trip.class";
import { GetUserType } from "@/common/hooks/token";
import { useSelector } from "react-redux";


export default function Records() {
  const [parks, setParks] = useState<any[]>([]);
  const userType = useSelector((a:any)=> a?.authUser?.setAuthType);
  let option: { value: any; label: any }[];

  if (parks && parks?.length >= 1) {
    option = parks?.map((park: any) => ({
      value: park.id,
      label: park.name,
    }));
  } else {
    option = [
      {
        value: null,
        label: "no Park found",
      },
    ];
  }
  const transportOptions = [
    { value: "bus", label: "Bus" },
    { value: "sedan", label: "Sedan" },
    { value: "van", label: "Van" },
    { value: "others", label: "Others" },
  ];

  const [trips, setTrips] = useState<any[]>([]);

  const router = useRouter();

  const [selectedPark, setSelectedPark] = useState<string>();
  const [activeOption, setActiveOption] = useState<any>("Current Month");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [allTrips, setAllTrips] = useState<any[]>([]);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Months are zero-indexed, so adding 1
  const day = today.getDate();
  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;
  const [dateRange, setDateRange] = useState<any>({
    start: `${year}-${month < 10 ? "0" : ""}${month}-${
      1 < 10 ? "0" : ""
     }${1}`,
    end: formattedDate,
  });

  useEffect(() => {
    if (classifyDate(dateRange.start, dateRange.end)) {
      setActiveOption(classifyDate(dateRange.start, dateRange.end));
    } else {
      setActiveOption("Current Month");
      setDateRange({
        start: formattedDate,
        end: formattedDate,
      });
    }
  }, [dateRange, formattedDate]);

  useEffect(() => {
    const getAllParks = async () => {
      try {
        const res: any = await parkOBJ.getAllByUser();
        console.log(res, "res to select park");
        setParks(res?.parks);
      } catch (err) {
        console.log(err);
      }
    };
    getAllParks();
  }, []);

  const onSubmit = () => {
    console.log("clicked park statement");
    if (dateRange.start && dateRange.end && activeOption && selectedPark) {
      tripOBJs
        .getRecords(userType, dateRange.start, dateRange.end, selectedPark)
        .then((res: any) => {
          console.log(res, "records of park");
          setAllTrips(res);
        })
        .catch((err) => {
          console.log(err, "err");
        });
    }
  };

  useEffect(()=>{
    if (dateRange.start && dateRange.end && activeOption) {
      tripOBJs
        .getRecords(userType, dateRange.start, dateRange.end)
        .then((res: any) => {
          console.log(res, "records of park");
          setAllTrips(res);
        })
        .catch((err) => {
          console.log(err, "err");
        });
    }
  },[activeOption, dateRange.end, dateRange.start, userType])

  

  let scheduledTrips: any = null;
  let assignedTrips: any = null;
  let completedTrips: any = null;
  if (allTrips && allTrips.length >= 1) {
    allTrips.map((a) => {
      if (a.status === "completed") {
        completedTrips = [];
        completedTrips.push(a);
      } else if (a.status === "scheduled") {
        scheduledTrips = [];
        scheduledTrips.push(a);
      } else if (a.status === "assigned") {
        assignedTrips = [];
        assignedTrips.push(a);
      }
    });
  }
 
  console.log(scheduledTrips, "scheduledTrips");
  return (
    <>
      <SubHeader header="Records" hideBack />
      <div className="flex py-4">
        <p
          className={`border-r cursor-pointer  pr-4 ${
            activeOption === "Today"
              ? "text-primary font-bold"
              : "text-gray-600"
          }`}
          onClick={() => {
            setDateRange({
              start: formattedDate,
              end: formattedDate,
            });
            setActiveOption("Today");
          }}
        >
          Today
        </p>
        <p
          className={`border-r cursor-pointer  px-4 ${
            activeOption === "Yesterday"
              ? "text-primary font-bold"
              : "text-gray-600"
          }`}
          onClick={() => {
            setDateRange({
              start: formattedDate,
              end: `${year}-${month < 10 ? "0" : ""}${month}-${
                day - 1 < 10 ? "0" : ""
              }${day - 1}`,
            });
            setActiveOption("Yesterday");
          }}
        >
          Yesterday
        </p>
        <p
          className={`border-r cursor-pointer  px-4 ${
            activeOption === "Current Week"
              ? "text-primary font-bold"
              : "text-gray-600"
          }`}
          onClick={() => {
            setDateRange({
              start: formattedDate,
              end: `${year}-${month < 10 ? "0" : ""}${month}-${
                day + 7 < 10 ? "0" : ""
              }${day + 7}`,
            });
            setActiveOption("Current Week");
          }}
        >
          Current Week
        </p>
        <p
          className={`border-r cursor-pointer  px-4 ${
            activeOption === "Previous Week"
              ? "text-primary font-bold"
              : "text-gray-600"
          }`}
          onClick={() => {
            setDateRange({
              start: formattedDate,
              end: `${year}-${month < 10 ? "0" : ""}${month}-${
                day - 7 < 10 ? "0" : ""
              }${day - 7}`,
            });
            setActiveOption("Previous Week");
          }}
        >
          Previous Week
        </p>
        <p
          className={`border-r  cursor-pointer px-4 ${
            activeOption === "Current Month"
              ? "text-primary font-bold"
              : "text-gray-600"
          }`}
          onClick={() => {
            setDateRange({
              start:  `${year}-${month < 10 ? "0" : ""}${month}-${
               1 < 10 ? "0" : ""
              }${1}`,
              end:formattedDate ,
            });
            setActiveOption("Current Month");
          }}
        >
          Current Month
        </p>
        <p
          className={`pl-4 ${
            activeOption === "Previous Month"
              ? "text-primary font-bold"
              : "text-gray-600"
          }`}
          onClick={() => {
            setDateRange({
              start: `${year}-${month - 1 < 10 ? "0" : ""}${month - 1}-${
                1 < 10 ? "0" : ""
              }${1}`,
              end: `${year}-${month - 1 < 10 ? "0" : ""}${month - 1}-${
                29 < 10 ? "0" : ""
              }${29}`,
            });
            setActiveOption("Previous Month");
          }}
        >
          Previous Month
        </p>
      </div>
      <div className="flex my-6">
        <div className="flex items-center">
          <p className="mr-6">Date From</p>
          <Input
            containerStyle={`mt-0`}
            inputStyle={` bg-gray-100 border-0 pl-10 `}
            placeholder=""
            type={"date"}
            id=""
            name=""
            value={dateRange.start}
            onChange={(e: any) =>
              setDateRange((a: any) => {
                return {
                  start: e.target.value,
                  end: a.end,
                };
              })
            }
            // onBlur={formik.handleBlur}
            // error={formik.touched.password && formik.errors.password}
          />
        </div>
        <div className="flex ml-8 items-center">
          <p className="mr-6">Date To</p>
          <Input
            containerStyle={`mt-0`}
            inputStyle={` bg-gray-100 border-0 pl-10 `}
            placeholder=""
            type={"date"}
            id=""
            name=""
            value={dateRange.end}
            onChange={(e: any) =>
              setDateRange((a: any) => {
                return {
                  start: a.start,
                  end: e.target.value,
                };
              })
            }
            // onBlur={formik.handleBlur}
            // error={formik.touched.password && formik.errors.password}
          />
        </div>
      </div>
      <div className="w-[551px]">
        <div>
          <Dropdown
            options={option}
            placeholder="Select Park"
            onSelect={(e) => setSelectedPark(e)}
            className="w-[551px]"
          />
        </div>
        <div className="mt-10">
          <Button
            type="button"
            disabled={
              !dateRange.start ||
              !dateRange.end ||
              !activeOption ||
              !selectedPark
            }
            onClick={() => onSubmit()}
            className="w-full bg-white text-primary bg-opacity-20 hover:bg-primary border border-2 border-primary hover:text-white"
          >
            See Statement
          </Button>
        </div>
        {/* <div className="my-10">
          <RadioButton
            name="selectedVehicle"
            options={transportOptions}
            data={selectedVehicle}
            onSelect={setSelectedVehicle}
            className="grid grid-cols-4  rounded-none gap-x-4 bg-white p-0"
            customInputWrapperStyle="bg-gray-100 w-32 h-[105px] flex items-center justify-center rounded-xl"
            customActiveStyle="border border-2 border-primary"
          />
        </div> */}
      </div>
      <div>
        <MyTabs
          headers={["Scheduled Trip", "Assigned Trip", "Completed Trips"]}
          components={[
            <ScheduledTrips key="1" data={scheduledTrips} />,
            <AssignedTrips key="2" data={assignedTrips} />,
            <CompletedTrips key="3" data={completedTrips} />,
          ]}
        />
      </div>
    </>
  );
}
