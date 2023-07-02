"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import { RadioButton } from "@/app/components/radio/auth.radio";
import Input from "@/app/components/input";
import Button from "@/app/components/button";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Metadata } from "next";
import { routes } from "@/common/routes";
// import useLocalStorage from '@/common/hooks/localStorage'
import CheckBox from "@/app/components/checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authOBJ from "@/common/classes/auth.class";

// const inter = Inter({ subsets: ['latin'] })

interface LoginFormValues {
  // userType: string
  emailOrUsername: string;
  password: string;
}

const options = [
  { label: "Park Owner", value: "parkOwner" },
  { label: "Park Manager", value: "parkManager" },
  { label: "Dispatch Officer", value: "dispatchOfficer" },
];

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState(options[0].value);
  // const [user, setUser] = useLocalStorage<string>('userType', '')

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const router = useRouter();
  // Define the validation schema
const validationSchema = Yup.object({
  emailOrUsername: Yup.string().required("Email or username is required"),
  password: Yup.string().required("Password is required"),
});

// Define the login form values interface
interface LoginFormValues {
  emailOrUsername: string;
  password: string;
}

// Initialize the form using useFormik hook
const formik = useFormik<LoginFormValues>({
  initialValues: {
    emailOrUsername: "",
    password: "",
  },
  validationSchema: validationSchema,
  onSubmit: (values) => {
    setIsLoading(true);
    authOBJ
      .login({
        userType:userType,
        email:values.emailOrUsername,
        password:values.password,
      })
      .then((res: any) => {
        toast.success(res?.data.message)
        //redirect to dashboard
        setIsLoading(false);
      })
      .catch((err: any) => {
        toast.error(err?.response.data.message)
        setIsLoading(false);
      });
  },
});
  return (
    <main>
      <RadioButton
        name="userType"
        options={options}
        data={userType}
        onSelect={setUserType}
        // formik={formik}
        className="grid grid-cols-3"
      />
      <div className="mt-[47px]">
        <p className="text-dark font-light text-2xl">
          Welcome to <span className="font-bold text-primary">Urban</span>
        </p>
        <h1 className="text-dark mt-2 font-bold text-3xl">
          Login to your Account
        </h1>
        <form className="mt-10" onSubmit={formik.handleSubmit}>
          <Input
            label="Email / Username"
            type="text"
            id="emailOrUsername"
            name="emailOrUsername"
            value={formik.values.emailOrUsername}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.emailOrUsername && formik.errors.emailOrUsername
            }

            // icon={<LockClosedIcon />}
          />
          <Input
            label="Password"
            type={"password"}
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
          />
          <div></div>
          <div className="flex justify-end items-center">
            {/* <CheckBox
              label="Remember me"
              checked={isChecked}
              labelStyle="text-sm"
              inputStyle="h-4 w-4"
              onChange={handleCheckboxChange}
            /> */}
            <a
              href="#"
              className="text-sm mt-4 text-primary font-bold hover:text-green-600"
            >
              Forgot password?
            </a>
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full mt-10 text-white"
          >
            {isLoading ? "loading" : "login"}
          </Button>
        </form>
        <div className="mt-4 flex justify-center items-center">
          <p className="text-sm text-primary">Don&apos;t have an account? </p>
          <Link
            href={routes.SIGNUP.path}
            className="font-bold hover:text-green-600 text-sm ml-2 text-primary"
          >
            Register here
          </Link>
        </div>
        <ToastContainer />
      </div>
      {/* <p className='text-3xl font-bold underline'>
				Get started by editing&nbsp;
				<code className=''>src/app/page.tsx</code>
			</p> */}
    </main>
  );
}
