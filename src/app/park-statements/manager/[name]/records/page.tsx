"use client";
import SubHeader from "@/app/components/headers/sub-header";
import MyTabs from "@/app/components/tabs";
import React from "react";
import Scheduled from "../(components)/scheduled";
import Completed from "../(components)/completed";
import Cancelled from "../(components)/cancelled";
import InfoCard from "@/app/components/dashboard/comp/infoCard";
import CarSideIcon from "@/app/components/custom svg/car-side";
import { HiCheck } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { BiCopy, BiMoney } from "react-icons/bi";

export default function Records() {
  return (
    <>
      <SubHeader header="Tade Ogunsowo Records" allowFilter />
      <div className="mt-8">
        <div className="my-[53px] grid grid-cols-4 gap-8">
          <InfoCard
            title="Total Trips Set"
            num="3,456"
            icon={() => <CarSideIcon color="stroke-white" size={"16"} />}
          />
          <InfoCard
            title="Successful Trips"
            num="30,000"
            icon={() => <HiCheck color="white" />}
          />
          <InfoCard
            title="Cancelled Trips"
            num="23,000"
            icon={() => <IoMdClose color="white" />}
          />
          <InfoCard
            title="Scheduled Trips"
            num="2,900"
            icon={() => <BiMoney color="white" />}
          />
        </div>
        <MyTabs
          headers={["Scheduled ", "Completed Trips", "Cancelled"]}
          components={[
            <Scheduled key="1" />,
            <Completed key="2" />,
            <Cancelled key="2" />,
          ]}
        />
      </div>
    </>
  );
}
