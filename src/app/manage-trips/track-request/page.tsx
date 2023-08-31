"use client";
import React, { useState } from "react";
import SubHeader from "../../components/headers/sub-header";
import tripOBJs from "@/common/classes/trip.class";
import Processed from "./(components)/processed";
import MyTabs from "@/app/components/tabs";
import Pending from "./(components)/pending";
import Cancelled from "./(components)/cancelled";

export default function TrackReequest() {
  const [inputField, setInputField] = useState<string>('');
  
  return (
    <div>
      <SubHeader header="Track Request" inputText="Search Trips"  setInputField={setInputField} />
      <div>
        <MyTabs
          headers={["Processed", "Pending"]}
          components={[
            <Processed key="1" inputField={inputField}/>,
            <Pending key="2"  inputField={inputField}/>,
            // <Cancelled key="3" inputField={inputField}/>,
          ]}
        />
      </div>
    </div>
  );
}
