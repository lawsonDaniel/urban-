"use client";
import SubHeader from "../../components/headers/sub-header";
import Button from "@/app/components/button";
import { RadioSelect } from "@/app/components/radio/select.radio";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

export default function PaymentInfo() {
  const router = useRouter();
  const options = [
    { label: "Pay with ", value: "rave" },
    { label: "Pay with ", value: "paystack" },
  ];

  const formik = useFormik({
    initialValues: {
      payWith: "",
    },
    onSubmit: (values) => {
      router.push(`/book-ride/payment/${values.payWith}`);
      // alert(JSON.stringify(values, null, 2))
    },
  });

  return (
    <>
      <SubHeader header="Payment Info" hideRight />
      <div className="mt-10 w-1/2">
        <p className="text-sm">
          You are about to make the payment of{" "}
          <span className="text-primary">N5000.</span>
          Select payment option below
        </p>
        <form className="mt-6" onSubmit={formik.handleSubmit}>
          <div>
            <RadioSelect name="payWith" formik={formik} options={options} />
          </div>
          <Button type="submit" className="w-full mt-4 text-white">
            Proceed to Pay N5,000
          </Button>
        </form>
      </div>
    </>
  );
}
