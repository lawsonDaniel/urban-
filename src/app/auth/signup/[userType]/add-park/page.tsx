"use client";
import { useState, useEffect } from "react";
import Header from "../../(components)/header";
import { useFormik } from "formik";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { routes } from "@/common/routes";
import Input from "@/app/components/input";
import Dropdown from "@/app/components/dropdown";
import Button from "@/app/components/button";
import useLocalStorage from "@/common/hooks/localStorage";
import { setCookie } from "nookies";
import { savePark } from "../../../../../common/hooks/fireStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import authOBJ from "@/common/classes/auth.class";

interface ParkCoordinate {
  latitude: number;
  longitude: number;
}

export default function AddPark() {
  const options = [
    { label: "Abuja", value: "abuja" },
    { label: "Lagos", value: "lagos" },
  ];

  // const [user, setUser] = useLocalStorage<string>('userType', '')
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [parkCoordinate, setParkCoordinate] = useState<ParkCoordinate | null>(
    null
  );
  const [parkLocation, setParkLocation] = useState<string>("");
  const router: any = useRouter();

  //get user info
  let user = authOBJ.currentUser();
  console.log(user, "auth");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setParkCoordinate({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  const validationSchema = Yup.object({
    parkName: Yup.string().required("Name of park is required"),
    fullAddress: Yup.string().required("Full address is required"),
  });
  const formik = useFormik({
    initialValues: {
      parkName: "",
      fullAddress: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
    },
  });

  return (
    <div>
      <Header heading="Add Park" desc="Add at least one park" step={2} />
      <div>
        <form className="mt-10" onSubmit={formik.handleSubmit}>
          {/* <div className='mb-4'>
						<RadioButton
							name='userType'
							options={options}
							formik={formik}
							className='grid-cols-2'
						/>
					</div> */}
          <Input
            label="Name of Park"
            type="text"
            id="parkName"
            name="parkName"
            value={formik.values.parkName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.parkName && formik.errors.parkName}
            // icon={<LockClosedIcon />}
          />
          <Dropdown
            options={options}
            placeholder="City"
            label="Select City"
            onSelect={(e: any) => setParkLocation(e)}
            className="w-[510px]"
          />
          <Input
            label="Full Address"
            type="tel"
            id="fullAddress"
            name="fullAddress"
            value={formik.values.fullAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullAddress && formik.errors.fullAddress}
            // icon={<LockClosedIcon />}
          />
          {/* <Input
						label='Coordinate Of The Park'
						type='coordinateOfThePark'
						id='coordinateOfThePark'
						name='coordinateOfThePark'
						value={formik.values.coordinateOfThePark}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.coordinateOfThePark &&
							formik.errors.coordinateOfThePark
						}
					// icon={<LockClosedIcon />}
					/> */}
          <Button
            type="submit"
            className="w-full mt-10 text-white"
            disabled={isLoading}
            // disabled={!formik.errors ? true : false}
          >
            {isLoading ? "loading" : "sign up"}
          </Button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
