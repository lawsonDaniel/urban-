"use client";
import { useState, useEffect } from "react";
import SubHeader from "../components/headers/sub-header";
import { useFormik } from "formik";
import Input from "../components/input";
import Dropdown from "@/app/components/dropdown";
import Table from "../components/table";
import Location from "../components/custom svg/location";
import { RadioButton } from "../components/radio/auth.radio";
import Manifest from "./(comp)/manifest";
import SelectSeat from "./(comp)/seat";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { saveData } from "@/common/hooks/fireStore";
import Button from "../components/button";
import { useRouter } from "next/navigation";
import { routes } from "@/common/routes";
import { cityFCT,cityLagos } from "@/common/data";
import parkOBJ from "@/common/classes/park.class";
export default function BookRide() {
  const options = [
    { value: "bus", label: "Bus" },
    { value: "sedan", label: "Sedan" },
    { value: "van", label: "Van" },
    { value: "others", label: "Others" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useState(false);
  const [DestinationCity, setDestinationCity] = useState<any>();
  const [DepatureCity, setDepatureCity] = useState<any>();
  const [selectedPark, setSelectedPark] = useState<any>();
  const [selectedVehicle, setSelectedVehicle] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState("selectSeat");
  const [parks, setParks] = useState<any[]>([]);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const router = useRouter();

  useEffect(() => {
    const getAllParks = async () => {
      try {
        const res: any = await parkOBJ.getAll();
        console.log(res, "res to select park");
        setParks(res?.parks);
      } catch (err) {
        console.log(err);
      }
    };
    getAllParks();
  }, []);

  let option: { value: any; label: any }[];

  if (parks && parks?.length >= 1) {
    option = parks?.map((park: any) => ({
      value: park.id,
      label: park.name,
    }));
  } else {
    option = [
      {
        value: null,
        label: "no Park found",
      },
    ];
  }

  const columns = [
    {
      id: "tripCode",
      header: "Trip Code",
    },
    {
      id: "departureTime",
      header: "Departure Time",
    },
    {
      id: "availableSeats",
      header: "Available Seats",
    },
    {
      id: "pricePerSeats",
      header: "Price per seats",
    },
  ];

  const data = [
    {
      id: 1,
      tripCode: "ABJSAG",
      departureTime: "09:00 AM",
      availableSeats: "20",
      pricePerSeats: "N2000",
    },
  ];
  const validationSchema = Yup.object({
    passengerEmail: Yup.string()
      .email("Invalid email address")
      .required("Passenger email is required"),
    travelDate: Yup.date().required("Travel date is required"),
  });

  const formik = useFormik({
    initialValues: {
      passengerEmail: "",
      travelDate: "",
    },
    validationSchema,
    onSubmit: async (values: any) => {
      values = {
        selectedPark: selectedPark,
        depatureCity: DepatureCity,
        destinationCity: DestinationCity,
        selectedVehicle: selectedVehicle,
        ...values,
      };

      if (
        selectedVehicle &&
        DestinationCity &&
        DepatureCity &&
        selectedVehicle &&
        selectedPark
      ) {
        try {
          const res = await saveData(values, "rides");
          console.log(res, "trip");
          toast.success("Ride succesfully booked");
          openModal();
          router.push(routes.ADD_PARK.path);
          setIsLoading(false);
        } catch (error: any) {
          console.error(error, "trip");
          toast.error(error.message);

          setIsLoading(false);
        }
      } else {
        toast.error("Please fill all the fields");
        setIsLoading(false);
      }
    },
  });

  return (
    <div>
      <SubHeader header="Book Ride" hideRight hideBack />
      <form className="mt-10 w-[540px]" onSubmit={formik.handleSubmit}>
        <div className="flex">
          <Location />
          {/* <div className='w-full'> */}

          <div>
            <div className="flex">
              <Dropdown
                options={[...cityFCT,...cityLagos]}
                placeholder="Option"
                label="Select Departure City"
                onSelect={(e: any) => setDepatureCity(e)}
                className="w-full"
                containerStyle="mt-0"
              />
              <Input
                label="Travel Date"
                type="date"
                id="travelDate"
                name="travelDate"
                value={formik.values.travelDate}
                onChange={formik.handleChange}
                containerStyle="mt-0 w-full ml-4"
                onBlur={formik.handleBlur}
                error={formik.touched.travelDate && formik.errors.travelDate}
              />
            </div>
            <div className="w-1/2">
              <Dropdown
                options={option}
                placeholder="Option"
                label="Select Departure Park"
                onSelect={(e: any) => setSelectedPark(e)}
                className="w-full"
              />
            </div>
            {/* </div> */}

            <Dropdown
              options={[...cityFCT,...cityLagos]}
              placeholder="Option"
              label="Destination City"
              onSelect={(e: any) => setDestinationCity(e)}
              className="w-[516px]"
            />
          </div>
        </div>

        <Input
          label="Passenger Email"
          type="email"
          id="passengerEmail"
          name="passengerEmail"
          value={formik.values.passengerEmail}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.passengerEmail && formik.errors.passengerEmail}
        />

        <p className="mt-[53px] mb-2">Select Vehicle Type</p>
        <RadioButton
          name="selectedVehicle"
          options={options}
          data={selectedVehicle}
          onSelect={setSelectedVehicle}
          className="grid grid-cols-4 rounded-none gap-x-4 bg-white p-0 w-[540px]"
          customInputWrapperStyle="bg-gray-100 w-32 h-[105px] flex items-center justify-center rounded-xl"
          customActiveStyle="border border-2 border-primary"
        />

        <Button
          className="w-full bg-primary_blue text-primary_blue bg-opacity-20 hover:bg-primary_blue hover:text-white"
          type="submit"
        >
          Book ride
        </Button>
      </form>
      <div className="mt-[53px] border-t-2 pt-6">
        <p className="mb-4">Available Vehicle</p>
        <Table
          columns={columns}
          data={data}
          action={{ viewLabel: "Normal Luggage", type: ["view"] }}
          type="booking"
          hideDefaultBody={hide}
          modalBody={
            <>
              {step === "selectSeat" ? (
                <SelectSeat setStep={setStep} setHide={setHide} />
              ) : (
                step === "manifest" && <Manifest />
              )}
            </>
          }
        />
      </div>
      <ToastContainer />
    </div>
  );
}
