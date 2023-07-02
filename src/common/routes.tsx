// 'use client'
import { RxDashboard, RxFile } from "react-icons/rx";
import { IoMdNotificationsOutline } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { BsPeople, BsChatRightText } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { TbParking } from "react-icons/tb";
import { AiOutlineShareAlt, AiOutlineLock } from "react-icons/ai";
import { RiUserAddLine } from "react-icons/ri";
import { BiPhoneCall } from "react-icons/bi";
// import CarSide from ''

import CarSideIcon from "@/app/components/custom svg/car-side";
import LineIcon from "@/app/components/custom svg/line";
import { HiOutlineClipboardList } from "react-icons/hi";
import { TfiCar } from "react-icons/tfi";
import { TbRoute } from "react-icons/tb";

export const routes: any = {
  HOME: {
    path: "/",
    title: "Home",
  },
  SIGNUP: {
    path: "/auth/signup",
    title: "Sign Up",
  },
  LOGIN: {
    path: "/auth/login",
    title: "Log In",
  },
  PARK_OWNER: {
    path: "/auth/signup/park-owner",
    title: "Park Owner",
  },
  ADD_PARK: {
    path: "/auth/signup/park-owner/add-park",
    title: "Add Park",
  },
  PARK_MANAGER: {
    path: "/auth/signup/park-manager",
    title: "Park Manager",
  },
  DISPATCH_OFFICER: {
    path: "/auth/signup/dispatch-officer",
    title: "Dispatch Officer",
  },
  DASHBOARD: {
    parkOwner: [
      {
        path: "/",
        title: "Dashboard",
        icon: () => <RxDashboard size={22} className="" />,
      },
      {
        path: "/park",
        title: "Park",
        icon: (iconColor: string) => <TfiCar size={22} className="" />,
      },
      {
        path: "/manage-trips",
        title: "Manage Trips",
        icon: (iconColor: string) => <TbRoute size={22} className="" />,
      },
      {
        path: "/records",
        title: "Records",
        icon: () => <RxFile size={22} className="" />,
      },
      {
        path: "/park-statements",
        title: "Park Statements",
        icon: () => <HiOutlineClipboardList size={22} className="" />,
        children: [
          {
            path: "/park-statements/manager",
            title: "Manager Statements",
          },
          {
            path: "/park-statements/dispatcher",
            title: "Dispatcher Statements",
          },
        ],
      },
      {
        path: "/notifications",
        title: "Notifications",
        icon: () => <IoMdNotificationsOutline size={22} className="" />,
      },
      {
        path: "/settings",
        title: "Settings",
        icon: () => <SlSettings size={22} className="" />,
      },
    ],
    parkManager: [
      {
        path: "/",
        title: "Dashboard",
        icon: () => <RxDashboard size={22} className="" />,
      },
      {
        path: "/park",
        title: "Park",
        icon: (iconColor: string) => <TfiCar size={22} className="" />,
      },
      {
        path: "/manage-trips",
        title: "Manage Trips",
        icon: (iconColor: string) => <TbRoute size={22} className="" />,
      },
      {
        path: "/records",
        title: "Records",
        icon: () => <RxFile size={22} className="" />,
      },
      {
        path: "/park-statements",
        title: "Park Statements",
        icon: () => <HiOutlineClipboardList size={22} className="" />,
        children: [
          // {
          //   path: "/park-statements/manager",
          //   title: "Manager Statements",
          // },
          {
            path: "/park-statements/dispatcher",
            title: "Dispatcher Statements",
          },
        ],
      },
      {
        path: "/notifications",
        title: "Notifications",
        icon: () => <IoMdNotificationsOutline size={22} className="" />,
      },
      {
        path: "/settings",
        title: "Settings",
        icon: () => <SlSettings size={22} className="" />,
      },
    ],
    dispatchOfficer: [
      {
        path: "/",
        title: "Dashboard",
        icon: () => <RxDashboard size={22} className="" />,
      },
      {
        path: "/book-ride",
        title: "Book a Ride",
        icon: (iconColor: string) => <TfiCar size={22} className="" />,
      },
      {
        path: "/trip-history",
        title: "Trip History",
        icon: (iconColor: string) => <TbRoute size={22} className="" />,
      },
      {
        path: "/notifications",
        title: "Notifications",
        icon: () => <IoMdNotificationsOutline size={22} className="" />,
      },
    ],
  },
  dispatchOfficer: {
    customer_booking: {
      path: "/customer-booking",
      title: "Customer Booking",
    },
    book_ride: {
      path: "/book-ride",
      title: "Book Ride",
    },
  },

  TRIPS: [
    {
      path: "/manage-trips/assign",
      title: "Assign Vehicle & Driver",
      icon: <TfiCar size={22} className="" />,
      iconClassName: "bg-primary",
    },
    {
      path: "/manage-trips/track-request",
      title: "Track Request",
      icon: <AiOutlineShareAlt size={24} />,
      iconClassName: "bg-primary_blue",
    },
    {
      path: "/manage-trips/request-driver",
      title: "Request a Driver",
      icon: <RiUserAddLine size={24} />,
      iconClassName: "bg-primary_red",
    },
  ],
  PARK: [
    {
      path: "/park/add-park",
      title: "Add Park",
      icon: <TbParking size={24} />,
      iconClassName: "bg-primary",
    },
    {
      path: "/park/add-park-manager",
      title: "Add Park Manager",
      icon: <FaRegUser size={24} />,
      iconClassName: "bg-primary_blue",
    },
    {
      path: "/park/add-dispatch-officer",
      title: "Add Dispatch Officer",
      icon: <BsPeople size={24} />,
      iconClassName: "bg-primary_red",
    },
  ],
  settings: [
    {
      path: "/contract",
      title: "Contract Agreement",
      icon: () => <HiOutlineClipboardList size={18} className="text-primary" />,
    },
    {
      path: "/notifications",
      title: "Notification Settings",
      icon: () => (
        <IoMdNotificationsOutline size={18} className="text-primary" />
      ),
    },
    {
      path: "/reset-password",
      title: "Reset Password",
      icon: () => <AiOutlineLock size={18} className="text-primary" />,
    },
    {
      path: "/request-help",
      title: "Request Help",
      icon: () => <BiPhoneCall size={18} className="text-primary" />,
    },
    {
      path: "/terms-conditions",
      title: "Terms and Condition",
      icon: () => <BsChatRightText size={18} className="text-primary" />,
    },
  ],
};
