import Button from "@/app/components/button";
import Input from "@/app/components/input";
import { routes } from "@/common/routes";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CheckBox from "@/app/components/checkbox";
import { useAuth } from "@/common/hooks/useAuth";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parkOwnerData } from "@/common/data";
import { AccountType, USER_TYPE } from "@/common/types";
import authOBJ from "@/common/classes/auth.class";
import countryList from "react-select-country-list";
import Dropdown from "@/app/components/dropdown";

export default function CorporateInput() {
  const router = useRouter();

  const { signUp, user } = useAuth();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [country, setCountry] = useState<string>();
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required("Company name is required"),
    companyAddress: Yup.string().required("Company address is required"),
    companyRC: Yup.string().required("Company RC is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });
  const formik = useFormik({
    initialValues: {
      companyName: "",
      companyAddress: "",
      companyRC: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      // alert(JSON.stringify(values, null, 2))
      if (country) {
        authOBJ
          .register(
            {
              accountCategory: "company",
              country: country,
              companyName: values.companyName,
              companyAddress: values.companyAddress,
              email: values.email,
              phoneNumber: values.phoneNumber,
              deviceToken: "uefuefue23",
              password: values.password,
              retypePassword: values.confirmPassword,
            },
            "parkOwner"
          )
          .then((res: any) => {
            toast.success(res?.data.message);
             //get user info
              authOBJ.currentUser()
            //redirect to add park
            router.push(routes.ADD_PARK.path)
            setIsLoading(false);
          })
          .catch((err: any) => {
            toast.error(err?.response.data.message);
            setIsLoading(false);
          });
      } else {
        toast.error("fill all values");
        setIsLoading(false);
      }
    },
  });

  return (
    <form className="mt-10" onSubmit={formik.handleSubmit}>
      <Input
        label="Company Name"
        type="text"
        id="companyName"
        name="companyName"
        value={formik.values.companyName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.companyName && formik.errors.companyName}

        // icon={<LockClosedIcon />}
      />
      <Input
        label="Company Address"
        type="text"
        id="companyAddress"
        name="companyAddress"
        value={formik.values.companyAddress}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.companyAddress && formik.errors.companyAddress}

        // icon={<LockClosedIcon />}
      />
      <Input
        label="Company RC"
        type="tel"
        id="companyRC"
        name="companyRC"
        value={formik.values.companyRC}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.companyRC && formik.errors.companyRC}

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
        label="Email Address"
        type="email"
        id="email_"
        name="email_"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && formik.errors.email}

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
        //
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
        //
        label="ReType Password"
        type={"password"}
        id="confirmPassword"
        name="confirmPassword"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
        // disabled={!formik.values['userType'] ? true : undefined}
      >
        {isLoading ? "loading" : "Sign Up"}
      </Button>
      <ToastContainer />
    </form>
  );
}
