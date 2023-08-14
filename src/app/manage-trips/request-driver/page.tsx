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
import parkOBJ from "@/common/classes/park.class";

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
  const getAllPark = async () => {
    parkOBJ.getAllByUser().then((res) => {
      console.log(res, "park from option");
      setAllPark(res);
    });
  };
  const getAllProviderAgency = async () => {};
  useEffect(() => {
    getAllPark();
    getAllProviderAgency();
  }, [getAll]);

  let parkOption: [{ value: any; label: string }];

  if (allPark && allPark?.parks?.length >= 1) {
    parkOption = allPark.parks?.map((a: any) => ({
      value: a?.id,
      label: a?.name,
    }));
  } else {
    parkOption = [
      {
        value: null,
        label: "no Park found",
      },
    ];
  }

  let providerAgencyOption: [{ value: any; label: string }];
  console.log(allProviderAgency, "provider agency");
  if (allProviderAgency && allProviderAgency.length >= 1) {
    providerAgencyOption = allProviderAgency.map((a: any) => ({
      value: a?.id,
      label: a?.data?.name,
    }));
  } else {
    providerAgencyOption = [
      {
        value: null,
        label: "no Provider found",
      },
    ];
  }

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
      if (
        selectedPark &&
        ProviderAgency &&
        selectedPark != null &&
        ProviderAgency != null
      ) {
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
            label="Select Trip Code"
            onSelect={(e: any) => setSelectedPark(e)}
            className="w-[510px]"
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
            disabled={
              !selectedPark &&
              !ProviderAgency &&
              selectedPark === null &&
              ProviderAgency === null
            }
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
