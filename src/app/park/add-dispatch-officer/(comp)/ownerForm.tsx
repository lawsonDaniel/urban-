import Button from "@/app/components/button";
import Dropdown from "@/app/components/dropdown";
import SubHeader from "@/app/components/headers/sub-header";
import Input from "@/app/components/input";
import Modal from "@/app/components/modal";
import SuccessModal from "@/app/components/modal/sucess-modal";
import { useFormik } from "formik";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { MdOutlineCelebration } from "react-icons/md";
import { useAuth } from "@/common/hooks/useAuth";
import { useRouter } from "next/navigation";
import { USER_TYPE } from "@/common/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OwnerForm({ openModal }: { openModal: () => void }) {
  const options = [
    { value: "bus", label: "Bus" },
    { value: "sedan", label: "Sedan" },
    { value: "van", label: "Van" },
    { value: "others", label: "Others" },
  ];

  const [selectedPark, setSelectedPark] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      dispatcherName: "",
      email: "",
      phoneNumber: "",
      fullAddress: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values: any) => {
      setIsLoading(true);
      

      // router.push(routes.ADD_PARK.path)
    },
  });

  return (
    <div>
      <form className="mt-10 w-[510px]" onSubmit={formik.handleSubmit}>
        <Input
          label="Dispatcher Name"
          type="text"
          id="dispatcherName"
          name="dispatcherName"
          value={formik.values.dispatcherName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.dispatcherName && formik.errors.dispatcherName}
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
        />
        <Input
          label="Password"
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && formik.errors.password}
        />
        <Input
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
        <Button
          type="submit"
          className="w-full mt-10 text-white"
          // disabled={!formik.values['userType'] ? true : undefined}
        >
          {isLoading ? "loading" : "Add Dispatch officer"}
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
}
