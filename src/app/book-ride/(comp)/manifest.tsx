"use client";
import Button from "@/app/components/button";
import Input from "@/app/components/input";
import { useFormik } from "formik";
import React from "react";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function Manifest() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      depatureCity: "",
      destinationCity: "",
      passengerName: "",
      passengerNoK: "",
      nokPhoneNumber: "",
    },
    onSubmit: (values: any) => {
      router.push("/book-ride/payment");
      alert(JSON.stringify(values, null, 2));
      // openModal()0
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="">
      <div className={`flex items-center`}>
        <MdArrowBack
          className="cursor-pointer"
          onClick={() => window.history.back()}
          size={24}
        />
        <p className="text-xl font-bold ml-2">Manifest</p>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-3">
        <Input
          label="Depature City"
          type="text"
          id="depatureCity"
          name="depatureCity"
          value={formik.values.depatureCity}
          onChange={formik.handleChange}
          containerStyle="mt-0"
          onBlur={formik.handleBlur}
          error={formik.touched.depatureCity && formik.errors.depatureCity}
        />
        <Input
          label="Destination City"
          type="text"
          id="destinationCity"
          name="destinationCity"
          value={formik.values.destinationCity}
          onChange={formik.handleChange}
          containerStyle="mt-0"
          onBlur={formik.handleBlur}
          error={
            formik.touched.destinationCity && formik.errors.destinationCity
          }
        />
        <Input
          label="Passenger Name"
          type="text"
          id="passengerName"
          name="passengerName"
          value={formik.values.passengerName}
          onChange={formik.handleChange}
          containerStyle="mt-0"
          onBlur={formik.handleBlur}
          error={formik.touched.passengerName && formik.errors.passengerName}
        />
        <Input
          label={`passenger's Next of Kin`}
          type="text"
          id="passengerNoK"
          name="passengerNoK"
          value={formik.values.passengerNoK}
          onChange={formik.handleChange}
          containerStyle="mt-0"
          onBlur={formik.handleBlur}
          error={formik.touched.passengerNoK && formik.errors.passengerNoK}
        />
        <Input
          label="Next of Kin Phone Number"
          type="text"
          id="nokPhoneNumber"
          name="nokPhoneNumber"
          value={formik.values.nokPhoneNumber}
          onChange={formik.handleChange}
          containerStyle="mt-0"
          onBlur={formik.handleBlur}
          error={formik.touched.nokPhoneNumber && formik.errors.nokPhoneNumber}
        />
        <Button
          type="submit"
          className="w-full mt-10 text-white"
          //     onClick={() => {
          //     setStep('manifest')
          //     setHide(true)
          // }
          // }
        >
          Proceed to pay N5,000
        </Button>
      </div>
    </form>
  );
}
