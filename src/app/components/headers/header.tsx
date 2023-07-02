"use client";
import Image from "next/image";
import React from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiFillInfoCircle, AiOutlineLogout } from "react-icons/ai";
import Link from "next/link";
import { destroyCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { routes } from "@/common/routes";
import authOBJ from "@/common/classes/auth.class";
import { GetUserData } from "@/common/hooks/token";

export default function Header() {
  //get user info
  const storedUser = GetUserData()
  const router = useRouter();
  console.log(storedUser,'user info')
  //function to logout user
  const logOut = () => {
   authOBJ.logOut()
   //redirect to home
   router.push('./auth/login')
  };
  console.log(storedUser, "store user");
  return (
    <div className="pt-10 flex items-center justify-between ">
      <div className="flex items-center">
        <Image
          src={
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
          }
          alt={""}
          width={50}
          height={50}
          className="rounded-full border border-gray-300"
        />
        <div className="ml-4">
          <p>Hello</p>
          <p className="text-xl text-primary font-bold text-uppercase">
            {storedUser?.dispatchName ||
              storedUser?.firstName ||
              storedUser?.companyName}
          </p>
        </div>
      </div>
      <div>
        <div
          className="bg-primary_red bg-opacity-10 text-primary_red px-4 py-3 rounded-full w-96 flex relative"
          role="alert"
        >
          {/* <strong className='font-bold'>Warning!</strong> */}
          <AiFillInfoCircle size={24} />
          <span className="block sm:inline ml-2">
            {!storedUser?.isAccountVerified && "Account has not been Verified "}
          </span>
        </div>
      </div>
      <div className="relative flex items-center">
        <Link
          href="/notifications"
          className="bg-white rounded-full w-12 h-12 flex items-center justify-center hover:cursor"
        >
          <div className="bg-green-500 rounded-full w-3 h-3 absolute top-0 left-0"></div>
          <IoIosNotificationsOutline className="text-gray-600" size={24} />
        </Link>
        <Link
          href="#"
          className=" hover:cursor ml-4"
          onClick={() => {
            console.log("clicked");
            logOut();
          }}
        >
          <AiOutlineLogout className="text-gray-600" size={24} />
        </Link>
      </div>
    </div>
  );
}
