"use client";
import React, { useState } from "react";
import CheckBox from "@/app/components/checkbox";

export default function Seat() {
  const rows = ["A", "B", "C"];
  const cols = ["1", "2", "3", "4"];
  // const [selectedSeat, setSelectedSeat] = useState(options[0].value)
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="">
      <div className="grid grid-cols-4 gap-4">
        {cols.map((col) => (
          <div key={col} className="col-span-1">
            <div className="grid grid-rows-2 gap-2">
              {rows.map((row) => (
                <button
                  key={`${row}${col}`}
                  className="bg-green-500 text-white w-18 h-18 font-bold py-2 rounded-lg hover:bg-green-600"
                >
                  {`${row}${col}`}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center ml-2">
        <CheckBox label="Number of Seats Occupied" checked={isChecked} />
        <div className="ml-3">
          <CheckBox label="Empty Seats" checked={isChecked} />
        </div>
      </div>
    </div>
  );
}
