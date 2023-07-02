"use client";
import React, { useState, useEffect } from "react";
import SubHeader from "../../components/headers/sub-header";
import { useFormik } from "formik";
import Dropdown from "@/app/components/dropdown";
import Input from "@/app/components/input";
import Button from "@/app/components/button";
import Switch from "@/app/components/switch";
import * as Yup from "yup";
import { saveTrip } from "@/common/hooks/fireStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAll } from "@/common/hooks/fireStore";
import { DocumentSnapshot } from "@firebase/firestore";
import { useRouter } from "next/navigation";
import {parseCookies, setCookie} from "nookies";

export default function SetTrip() {
  const lugage = [
    { value: "normal", label: "Normal Luggage" },
    { value: "extra", label: "Extra Luggage" },
  ];
  const carType = [
    { value: "sedan", label: "Sedan" },
    { value: "bus", label: "Bus" },
  ];

  const cookies = parseCookies();


  const stored = cookies.trip ? JSON.parse(cookies.trip) : null;


  const [selectedPark, setSelectedPark] = useState();
  const [selectedLuggage, setSelectedLuggage] = useState();
  const [selectedCar, setSelectedCar] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [Park, setPark] = useState<any[]>([]);
  const router = useRouter();
  const getAllParks = async () => {
    
  };

  useEffect(() => {
    getAllParks();
  }, [getAll]);
  const parkOption = Park.map((a: any) => {
    return {
      value: a?.parkName,
      label: a?.parkName,
    };
  });

  const validationSchema = Yup.object().shape({
    departureTime: Yup.string().required("Please enter the departure time."),
    departureCity: Yup.string().required("Please enter the departure city."),
    tripCode: Yup.string().required("Please enter the trip code."),
    fare: Yup.string().required("Please enter the fare."),
    date: Yup.string().required("Please enter the date."),
    priceKg: Yup.string(),
  });


  const formik = useFormik({
    initialValues: {
      departureTime: stored?.departureTime||"",
      departureCity: stored?.departureCity||"",
      tripCode: stored?.tripCode|| "",
      fare:  stored?.fare|| "",
      date:  stored?.date|| "",
      priceKg:  stored?.priceKg|| "",
    },
    validationSchema,
    onSubmit: async (values: any) => {
      if (selectedLuggage && selectedPark) {
        values = {
          departurePark: selectedPark,
          luggageType: selectedLuggage,
          postingType: "",
          Driver: "",
          requestStatus: "pending",
          vehicleType: selectedCar,
          ...values,
        };
        setCookie(null, "trip", JSON.stringify(values), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        router.push('/manage-trips/set-trip/preview');
        // setIsLoading(true);
        // try {
          // const res = await saveTrip(values);
          // console.log(res, "trip");
          // toast.success("Trip succesfully added");
          // router.push("/manage-trips/");
          // setIsLoading(false);
        // } catch (error: any) {
          // console.error(error, "trip");
          // // @ts-ignore
          // toast.error(error);
          // setIsLoading(false);
        // }
      } else {
        toast.error("fill all the form fields");
      }
      // router.push(routes.ADD_PARK.path)

      // openModal()
    },
  });
  console.log(formik.errors, "error");
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const handleToggle = (isChecked: boolean) => {
    setIsToggled(isChecked);
  };

  return (
    <>
      <SubHeader header="Set Trip" hideRight />
      <form className="mt-10" onSubmit={formik.handleSubmit}>
        <div className=" w-[510px]">
          <Dropdown
            options={parkOption}
            placeholder="Option"
            label="Departure Park"
            onSelect={(e: any) => setSelectedPark(e)}
            className="w-[510px]"
          />
          <Input
            label="Departure Time"
            type="time"
            id="departureTime"
            name="departureTime"
            value={formik.values.departureTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={(formik.touched.departureTime && formik.errors.departureTime)as boolean}
          />
          <Input
            label="Date"
            type="date"
            id="date"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={(formik.touched.date && formik.errors.date)as boolean}
          />
          <Input
            label="Departure City"
            type="text"
            id="departureCity"
            name="departureCity"
            value={formik.values.departureCity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={(formik.touched.departureCity && formik.errors.departureCity)as boolean}
          />
          <Input
            label="Trip Code"
            type="text"
            id="tripCode"
            name="tripCode"
            value={formik.values.tripCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={(formik.touched.tripCode && formik.errors.tripCode)as boolean}
          />
          <Input
            label="Fare"
            type="text"
            id="fare"
            name="fare"
            value={formik.values.fare}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={(formik.touched.fare && formik.errors.fare)as boolean}
          />
          <Dropdown
              options={carType}
              placeholder="Type of Vehicle"
              label="Type of Vehicle"
              onSelect={(e: any) => setSelectedCar(e)}
              className="w-[510px]"
          />
          {/*<Input*/}
          {/*  label="Type of Vehicle"*/}
          {/*  type="text"*/}
          {/*  id="typeOfVechicle"*/}
          {/*  name="typeOfVechicle"*/}
          {/*  value={formik.values.typeOfVechicle}*/}
          {/*  onChange={formik.handleChange}*/}
          {/*  onBlur={formik.handleBlur}*/}
          {/*  error={*/}
          {/*    formik.touched.typeOfVechicle && formik.errors.typeOfVechicle*/}
          {/*  }*/}
          {/*/>*/}
          <div className="flex justify-between mt-2">
            <p className="text-sm text-gray-500">Number of seats</p>
            <p className="text-sm text-gray-500">15</p>
          </div>
        </div>

        <div className="flex  mt-2">
          <div className="w-[510px]">
            <Dropdown
              options={lugage}
              placeholder="Option"
              label="Luggage Category"
              onSelect={(e: any) => setSelectedLuggage(e)}
              className="w-[510px] mr-4"
            />
          </div>
          {selectedLuggage === "extra" && (
            <Input
              label="Input Price/kg"
              type="text"
              id="priceKg"
              name="priceKg"
              value={formik.values.priceKg}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={(formik.touched.priceKg && formik.errors.priceKg)as boolean}
              containerStyle="ml-3 mt-9"
            />
          )}
        </div>
        <div className=" w-[510px]">
          <div className="flex justify-between mt-10 w-[510px]">
            <p className="text-sm text-gray-500">Posting Type</p>
            <Switch label="Public" />
          </div>
          <ToastContainer />
          <Button
            disabled={
              !selectedLuggage &&
              !selectedPark &&
              formik.errors == null &&
              isLoading
            }
            type="submit"
            className="w-full mt-20 text-white"
          >
            {isLoading ? "loading" : "Set Trip"}
          </Button>
        </div>
      </form>
    </>
  );
}
