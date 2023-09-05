"use client";
import React, { useState, useEffect } from "react";
import SubHeader from "../../components/headers/sub-header";
import { useFormik } from "formik";
import Dropdown from "@/app/components/dropdown";
import Input from "@/app/components/input";
import Textarea from "@/app/components/textarea";
import Button from "@/app/components/button";
import Switch from "@/app/components/switch";
import { getAll, saveData } from "@/common/hooks/fireStore";
import { DocumentSnapshot } from "firebase/firestore";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import parkOBJ from "@/common/classes/park.class";
import providerOBJs from "@/common/classes/provider";
import { ClipLoader } from "react-spinners";
import tripOBJs from "@/common/classes/trip.class";

export default function RequestDriver() {
  const lugage = [
    { value: "normal", label: "Normal Luggage" },
    { value: "extra", label: "Extra Luggage" },
  ];
  const router = useRouter();
  const [ProviderAgency, setProviderAgency] = useState();
  const [selectedPark, setSelectedPark] = useState();
  const [selectedLuggage, setSelectedLuggage] = useState();
  const [Trip, setTrip] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allProviderAgency, setAllProviderAgency] = useState<any>([]);
  const [paramsData,setParamsData] = useState<any>()
  const [selectedRegion,setSelectedRegion]=useState<any>('')

  const getAllTrips = async () => {
    tripOBJs.getAll().then((res)=>{
      console.log(res,"trips")
      setTrip(res)
    })
    };
  
  useEffect(() => {
    getAllTrips();;
    const getAllProviderAgency = async () => {
      providerOBJs.getAll(selectedRegion).then((res)=>{
        console.log(res,'provider agency')
        setAllProviderAgency(res?.data)
      })
    };
    getAllProviderAgency()
  }, [getAll,selectedRegion]);

  useEffect(()=>{
    const searchParams = new URLSearchParams(window.location.search);
  
  // Convert the searchParams to a plain object
  const params:any = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  if(params?.tripCode){
    setSelectedPark(params?.tripCode)
    setParamsData(params)
  }
  console.log(params?.tripCode,'trip info from link')
  
   },[])
  
  let parkOption: [{ value: any; label: string }];

  let TripOption:any = []
  
  if(Trip && Trip?.length >= 1){
    TripOption = Trip?.map((a: any) => ({
      value: a?.tripCode ,
      label: a?.tripCode ,
    }))
  }else{
    TripOption = [{
      value:null,
      label : 'no Trip found'
    }]
  }
  let providerAgencyOption: [{ value: any; label: string }];
  if (allProviderAgency && allProviderAgency.length >= 1 && selectedRegion) {
    providerAgencyOption = allProviderAgency.map((a: any) => ({
      value: a?.id,
      label: a?.companyName      ,
    }));
  } else {
    providerAgencyOption = [
      {
        value: null,
        label: "no Provider found",
      },
    ];
  }

  const validationSchema = Yup.object().shape({
   
  });
  const formik = useFormik({
    initialValues: {
      
      
    },
    validationSchema,
    onSubmit: async (values: any) => {
      setIsLoading(true);
      if (
        selectedPark &&
        ProviderAgency &&
        selectedPark != null &&
        ProviderAgency != null
      ) {
        values = {
          providerAgencyId: ProviderAgency,
          tripCode: selectedPark,
        
        };
        console.log(values,'values to be submitted')
        tripOBJs.requestDriver(values).then((res)=>{
          console.log(res,'this is the respones data')
          toast.success(res.data?.message)
          setIsLoading(false)
          router.push('/manage-trips')
        }).catch((err)=>{
        console.error('an error occcured',err)
         toast.error(err);
        setIsLoading(false)
        })
      } else {
        setIsLoading(false)
        toast.error("fill all the form fields");
      }
    },
  });
console.log(formik.errors,'formik values')
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const handleToggle = (isChecked: boolean) => {
    setIsToggled(isChecked);
  };
  const parkRegion = [
    { value: "NORTH_CENTRAL", label: "NORTH CENTRAL" },
    { value: "NORTH_EAST", label: "NORTH EAST" },
    { value: "SOUTH_EAST", label: "SOUTH EAST" },
    { value: "SOUTH_WEST", label: "SOUTH WEST" },
    { value: "SOUTH_SOUTH", label: "SOUTH SOUTH" },
    {vlaue: "NORTH_WEST", label:"NORTH WEST" },
  ];

  return (
    <>
      <SubHeader header="Request Driver" hideRight />
      <form className="mt-10" onSubmit={formik.handleSubmit}>
        <div className=" w-[510px]">
        <Dropdown
            options={parkRegion}
            placeholder="Option"
            label="Select Region"
            onSelect={(e: any) => setSelectedRegion(e)}
            className="w-[510px]"
          />
          <Dropdown
            options={providerAgencyOption}
            placeholder="Option"
            label="Select Provider Agency"
            onSelect={(e: any) => setProviderAgency(e)}
            className="w-[510px]"
            />
         
          {
            !paramsData && <Dropdown
            options={TripOption}
            placeholder="Option"
            label="Select Trip"
            onSelect={(e: any) => setSelectedPark(e)}
            className="w-[510px]"
            // error={formik.touched.departurePark && formik.errors.departurePark}
          />
          }
         
          {/* <Textarea
            label="Additional Info"
            type="text"
            id="additionalInfo"
            name="additionalInfo"
            value={formik.values.additionalInfo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.additionalInfo && formik.errors.additionalInfo
            }
          /> */}
          <Button
            disabled={
              !selectedPark &&
              !ProviderAgency &&
              selectedPark === null && 
              ProviderAgency === null 
            }
            type="submit"
            className="w-full mt-20 text-white"
          >
            {isLoading ? <ClipLoader color="#ffffff" /> : "Submit Request"}
          </Button>
          <ToastContainer />
        </div>
      </form>
    </>
  );
}
