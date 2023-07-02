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
import {GenerateID} from "@/common/utils";

export default function AddPark() {
  const options = [
    { value: "bus", label: "Bus" },
    { value: "sedan", label: "Sedan" },
    { value: "van", label: "Van" },
    { value: "others", label: "Others" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUser] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid, "user id");
        setUser(uid);
      }
    });
  }, [auth]);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  console.log("parkID::::",GenerateID("UB"))

  const formik = useFormik({
    initialValues: {
      parkName: "",
      fullAddress: "",
      parkPhoneNumber: "",
    },
    onSubmit: async (values: any) => {
      setIsLoading(true);
     

      // router.push(routes.ADD_PARK.path)
    },
  });

  const [selectedPark, setSelectedPark] = useState();

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
        <Dropdown
          options={options}
          placeholder="City"
          label="Select City"
          onSelect={(e: any) => setSelectedPark(e)}
          className="w-[510px]"
        /> */}
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
        <Input
          label="Park Phone Number"
          type="phone"
          id="parkPhoneNumber"
          name="parkPhoneNumber"
          value={formik.values.parkPhoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.parkPhoneNumber && formik.errors.parkPhoneNumber
          }
        />
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
