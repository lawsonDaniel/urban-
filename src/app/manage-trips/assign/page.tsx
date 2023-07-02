"use client";
import React, { useState, useEffect } from "react";
import SubHeader from "../../components/headers/sub-header";
import { useFormik } from "formik";
import Dropdown from "@/app/components/dropdown";
import Input from "@/app/components/input";
import Button from "@/app/components/button";
import Switch from "@/app/components/switch";
import { getAll } from "@/common/hooks/fireStore";
import { USER_TYPE } from "@/common/types";
import { DocumentSnapshot } from "firebase/firestore";
import { updateOne } from "@/common/hooks/fireStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

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
  const getAllDriver = async () => {};
  const getAllTrips = async () => {};
  useEffect(() => {
    getAllDriver();
    getAllTrips();
  }, [getAll]);
  console.log(Trip, "Trip");

  const DriverOption = Driver.map((a: any) => {
    return {
      value: a?.id,
      label: a?.data?.full_name,
    };
  });
  const TripOption = Trip.map((a: any) => {
    return {
      value: a?.id,
      label: a?.data?.tripCode,
    };
  });
  console.log(Driver, "driver option");
  const formik = useFormik({
    initialValues: {},
    onSubmit: async (values: any) => {
      setIsLoading(true);
      if (selectedPark && selectedDriver) {
        values = {
          Driver: selectedDriver,
        };
      } else {
        toast.error("fill all the form fields");
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
