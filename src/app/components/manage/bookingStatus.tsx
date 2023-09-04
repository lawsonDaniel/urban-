// 'use client'
import React, { useState } from "react";
import Seat from "./seat";

export default function BookingStatus({ data }: any) {
  // console.log(data)
  return (
    <div className="w-full">
      {/* <p>{data.id}</p> */}
      <p className="text-primary mb-2">Seat Arrangement</p>
      <div className="w-full p-6 bg-gray-100">
        <Seat />
      </div>
    </div>
  );
}
