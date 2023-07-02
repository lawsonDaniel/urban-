"use client";
import SubHeader from "../components/headers/sub-header";
import Dropdown from "../components/dropdown";
import { useEffect, useState } from "react";
import { RadioButton } from "../components/radio/auth.radio";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ScheduledTrips from "./(components)/scheduled-trip";
import AssignedTrips from "./(components)/assigned-trips";
import CompletedTrips from "./(components)/completedTrips";
import Button from "../components/button";
import MyTabs from "../components/tabs";
import { useRouter } from "next/navigation";
import Input from "@/app/components/input";
import { getAll } from "@/common/hooks/fireStore";
import { DocumentSnapshot } from "@firebase/firestore";

export default function Records() {
  const [parks, setParks] = useState<any[]>([]);

  const options = parks
    ? parks.map((park) => ({
        value: park.park_id,
        label: park.park_name,
      }))
    : null;

  const transportOptions = [
    { value: "bus", label: "Bus" },
    { value: "sedan", label: "Sedan" },
    { value: "van", label: "Van" },
    { value: "others", label: "Others" },
  ];

  const [trips, setTrips] = useState<any[]>([]);

  const router = useRouter();

  const [selectedPark, setSelectedPark] = useState<string>();
  const [activeOption, setActiveOption] = useState<string>("Today");
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const getAllParks = async () => {
    try {
      const res = await getAll("parks",["=="],["manager_id"],["UB62333968"]);
      console.log(res);
      const parks: any[] = [];
      res.forEach((doc: DocumentSnapshot) => {
        parks.push(doc.data());
      });
      setParks(parks);
      console.log("parks:", parks);
    } catch (err) {
      console.log(err);
    }
  };
  const getAllTrips = async () => {
    if (selectedPark) {
      try {
        const whereClauses = [];

        if (selectedVehicle) {
          whereClauses.push({
            field: "vehicleType",
            operator: "==",
            value: selectedVehicle,
          });
        }

        whereClauses.push({
          field: "departureParkId",
          operator: "==",
          value: selectedPark,
        });

        const res = await getAll("trips",["=="],["vehicleType"],[selectedVehicle] );
        const trips: any[] = [];
        res.forEach((doc: DocumentSnapshot) => {
          trips.push(doc.data());
        });
        setTrips(trips);
        console.log("trips:", trips, res);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getAllParks();
  }, [getAll]);

  useEffect(() => {
    getAllTrips();
  }, [selectedPark]);

  let scheduledTrips: any = null;
  let assignedTrips: any = null;
  let completedTrips: any = null;

  if (trips) {
    const filteredTrips = trips.reduce(
      (acc, trip) => {
        if (trip.tripStatus === "SCHEDULED") {
          acc.scheduledTrips.push(trip);
        } else if (trip.tripStatus === "Assigned") {
          acc.assignedTrips.push(trip);
        } else if (trip.tripStatus === "Completed") {
          acc.completedTrips.push(trip);
        }
        return acc;
      },
      {
        scheduledTrips: [],
        assignedTrips: [],
        completedTrips: [],
      }
    );

    scheduledTrips = filteredTrips.scheduledTrips;
    assignedTrips = filteredTrips.assignedTrips;
    completedTrips = filteredTrips.completedTrips;
  }

  console.log("selectedPark?.value:", selectedPark, selectedVehicle);

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
            value={""}
            onChange={
              (e) => {}
              // setSearch(e.target.value)
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
            value={""}
            onChange={
              (e) => {}
              // setSearch(e.target.value)
            }
            // onBlur={formik.handleBlur}
            // error={formik.touched.password && formik.errors.password}
          />
        </div>
      </div>
      <div className="w-[551px]">
        <div>
          <Dropdown
            options={options}
            placeholder="Select Park"
            onSelect={(e) => setSelectedPark(e)}
            className="w-[551px]"
          />
        </div>
        <div className="mt-10">
          <Button
            type="button"
            onClick={() => router.push("/park-statements/manager")}
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
