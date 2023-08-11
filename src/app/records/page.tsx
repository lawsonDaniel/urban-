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

export default function Records() {
  const [parks, setParks] = useState<any[]>([]);

  let option: { value: any; label: any; }[]
  
  if(parks &&  parks?.length >= 1){
    option =  parks?.map((park: any) => ({
      value: park.id,
      label: park.name,
    }))
  }else{
    option = [{
      value:null,
      label : 'no Park found'
    }]
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
  const [activeOption, setActiveOption] = useState<any>("Today");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1; // Months are zero-indexed, so adding 1
const day = today.getDate();
const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
const [dateRange,setDateRange] = useState<any>({
  start:formattedDate,
  end:formattedDate
})

useEffect(()=>{
  if(classifyDate(dateRange.start,dateRange.end)){
    setActiveOption(classifyDate(dateRange.start,dateRange.end))
  }else{
    setActiveOption("Today")
    setDateRange({
      start:formattedDate,
      end:formattedDate
    })
  }
 
},[dateRange])

  useEffect(() => {
    const getAllParks = async () => {
    try {
     const res:any = await parkOBJ.getAll()
      setParks(res?.parks)
      console.log("parks:", parks);
    } catch (err) {
      console.log(err);
    }
  };
    getAllParks();
  }, []);

 
  let scheduledTrips: any = null;
  let assignedTrips: any = null;
  let completedTrips: any = null;

  
  //working on the park statement
  if(selectedPark){
    router.push(`/park-statements/manager?`)
  }
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
          onClick={() => setActiveOption("Today")}
        >
          Today
        </p>
        <p
          className={`border-r cursor-pointer  px-4 ${
            activeOption === "Yesterday"
              ? "text-primary font-bold"
              : "text-gray-600"
          }`}
          onClick={() => setActiveOption("Yesterday")}
        >
          Yesterday
        </p>
        <p
          className={`border-r cursor-pointer  px-4 ${
            activeOption === "Current Week"
              ? "text-primary font-bold"
              : "text-gray-600"
          }`}
          onClick={() => setActiveOption("Current Week")}
        >
          Current Week
        </p>
        <p
          className={`border-r cursor-pointer  px-4 ${
            activeOption === "Previous Week"
              ? "text-primary font-bold"
              : "text-gray-600"
          }`}
          onClick={() => setActiveOption("Previous Week")}
        >
          Previous Week
        </p>
        <p
          className={`border-r  cursor-pointer px-4 ${
            activeOption === "Current Month"
              ? "text-primary font-bold"
              : "text-gray-600"
          }`}
          onClick={() => setActiveOption("Current Month")}
        >
          Current Month
        </p>
        <p
          className={`pl-4 ${
            activeOption === "Previous Month"
              ? "text-primary font-bold"
              : "text-gray-600"
          }`}
          onClick={() => setActiveOption("Previous Month")}
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
            onChange={
             (e:any)=> setDateRange((a:any)=>{
              return({
                start:e.target.value,
                end:a.end
              })
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
            onChange={
             (e:any)=> setDateRange((a:any)=>{
              return({
                start:a.start,
                end:e.target.value
              })
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
            
            className="w-full bg-white text-primary bg-opacity-20 hover:bg-primary border border-2 border-primary hover:text-white"
          >
            See Statement
          </Button>
        </div>
        <div className="my-10">
          <RadioButton
            name="selectedVehicle"
            options={transportOptions}
            data={selectedVehicle}
            onSelect={setSelectedVehicle}
            className="grid grid-cols-4  rounded-none gap-x-4 bg-white p-0"
            customInputWrapperStyle="bg-gray-100 w-32 h-[105px] flex items-center justify-center rounded-xl"
            customActiveStyle="border border-2 border-primary"
          />
        </div>
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
