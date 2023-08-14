"use client";
import { useEffect, useState } from "react";
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
import { cityFCT, cityLagos } from "@/common/data";

export default function AddPark() {
  const router = useRouter();

  const cookies = parseCookies();
  const ParkOwner = cookies.ParkOwner ? JSON.parse(cookies.ParkOwner) : null;

  const [isLoading, setIsLoading] = useState(false);
  const [parkLocation, setParkLocation] = useState("");
  const [parkCity, setParkCity] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [cityObj, setCityObj] = useState<any>([
    {
      label: "select state",
      value: "",
    },
  ]);
  const [coordinateData, setCoordinateData] = useState({
    lat: "",
    long: "",
  });
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

  const setPArk = (e: any) => {
    setParkLocation(e);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    function showPosition(position: any) {
      console.log({ position });
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      setCoordinateData({
        lat: latitude,
        long: longitude,
      });
    }

    function showError(error: any) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          toast.error("Unable to get coordinates please eneter manually");
          break;
        case error.POSITION_UNAVAILABLE:
          toast.error("Unable to get coordinates please eneter manually");
          break;
        case error.TIMEOUT:
          toast.error("Unable to get coordinates please eneter manually");
          break;
        case error.UNKNOWN_ERROR:
          toast.error("Unable to get coordinates please eneter manually");
          break;
      }
    }
  }, []);

  useEffect(() => {
    if (parkLocation === "abuja") {
      setCityObj(cityFCT);
    } else {
      setCityObj(cityLagos);
    }
  }, [parkLocation]);
  const formik = useFormik({
    initialValues: {
      parkName: "",
      parkFullAddress: "",
      parkState: "",
      parkCity: "",
      coordinate: `[${coordinateData.lat},${coordinateData.long}]` || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values = {
        latitude: `${coordinateData.lat}`,
        longitude: `${coordinateData.long}`,
        parkName: values.parkName,
        parkFullAddress: values.parkFullAddress,
        parkState: parkLocation,
        parkCity: parkCity,
        ...ParkOwner,
      };

      if (parkLocation && parkCity) {
        setIsLoading(true);

        console.log(values, "from the park");

        authOBJ
          .register(values, "parkOwner")
          .then((res) => {
            toast.success(res?.data.message);
            router.push("/auth/login");
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
            onSelect={(e) => setPArk(e)}
            className="w-full"
          />

          <Dropdown
            options={cityObj}
            placeholder="park city"
            label="Select city"
            onSelect={(e) => setParkCity(e)}
            className="w-full"
          />

          {/*<Input*/}
          {/*  label="Coordinate"*/}
          {/*  type="text"*/}
          {/*  id="coordinate"*/}
          {/*  name="coordinate"*/}
          {/*  value={*/}
          {/*    `[${coordinateData.lat},${coordinateData.long}]` ||*/}
          {/*    formik.values.coordinate*/}
          {/*  }*/}
          {/*  onChange={(e: any) => {*/}
          {/*    if (!formik.values.coordinate) {*/}
          {/*      formik.handleChange(e);*/}
          {/*    }*/}
          {/*  }}*/}
          {/*  onBlur={formik.handleBlur}*/}
          {/*  error={formik.touched.coordinate && formik.errors.coordinate}*/}
          {/*/>*/}
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
