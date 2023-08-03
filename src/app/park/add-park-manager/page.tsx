"use client";
import Button from "@/app/components/button";
import Dropdown from "@/app/components/dropdown";
import SubHeader from "@/app/components/headers/sub-header";
import Input from "@/app/components/input";
import Modal from "@/app/components/modal";
import SuccessModal from "@/app/components/modal/sucess-modal";
import { useFormik } from "formik";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { MdOutlineCelebration } from "react-icons/md";
import { getAll, getOne, updateOne } from "@/common/hooks/fireStore";
import { DocumentSnapshot } from "firebase/firestore";
import { useUser } from "@/common/hooks/useUser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import parkOBJ from "@/common/classes/park.class";
import { CgFormatStrike } from "react-icons/cg";

export default function AddParkManager() {
  const userData = useUser();
  const [parks, setParks] = useState<any[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAllParks = async () => {
    try {
      const res = await parkOBJ.getAll();
      console.log("park ress::", res);
      const parks: any[] = [];
      setParks(res?.parks);
      // setMainParks(res);
    } catch (err) {
      console.log(err);
    }
  };
useEffect(()=>{
  getAllParks()
},[])
  const options =
    parks &&
    parks.map((park) => {
      if(park){
        return {
          value: park.id,
          label: park.name,
        };
      } else{
        return {
          value: '',
          label: "no Park found",
        };
      }
    });

  const [selectedPark, setSelectedPark] = useState<any>();

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      parkManagerId: "",
    },
    onSubmit: async (values: any) => {
      setIsLoading(true);
      // router.push(routes.ADD_PARK.path)
      console.log(values.parkManagerId ,"selectedparkId")
      if(selectedPark){
        parkOBJ.parkManager({
          parkId: selectedPark,
          parkManagerId: values.parkManagerId 
      }).then((res: any) => {
        toast.success(res?.data.message);
        //redirect to dashboard
         router.push("/park")
        setIsLoading(false);
      })
      .catch((err: any) => {
        toast.error(err?.response?.data?.message);
        setIsLoading(false);
      });
      }else{
        toast('fill all fields')
        setIsLoading(false);
      }
     
    },
  });
{formik.errors,'error form'}
  return (
    <div>
      <SubHeader header="Add Park Manager" hideRight />
      <form className="mt-10 w-[510px]" onSubmit={formik.handleSubmit}>
        <Input
          label="Park Manager Id"
          type="text"
          id="parkManagerId"
          name="parkManagerId"
          value={formik.values.parkManagerId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.parkManagerId && formik.errors.parkManagerId}
        />
        <Dropdown
          options={options}
          placeholder="Select Park"
          label="Select Park"
          onSelect={(e: any) => setSelectedPark(e)}
          className="w-[510px]"
          
        />
        <Button
          type="submit"
          className="w-full mt-10 text-white"
          // disabled={!formik.values['userType'] ? true : undefined}
        >
          {isLoading ? "loading" : "Add Manager"}
        </Button>
      </form>
      <SuccessModal
        title="Manager Added"
        desc="You have successfully added a new park manager."
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={() => router.push("/")}
      />
      <ToastContainer />
    </div>
  );
}
