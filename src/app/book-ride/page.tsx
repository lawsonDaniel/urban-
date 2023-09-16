"use client";
import { useState, useEffect } from "react";
import SubHeader from "../components/headers/sub-header";
import { useFormik } from "formik";
import Input from "../components/input";
import Dropdown from "@/app/components/dropdown";
import Location from "../components/custom svg/location";
import { RadioButton } from "../components/radio/auth.radio";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import Button from "../components/button";
import { useRouter } from "next/navigation";
import { cityFCT,cityLagos } from "@/common/data";
import parkOBJ from "@/common/classes/park.class";
import tripOBJs from "@/common/classes/trip.class";
import { useSelector } from "react-redux/es/hooks/useSelector";
import MainTable from "../components/tables/main.table";
import { ClipLoader } from "react-spinners";


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
  const [parks, setParks] = useState<any>([]);
  const [filtertripData, setFilterTripData] = useState<any>([])
  const [selectedSeat, setSelectedSeat] = useState(options[0].value)
  const userData = useSelector((a:any)=> a?.authUser?.authUser);
 

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

  const dataFilter = filtertripData?.length >= 1 ? filtertripData.map((a:any) => {
    return {
      startLocation: a?.startLocation,
      time: a?.time,
      endLocation: a?.endLocation,
      tripCode: a?.tripCode,
      fare: `₦${a?.fare}`,
      seatLeft: `${Number(a?.totalSeats) - Number(a?.bookedSeats)}`,
      vehicleType: a?.vehicleType 
    };
  }) : [];
  
  const validationSchema = Yup.object({
    passengerEmail: Yup.string()
      .email("Invalid email address")
      .required("Passenger email is required"),
    passengerName: Yup.string().required("Passenger name is required"),
    passengerNumber: Yup.string().required("Passenger phone is required").min(10).max(11),
    travelDate: Yup.date().required("Travel date is required"),
    tripCode: Yup.string()
    .required("Trip code is required")
    .matches(/^TRIP\d{8}$/, "Trip code must start with 'TRIP' followed by an 8-digit number")
  });

  const formik = useFormik({
    initialValues: {
      passengerEmail: "",
      travelDate: "",
      passengerName:"",
      passengerNumber:"",
      tripCode:""
    },
    validationSchema,
    onSubmit: async (values: any) => {
let filterByTrips = filtertripData.filter((a:any)=> a?.tripCode === values?.tripCode)
    console.log(values,'values from the submitted');
      if (
        selectedVehicle &&
        DestinationCity &&
        selectedVehicle &&
        selectedPark
      ) {
        values = {
          passengerEmail: values.passengerEmail,
          travelDate: values.travelDate,
          passengerName: values.passengerName,
          passengerNumber: values.passengerNumber,
          tripCode: values.tripCode,
          parkId:selectedPark,
          DestinationCity:DestinationCity,
          VehicleType:selectedVehicle,
          ...filterByTrips[0]
      };

        // try {
        //   // const res = await saveData(values, "rides");
        //   // console.log(res, "trip");
      
        //   // tripOBJs.book(values).then((res)=>{
        //   //   console.log(res, "trip");
        //   //   toast.success("Trip booked successfully");
        //   //   openModal();
        //   //   router.push("/");
        //   //   setIsLoading(false);
        //   // }).catch((error)=>{
        //   //   console.log(error);
        //   //   toast.error("Something went wrong");
        //   //   setIsLoading(false);
        //   // }) 
        //   // Construct the URL with query parameters
        // } catch (error: any) {
        //   console.error(error, "trip");
        //   toast.error(error.message);

        //   setIsLoading(false);
        // }

        const queryParams = new URLSearchParams(values).toString();
        const url = `/book-ride/preview?${queryParams}`;
        // Push the data to the other page
        router.push(url);
      } else {
        toast.error("Please fill all the fields");
        setIsLoading(false);
      }
    },
  });
  useEffect(() => {
    // Check if userData exists before making the API call
    if (userData && userData?.id) {
      tripOBJs.getByDispatchMainId(userData?.id)
        .then((res:any) => {
          // Filter trips
          try {
            if (selectedPark && DestinationCity && formik.values.travelDate) {
              const filteredTrips = res.filter((a: any) => {
                const date = a?.date.split('T')[0];
                return a?.parkId === selectedPark && a?.endLocation === DestinationCity && date === formik.values.travelDate;
              });
              setFilterTripData(filteredTrips);
            } else {
              console.log('Missing selectedPark, DestinationCity, or travelDate');
            }
          } catch (error) {
            console.error('An error occurred:', error);
          }
          
        })
        .catch((err) => {
          console.error('Error from getting all trips:', err);
        });
    }
  }, [DestinationCity, formik.values.travelDate, selectedPark, userData]);
  
  const columns = [
    {
      key: "startLocation",
      header: "Departure City",
    },
    {
      key: "time",
      header: "Departure Time",
    },
    {
      key: "endLocation",
      header: "Destination City",
    },
    {
      key: "tripCode",
      header: "Trip Code",
    },
    {
      key: "seatLeft",
      header: "Avaliable Seat",
    },
    {
      key: "fare",
      header:"Fare"
    },
    {
      key: "vehicleType",
      header: "Type Of Vehicle",
    },
  ];
  
  console.log(dataFilter,'data filter');
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
                options={option}
                placeholder="Option"
                label="Assigned Park"
                onSelect={(e: any) => setSelectedPark(e)}
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
          label="Passenger Name"
          type="text"
          id="passengerName"
          name="passengerName"
          value={formik.values.passengerName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.passengerName && formik.errors.passengerName}
        />
         <Input
          label="Passenger Phone Number"
          type="tel"
          id="passengerNumber"
          name="passengerNumber"
          value={formik.values.passengerNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.passengerNumber && formik.errors.passengerNumber}
        />
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
<Input
          label="Trip Code"
          type="text"
          id="tripCode"
          name="tripCode"
          value={formik.values.tripCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.tripCode && formik.errors.tripCode}
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
          {isLoading ? <ClipLoader color="#ffffff" /> : "Book ride"}
        </Button>
      </form>
      <div className="mt-[53px] border-t-2 pt-6">
        <p className="mb-4">Available Trips</p>
        {/* <Table
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
        /> */}
        <MainTable 
             columns={columns}
             data={dataFilter}
             identifier=""
             searchBy="Booking code"
             handleSearch={()=> {}}
             handleFilter={()=>{}} 
             apiSearch={()=>{}}
             />
             
      </div>
      
      <ToastContainer />

    </div>
  );
}
