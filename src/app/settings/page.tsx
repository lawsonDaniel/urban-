"use-client";
import React from "react";
import SubHeader from "../components/headers/sub-header";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/common/routes";
import { IoIosArrowForward } from "react-icons/io";
import { GrUserSettings } from "react-icons/gr";

export default function Settings() {
  return (
    <div className="">
      <SubHeader header="Settings" hideBack />
      <div className="w-1/2 mt-8">
        <div className="flex justify-between items-center">
          <Image
            src={
              "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
            }
            alt={""}
            width={70}
            height={70}
            className="rounded-lg border border-gray-300"
          />
          <button className="text-primary  hover:text-primary_dark border bg-primary_light text-xs  rounded-full px-6 py-2 flex items-center">
            <GrUserSettings className="mr-2 text-primary" /> Edit profile
          </button>
        </div>
        <p className="mt-4 text-2xl">Oluwagbemiro Akinmutimi</p>
        <div className="mt-6">
          <ul className=" grid grid-cols-1 gap-y-2 ">
            {routes.settings.map((route: any, index: any) => (
              <Link href={`/setings${route.path}`} key={index}>
                <li
                  className={`hover:text-primary
									 h-16 rounded-lg flex items-center  cursor-pointer justify-between
								`}
                >
                  <div className="flex">
                    <div className="stroke-primary bg-primary_light h-10 w-10 flex items-center justify-center rounded-xl">
                      {route.icon("stroke-primary")}
                    </div>
                    <p className={`block pl-5 py-2`}>{route.title}</p>
                  </div>
                  <IoIosArrowForward className="text-primary" />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
