"use client";

import SubHeader from "@/app/components/headers/sub-header";
import Button from "@/app/components/button";
import React, { useState } from "react";
import { destroyCookie, parseCookies } from "nookies";
import { convertCamelCaseToNormal } from "@/common/utils";
import { saveTrip } from "@/common/hooks/fireStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { tripObject } from "@/common/data";
import { useUser } from "@/common/hooks/useUser";
import tripOBJs from "@/common/classes/trip.class";


export default function Preview() {
  const userData = useUser();

  const cookies = parseCookies();
  const router = useRouter();

  const stored = cookies.trip ? JSON.parse(cookies.trip) : null;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    setIsLoading(true);
    tripOBJs.create(stored).then((res)=>{
      console.log(res,'res from create park')
      toast.success('trip create successfully')
      router.push("/manage-trips");
      setIsLoading(false);
    }).catch((err)=>{
      console.log(err)
      toast.error(err?.message)
      setIsLoading(false);
    })

  };

  return (
    <div className={"w-[510px]"}>
      <SubHeader
        header="Preview Trip Info"
        hideRight
        // inputText="Search Trips"
        // allowFilter
      />
      <ToastContainer/>
      <table className="table-auto mt-8">
        <tbody>
          {stored &&
            Object.entries(stored).map(([key, value]) => (
              <tr key={key}>
                <td className="py-2  pr-10 text-gray-400">
                  {convertCamelCaseToNormal(key)}
                </td>
                <td className="py-2">{value as string}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className={"mt-8"}>
        <Button
          type="button"
          style="solid"
          onClick={() => router.back()}
          className="w-full bg-white text-primary border-2 hover:bg-opacity-40 border-primary hover:bg-primary hover:text-white h-[67px]"
        >
          Edit Info
        </Button>{" "}
        <Button
          type="button"
          style="solid"
          onClick={() => onSubmit()}
          className="mt-6 w-full bg-primary text-white border-2 hover:bg-opacity-70 hover:bg-primary hover:text-white h-[67px]"
        >
          {isLoading ? "loading" : "Proceed"}
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
}
