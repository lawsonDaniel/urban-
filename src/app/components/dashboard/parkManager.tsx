// import styles from './page.module.css'

import Table from "../table";
import SubHeader from "../headers/sub-header";
import CTA from "./comp/cta";
import DataCard from "./comp/dataCard";
import { useRouter } from "next/navigation";
import { routes } from "@/common/routes";
import { BiCopy, BiMoney } from "react-icons/bi";
import InfoCard from "./comp/infoCard";
import CarSideIcon from "../custom svg/car-side";
import { HiCheck } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
// const inter = Inter({ subsets: ['latin'] })
import { getUserById } from "@/common/hooks/fireStore";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { useUser } from "@/common/hooks/useUser";

export default function ParkManager({ user }: any) {
  const userData = useUser();
  const [park, setPark] = useState<any>(null);
  //get park details

  useEffect(() => {
    const getPark = async () => {
      try {
        console.log(userData, "park id");
        const res = await getUserById("parks", userData?.parkToManage);
        setPark(res);
      } catch (err) {
        console.log(err);
      }
    };
    getPark();
  }, [userData]);
  console.log(park, "park info");
  const router = useRouter();
  const { dispatchName } = user;
  const columns = [
    {
      id: "parkName",
      header: "Park Name",
    },
    {
      id: "totalTrips",
      header: "total trips",
    },
    {
      id: "successfulTrips",
      header: "successful trips",
    },
    {
      id: "scheduledTrips",
      header: "scheduled trips",
    },
    {
      id: "cancelledTrips",
      header: "cancelled trips",
    },
  ];

  const data = [
    {
      id: 1,
      parkName: "John Doe",
      totalTrips: "20",
      successfulTrips: "20",
      scheduledTrips: "20",
      cancelledTrips: "20",
    },
    {
      id: 2,
      parkName: "oshodi Doe",
      totalTrips: "20",
      successfulTrips: "20",
      scheduledTrips: "20",
      cancelledTrips: "20",
    },
    {
      id: 3,
      parkName: "oshodi Doe",
      totalTrips: "20",
      successfulTrips: "20",
      scheduledTrips: "20",
      cancelledTrips: "20",
    },
    {
      id: 4,
      parkName: "oshodi Doe",
      totalTrips: "20",
      successfulTrips: "20",
      scheduledTrips: "20",
      cancelledTrips: "20",
    },
    {
      id: 5,
      parkName: "oshodi Doe",
      totalTrips: "20",
      successfulTrips: "20",
      scheduledTrips: "20",
      cancelledTrips: "20",
    },
  ];

  return (
    <div className="">
      {/* <div className='p-14 min-h-full mt-10 rounded-xl bg-white'> */}
      <SubHeader header="Dashboard" hideBack hideRight />
      <div className="mt-4 flex justify-between">
        <p>{park?.parkName}</p>
        <div className="flex text-sm items-center">
          <p>Manager ID:</p>
          <div className="text-primary flex ml-2">
            {userData?.parkManagerIdentity} <BiCopy className="ml-1" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 mt-[32px]">
        <div className="col-span-2">
          <CTA
            text="View park Statement"
            type="green"
            onClick={() => router.push("/park-statements/manager")}
          />
        </div>
      </div>

      <div className="mt-[53px] grid grid-cols-3 gap-8">
        <InfoCard
          title="Total Trips Set"
          num={park?.totalTrip}
          icon={() => <CarSideIcon color="stroke-white" size={"16"} />}
        />
        <InfoCard
          title="Successful Trips"
          num={park?.successfullTrip}
          icon={() => <HiCheck color="white" />}
        />
        <InfoCard
          title="Cancelled Trips"
          num={park?.cancelledTrip}
          icon={() => <IoMdClose color="white" />}
        />
        <InfoCard
          title="Scheduled Trips"
          num={park?.scheduledTrips}
          icon={() => <BiMoney color="white" />}
        />
      </div>
      {/* <div className=' h-40 flex flex-col mt-10 items-center justify-center'>
				<ReactSVG src='./img/svg/stars.svg' />
				<p>Sorry, No information yet, Select Vehicle Type to start</p>
			</div> */}
      {/* </div> */}
    </div>
  );
}
