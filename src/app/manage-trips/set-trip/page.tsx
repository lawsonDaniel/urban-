"use client";
import React, { useState, useEffect } from "react";
import SubHeader from "../../components/headers/sub-header";
import { useFormik } from "formik";
import Dropdown from "@/app/components/dropdown";
import Input from "@/app/components/input";
import Button from "@/app/components/button";
import Switch from "@/app/components/switch";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAll } from "@/common/hooks/fireStore";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie } from "nookies";
import parkOBJ from "@/common/classes/park.class";
import { useUserInfo } from "@/common/hooks/getUserInfo";

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

  const [selectedPark, setSelectedPark] = useState('');
  const [selectedLuggage, setSelectedLuggage] = useState(stored?.lugage || '');
  const [selectedCar, setSelectedCar] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [Park, setPark] = useState<any[]>([]);
  const [isPublic,setIsPublic] = useState<boolean>(false)

  const router = useRouter();
  const getAllParks = async () => {
    parkOBJ.getAll().then((res)=>{
      console.log(res,'park from option')
      setPark(res)
    })
  };

  useEffect(() => {
    getAllParks();
  }, []);
  const parkOption = Park[0]?.map((a: any) => {
    return {
      value: a?.id,
      label: a?.name,
    };
  });
  console.log(parkOption,'optio')
  const userData:any = useUserInfo()
  const validationSchema = Yup.object().shape({
    departureTime: Yup.string().required("Please enter the departure time."),
    departureCity: Yup.string().required("Please enter the departure city."),
    arivalCity: Yup.string().required("Please enter the arival city."),
    // tripCode: Yup.string().required("Please enter the trip code."),
    fare: Yup.string().required("Please enter the fare."),
    date: Yup.string().required("Please enter the date."),
    priceKg: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      departureTime: stored?.time || "",
      departureCity: stored?.startLocation || "",
      arivalCity: stored?.endLocation || "",
      // tripCode: stored?.tripCode || "",
      fare: stored?.fare || "",
      date: stored?.date || "",
      priceKg: stored?.priceKg || "",
    },
    validationSchema,
    onSubmit: async (values: any) => {
      if (selectedLuggage && selectedPark) {
        const currentDate = new Date()
        const data = {
          parkId: userData?.id,
          startLocation: values.departureCity,
           endLocation: values.arivalCity,
           fare:values.fare,
           lugage:selectedLuggage,
           isPublic: isPublic,
           date:values.date,
           time:values.departureTime,
          
        }
        console.log(data,'data')
        setCookie(null, "trip", JSON.stringify(data), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        router.push("/manage-trips/set-trip/preview");
       
      } else {
        toast.error("fill all the form fields");
      }
      
    },
  });
  console.log(formik.errors, "error");
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const handleToggle = (isChecked: boolean) => {
    setIsToggled(isChecked);
  };

  console.log(useUserInfo(),'user info from the user')



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
            error={
              (formik.touched.departureTime &&
                formik.errors.departureTime) as boolean
            }
          />
          <Input
            label="Date"
            type="date"
            id="date"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={(formik.touched.date && formik.errors.date) as boolean}
          />
          <Input
            label="Departure City"
            type="text"
            id="departureCity"
            name="departureCity"
            value={formik.values.departureCity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              (formik.touched.departureCity &&
                formik.errors.departureCity) as boolean
            }
          />
          <Input
            label="Arival City"
            type="text"
            id="arivalCity"
            name="arivalCity"
            value={formik.values.arivalCity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              (formik.touched.arivalCity &&
                formik.errors.arivalCity) as boolean
            }
          />
          {/* <Input
            label="Trip Code"
            type="text"
            id="tripCode"
            name="tripCode"
            value={formik.values.tripCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              (formik.touched.tripCode && formik.errors.tripCode) as boolean
            }
          /> */}
          <Input
            label="Fare"
            type="text"
            id="fare"
            name="fare"
            value={formik.values.fare}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={(formik.touched.fare && formik.errors.fare) as boolean}
          />
          {/* <Dropdown
            options={carType}
            placeholder="Type of Vehicle"
            label="Type of Vehicle"
            onSelect={(e: any) => setSelectedCar(e)}
            className="w-[510px]"
          /> */}
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
          {/* <div className="flex justify-between mt-2">
            <p className="text-sm text-gray-500">Number of seats</p>
            <p className="text-sm text-gray-500">15</p>
          </div> */}
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
              error={
                (formik.touched.priceKg && formik.errors.priceKg) as boolean
              }
              containerStyle="ml-3 mt-9"
            />
          )}
        </div>
        <div className=" w-[510px]">
          <div className="flex justify-between mt-10 w-[510px]">
            <p className="text-sm text-gray-500">Posting Type</p>
            <Switch label="Public" checked={isPublic} setchecked={setIsPublic}/>
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
