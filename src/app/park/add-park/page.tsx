"use client";
import Button from "@/app/components/button";
import Dropdown from "@/app/components/dropdown";
import SubHeader from "@/app/components/headers/sub-header";
import Input from "@/app/components/input";
import Modal from "@/app/components/modal";
import SuccessModal from "@/app/components/modal/sucess-modal";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { MdOutlineCelebration } from "react-icons/md";
import { useUserType } from "@/common/hooks/useUserType";
import { savePark } from "@/common/hooks/fireStore";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GenerateID } from "@/common/utils";
import parkOBJ from "@/common/classes/park.class";
import { GetUserData } from "@/common/hooks/token";
import { routes } from "@/common/routes";

export default function AddPark() {
  const options = [
    { label: "Abuja", value: "abuja" },
    { label: "Lagos", value: "lagos" },
  ];
  const parkRegion = [
    { value: "NORTH_CENTRAL", label: "NORTH CENTRAL" },
    { value: "NORTH_EAST", label: "NORTH EAST" },
    { value: "SOUTH_EAST", label: "SOUTH EAST" },
    { value: "SOUTH_WEST", label: "SOUTH WEST" },
    { value: "SOUTH_SOUTH", label: "SOUTH SOUTH" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUser] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedRegion, setSelectedRegion] = useState();
  const router = useRouter();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  console.log("parkID::::", GenerateID("UB"));
console.log(selectedState,selectedRegion,selectedCity,'values')
  const formik = useFormik({
    initialValues: {
      parkName: "",
      fullAddress: "",
      parkPhoneNumber: "",
    },
    onSubmit: async (values: any) => {
      setIsLoading(true);
      const data = {
        name: values.parkName,
        parkOwnerId: GetUserData().id,
        state: selectedState,
        city: selectedCity,
        region: selectedRegion,
        fullAddress: values.fullAddress,
      };
      if (selectedState && selectedRegion && selectedCity) {
        console.log(data)
        parkOBJ
          .create(data)
          .then((res) => {
            toast.success(res?.data.message);
            router.push("/park");
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err?.message);
            toast.error(err?.response?.data?.message);
            setIsLoading(false);
          });
      } else {
        toast.error("fill all values");
        setIsLoading(false);
      }
    },
  });

  return (
    <div>
      <SubHeader header="Add Park" hideRight />
      <form className="mt-10 w-[510px]" onSubmit={formik.handleSubmit}>
        <Input
          label="Name of Park"
          type="text"
          id="parkName"
          name="parkName"
          value={formik.values.parkName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.parkName && formik.errors.parkName}
        />
        {/* <Dropdown
          options={options}
          placeholder="Option"
          label="Select Park"
          onSelect={(e: any) => setSelectedPark(e)}
          className="w-[510px]"
        />
        */}
        <Dropdown
          options={options}
          placeholder="State"
          label="Select State"
          onSelect={(e: any) => setSelectedState(e)}
          className="w-[510px]"
        />
        <Dropdown
          options={parkRegion}
          placeholder="Region"
          label="Select Region"
          onSelect={(e: any) => setSelectedRegion(e)}
          className="w-[510px]"
        />
        <Dropdown
          options={options}
          placeholder="City"
          label="Select City"
          onSelect={(e: any) => setSelectedCity(e)}
          className="w-[510px]"
        />
        <Input
          label="Full Address"
          type="text"
          id="fullAddress"
          name="fullAddress"
          value={formik.values.fullAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.fullAddress && formik.errors.fullAddress}
        />
        {/*<Input*/}
        {/*  label="Park Phone Number"*/}
        {/*  type="phone"*/}
        {/*  id="parkPhoneNumber"*/}
        {/*  name="parkPhoneNumber"*/}
        {/*  value={formik.values.parkPhoneNumber}*/}
        {/*  onChange={formik.handleChange}*/}
        {/*  onBlur={formik.handleBlur}*/}
        {/*  error={*/}
        {/*    formik.touched.parkPhoneNumber && formik.errors.parkPhoneNumber*/}
        {/*  }*/}
        {/*/>*/}
        <Button type="submit" className="w-full mt-10 text-white">
          {isLoading ? "loading" : "Add Park"}
        </Button>
      </form>
      <SuccessModal
        title="Park Added"
        desc="You have successfully added a new park."
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <ToastContainer />
    </div>
  );
}
