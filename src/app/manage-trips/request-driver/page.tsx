"use client";
import React, { useState, useEffect } from "react";
import SubHeader from "../../components/headers/sub-header";
import { useFormik } from "formik";
import Dropdown from "@/app/components/dropdown";
import Input from "@/app/components/input";
import Textarea from "@/app/components/textarea";
import Button from "@/app/components/button";
import Switch from "@/app/components/switch";
import { getAll, saveData } from "@/common/hooks/fireStore";
import { DocumentSnapshot } from "firebase/firestore";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function RequestDriver() {
  const lugage = [
    { value: "normal", label: "Normal Luggage" },
    { value: "extra", label: "Extra Luggage" },
  ];
  const router = useRouter();
  const [ProviderAgency, setProviderAgency] = useState();
  const [selectedPark, setSelectedPark] = useState();
  const [selectedLuggage, setSelectedLuggage] = useState();
  const [allPark, setAllPark] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allProviderAgency, setAllProviderAgency] = useState<any>([]);
  const getAllPark = async () => {};
  const getAllProviderAgency = async () => {};
  useEffect(() => {
    getAllPark();
    getAllProviderAgency();
  }, [getAll]);

  const parkOption =
    allPark &&
    allPark.map((a: any) => {
      return {
        value: a?.id,
        label: a?.data?.parkName,
      };
    });

  const providerAgencyOption =
    allProviderAgency &&
    allProviderAgency.map((a: any) => {
      return {
        value: a?.id,
        label: a?.data?.name,
      };
    });
  const validationSchema = Yup.object().shape({
    parkPhone: Yup.string().required("Park phone is required"),
    departureCity: Yup.string().required("Departure city is required"),
    destinationCity: Yup.string().required("Destination city is required"),
    departureDate: Yup.date().required("Departure date is required"),
    departureTime: Yup.string().required("Departure time is required"),
    additionalInfo: Yup.string(),
  });
  const formik = useFormik({
    initialValues: {
      parkPhone: "",
      departureCity: "",
      destinationCity: "",
      departureDate: "",
      departureTime: "",
      additionalInfo: "",
    },
    validationSchema,
    onSubmit: async (values: any) => {
      setIsLoading(true);
      if (selectedPark && ProviderAgency) {
        values = {
          providerAgency: ProviderAgency,
          park: selectedPark,
          requestStatus: "pending",
          ...values,
        };
      } else {
        toast.error("fill all the form fields");
      }
    },
  });

  const [isToggled, setIsToggled] = useState<boolean>(false);

  const handleToggle = (isChecked: boolean) => {
    setIsToggled(isChecked);
  };

  return (
    <>
      <SubHeader header="Request Driver" hideRight />
      <form className="mt-10" onSubmit={formik.handleSubmit}>
        <div className=" w-[510px]">
          <Dropdown
            options={providerAgencyOption}
            placeholder="Option"
            label="Select Provider Agency"
            onSelect={(e: any) => setProviderAgency(e)}
            className="w-[510px]"
          />
          <Dropdown
            options={parkOption}
            placeholder="Option"
            label="Select Park"
            onSelect={(e: any) => setSelectedPark(e)}
            className="w-[510px]"
          />
          <Input
            label="Park Phone Number"
            type="text"
            id="parkPhone"
            name="parkPhone"
            value={formik.values.parkPhone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.parkPhone && formik.errors.parkPhone}
          />

          <Input
            label="Departure City"
            type="text"
            id="departureCity"
            name="departureCity"
            value={formik.values.departureCity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.departureCity && formik.errors.departureCity}
          />
          <Input
            label="Destination City"
            type="text"
            id="destinationCity"
            name="destinationCity"
            value={formik.values.destinationCity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.destinationCity && formik.errors.destinationCity
            }
          />
          <Input
            label="Departure Date"
            type="date"
            id="departureDate"
            name="departureDate"
            value={formik.values.departureDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.departureDate && formik.errors.departureDate}
          />
          <Input
            label="Departure Time"
            type="time"
            id="departureTime"
            name="departureTime"
            value={formik.values.departureTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.departureTime && formik.errors.departureTime}
          />
          <Textarea
            label="Additional Info"
            type="text"
            id="additionalInfo"
            name="additionalInfo"
            value={formik.values.additionalInfo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.additionalInfo && formik.errors.additionalInfo
            }
          />

          <Button
            disabled={!selectedPark && !ProviderAgency}
            type="submit"
            className="w-full mt-20 text-white"
          >
            {isLoading ? "loading" : "Submit Request"}
          </Button>
          <ToastContainer />
        </div>
      </form>
    </>
  );
}
