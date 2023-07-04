"use client";
import { useState, useEffect } from "react";
import Header from "../../(components)/header";
import { useFormik } from "formik";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { routes } from "@/common/routes";
import Input from "@/app/components/input";
import Dropdown from "@/app/components/dropdown";
import Button from "@/app/components/button";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import authOBJ from "@/common/classes/auth.class";

export default function AddPark() {
  const router: any = useRouter();
  //get user info
  let user = authOBJ.currentUser();
  const cookies = parseCookies();
  const ParkOwner: any = cookies.ParkOwner
    ? JSON.parse(cookies.ParkOwner)
    : null;
  const options = [
    { label: "Abuja", value: "abuja" },
    { label: "Lagos", value: "lagos" },
  ];

  // const [user, setUser] = useLocalStorage<string>('userType', '')
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [parkLocation, setParkLocation] = useState<string>("");

  const validationSchema = Yup.object({
    parkName: Yup.string().required("Name of park is required"),
    parkFullAddress: Yup.string().required("Full address is required"),
    parkCity: Yup.string().required("Park city is required"),
    parkRegion: Yup.string().required("Park region is required"),
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
      values = {
        ...values,
        ...ParkOwner,
      };
      if (parkLocation) {
        setIsLoading(true);
        console.log(values, "from the park");
        authOBJ
          .register(values, "parkOwner")
          .then((res: any) => {
            toast.success(res?.data.message);
            //get user info
            authOBJ.currentUser();
            //delect stored value from cookie
            destroyCookie(null, "ParkOwner", { path: "/" });
            //redirect to dashboard
            router.push("/");
            setIsLoading(false);
          })
          .catch((err: any) => {
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
            // icon={<LockClosedIcon />}
          />
          <Dropdown
            options={options}
            placeholder="State"
            label="Select State"
            onSelect={(e: any) => setParkLocation(e)}
            className="w-[510px]"
          />
          <Input
            label="park City"
            type="text"
            id="parkCity"
            name="parkCity"
            value={formik.values.parkCity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.parkCity && formik.errors.parkCity}
            // icon={<LockClosedIcon />}
          />
          <Input
            label="park Region"
            type="text"
            id="parkRegion"
            name="parkRegion"
            value={formik.values.parkRegion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.parkRegion && formik.errors.parkRegion}
            // icon={<LockClosedIcon />}
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
            // icon={<LockClosedIcon />}
          />

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
