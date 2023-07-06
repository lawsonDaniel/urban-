"use client";
import Header from "../../(components)/header";
import { useFormik } from "formik";
import Button from "@/app/components/button";
import Input from "@/app/components/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CheckBox from "@/app/components/checkbox";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authOBJ from "@/common/classes/auth.class";
import countryList from "react-select-country-list";
import Dropdown from "@/app/components/dropdown";

export default function ParkManager() {
  const options = [
    { label: "Individual", value: "individual" },
    { label: "Corporate", value: "corporate" },
  ];

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [country, setCountry] = useState<string>();
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const router = useRouter();
  const validationSchema = Yup.object({
    userType: Yup.string().required("User Type is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    parkGeneralName: Yup.string().required("Park General Name is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      userType: options[0].value,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      parkGeneralName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (country) {
        setIsLoading(true);
        authOBJ
          .register(
            {
              firstName: values.firstName,
              lastName: values.lastName,
              country: country,
              phoneNumber: values.phoneNumber,
              email: values.email,
              parkGeneralName: values.parkGeneralName,
              deviceToken: "12345",
              password: values.password,
              retypePassword: values.confirmPassword,
            },
            "parkManager"
          )
          .then((res: any) => {
            toast.success(res?.data.message);
            //get user info
            authOBJ.currentUser();
            //redirect to dashboard
            router.push("/");
            setIsLoading(false);
          })
          .catch((err: any) => {
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
      <div>
        <Header
          heading="Sign Up as Park Manager"
          // desc='Please select any of the options below'
          // step={1}
        />
      </div>
      <div>
        <form className="mt-10" onSubmit={formik.handleSubmit}>
          <Input
            label="First Name"
            type="text"
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && formik.errors.firstName}
            // icon={<LockClosedIcon />}
          />
          <Input
            label="Last Name"
            type="text"
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && formik.errors.lastName}
            // icon={<LockClosedIcon />}
          />
          <Input
            label="Phone Number"
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phoneNumber && formik.errors.phoneNumber}
            // icon={<LockClosedIcon />}
          />
          <Input
            label="Email"
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
            // icon={<LockClosedIcon />}
          />
          <Input
            label="Park General Name"
            type="text"
            id="parkGeneralName"
            name="parkGeneralName"
            value={formik.values.parkGeneralName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.parkGeneralName && formik.errors.parkGeneralName
            }
            // icon={<LockClosedIcon />}
          />
          <Dropdown
            options={countryList().getData()}
            className={"w-full"}
            label="Select Country"
            placeholder={""}
            onSelect={(e: any) => {
              setCountry(e);
            }}
          />
          <Input
            // containerStyle='mt-8'
            label="Password"
            type={"password"}
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
          />
          <Input
            // containerStyle='mt-8'
            label="Retype Password"
            type={"password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <div className="mt-4">
            <CheckBox
              label={
                <p>
                  I agree to the{" "}
                  <span className="text-primary font-bold">Urban Terms</span>
                </p>
              }
              checked={isChecked}
              labelStyle="text-sm"
              inputStyle="h-4 w-4"
              onChange={handleCheckboxChange}
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-10 text-white"
            disabled={isLoading || !country}
          >
            {isLoading ? "loading" : "sign up"}
          </Button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
