"use client";
import React, { useState, useEffect } from "react";
import SubHeader from "../../components/headers/sub-header";
import { useFormik } from "formik";
import Dropdown from "@/app/components/dropdown";
import Button from "@/app/components/button";
import { getAll } from "@/common/hooks/fireStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import driverOBJs from "@/common/classes/driver.class";
import tripOBJs from "@/common/classes/trip.class";

export default function Assign() {
  const router = useRouter();
  const lugage = [
    { value: "normal", label: "Normal Luggage" },
    { value: "extra", label: "Extra Luggage" },
  ];
  const [search, setSearch] = useState("");
  const [selectedPark, setSelectedPark]: any = useState();
  const [selectedDriver, setSelectedDriver] = useState();

  const [Driver, setDriver] = useState<any[]>([]);
  const [Trip, setTrip] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getAllDriver = async () => {
    driverOBJs.getAll().then((res)=>{
      console.log(res?.data,"driver")
      setDriver(res?.data)
    })
  };
  const getAllTrips = async () => {
  tripOBJs.getAll().then((res)=>{
    console.log(res,"trips")
    setTrip(res)
  })
  };
  useEffect(() => {
    getAllDriver();
    getAllTrips();
  }, [getAll]);
  console.log(Trip, "Trip");

  const DriverOption = Driver.map((a: any) => {
    return {
      value: a?.id,
      label: a?.fullName,
    };
  });
  const TripOption = Trip.map((a: any) => {
    return {
      value: a?.id,
      label: a?.tripCode,
    };
  });
 
  const formik = useFormik({
    initialValues: {},
    onSubmit: async (values: any) => {
      setIsLoading(true);
      if (selectedPark && selectedDriver) {
        values = {
          driverId: selectedDriver,
        };
        tripOBJs.assignVechicle(values).then((res)=>{
          toast.success('successfully assigned vechicle')
          setIsLoading(false)
        }).catch((err)=>{
          toast.error(err?.message)
          setIsLoading(false)
        })
      } else {
        toast.error("fill all the form fields");
        setIsLoading(false)
      }
      // openModal()
    },
  });

  const [isToggled, setIsToggled] = useState<boolean>(false);

  const handleToggle = (isChecked: boolean) => {
    setIsToggled(isChecked);
  };

  return (
    <>
      <SubHeader header="Assign Vehicle & Driver" hideRight />
      <form className="mt-10" onSubmit={formik.handleSubmit}>
        <div className=" w-[510px]">
          <Dropdown
            options={TripOption}
            placeholder="Option"
            label="Select Trip"
            onSelect={(e: any) => setSelectedPark(e)}
            className="w-[510px]"
            // error={formik.touched.departurePark && formik.errors.departurePark}
          />

          <Dropdown
            options={DriverOption}
            placeholder="Option"
            label="Select Driver"
            onSelect={(e: any) => setSelectedDriver(e)}
            className="w-[510px] mr-4"
          />
          {/*<Input*/}
          {/*  containerStyle={`mt-8`}*/}
          {/*  inputStyle={`bg-gray-100 border-0 pl-10 w-[510px]`}*/}
          {/*  placeholder={"Search Driver"}*/}
          {/*  type={"text"}*/}
          {/*  id="search"*/}
          {/*  name="search"*/}
          {/*  value={search}*/}
          {/*  onChange={(e) => setSearch(e.target.value)}*/}
          {/*  // onBlur={formik.handleBlur}*/}
          {/*  // error={formik.touched.password && formik.errors.password}*/}
          {/*/>*/}
          <ToastContainer />
        </div>
        <div className=" w-[510px]">
          <Button
            disabled={!selectedDriver && !selectedPark}
            type="submit"
            className="w-full mt-20 text-white"
          >
            {isLoading ? "loading" : "Assign"}
          </Button>
        </div>
      </form>
    </>
  );
}
