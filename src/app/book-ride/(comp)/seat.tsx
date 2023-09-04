"use client";
import Button from "@/app/components/button";
import CheckBox from "@/app/components/checkbox";
import Dropdown from "@/app/components/dropdown";
import { useFormik } from "formik";
import React, { useState } from "react";

export default function SelectSeat({ setStep, setHide }: any) {
  const options = [
    { value: "a1", label: "A1" },
    { value: "a2", label: "A2" },
    { value: "a3", label: "A3" },
    { value: "a4", label: "A4" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(options[0].value);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      {/* <div className='flex justify-center'>
                <CheckBox label="Number of Seats Occupied" checked={isChecked} onChange={handleCheckboxChange} />
                <div className='ml-3'>
                    <CheckBox label="Empty Seats" checked={isChecked} onChange={handleCheckboxChange} />
                </div>
            </div> */}
      <Dropdown
        options={options}
        placeholder="Option"
        label="Select a Seat"
        onSelect={(e: any) => setSelectedSeat(e)}
        className="w-full"
      />
      <Button
        type="submit"
        className="w-full mt-10 text-white"
        onClick={() => {
          setStep("manifest");
          setHide(true);
        }}
      >
        Proceed to Manifest
      </Button>
    </>
  );
}
