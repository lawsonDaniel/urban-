"use client";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

import Header from "../../(components)/header";
import Input from "@/app/components/input";
import Dropdown from "@/app/components/dropdown";
import Button from "@/app/components/button";
import { routes } from "@/common/routes";
import authOBJ from "@/common/classes/auth.class";

export default function AddPark() {
  const router = useRouter();

  const cookies = parseCookies();
  const ParkOwner = cookies.ParkOwner ? JSON.parse(cookies.ParkOwner) : null;

  const [isLoading, setIsLoading] = useState(false);
  const [parkLocation, setParkLocation] = useState("");
  const [parkCity, setParkCity] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

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

  const validationSchema = Yup.object({
    parkName: Yup.string().required("Name of park is required"),
    parkFullAddress: Yup.string().required("Full address is required"),
  });

  const formik = useFormik({
    initialValues: {
      parkName: "",
      parkFullAddress: "",
      parkState: "",
      parkCity: "",
      parkRegion: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values.parkState = parkLocation;
      values.parkRegion = selectedRegion;
      values.parkCity = parkCity;
      values = {
        ...values,
        ...ParkOwner,
      };

      if (parkLocation && parkCity && selectedRegion) {
        setIsLoading(true);

        console.log(values, "from the park");

        authOBJ
          .register(values, "parkOwner")
          .then((res) => {
            toast.success(res?.data.message);
            authOBJ
              .currentUser()
              .then((res) => {
                router.push("/");
              })
              .catch((err) => {
                router.push("/auth/login");
              });
            destroyCookie(null, "ParkOwner", { path: "/" });
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err?.message);
            toast.error(err?.response?.data?.message);
            setIsLoading(false);
          });
      } else {
        toast.error("Fill all values");
        setIsLoading(false);
      }
    },
  });

  return (
    <div>
      <Header heading="Add Park" desc="Add at least one park" step={2} />

      <div>
        <form className="mt-10" onSubmit={formik.handleSubmit}>
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

          <Dropdown
            options={options}
            placeholder="State"
            label="Select State"
            onSelect={(e) => setParkLocation(e)}
            className="w-[510px]"
          />

          <Dropdown
            options={parkRegion}
            placeholder="park city"
            label="Select city"
            onSelect={(e) => setParkCity(e)}
            className="w-[510px]"
          />

          <Dropdown
            options={parkRegion}
            placeholder="Region"
            label="Select Region"
            onSelect={(e) => setSelectedRegion(e)}
            className="w-[510px]"
          />

          <Input
            label="Full Address"
            type="tel"
            id="parkFullAddress"
            name="parkFullAddress"
            value={formik.values.parkFullAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.parkFullAddress && formik.errors.parkFullAddress
            }
          />

          <Button
            type="submit"
            className="w-full mt-10 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Loading" : "Sign up"}
          </Button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}
