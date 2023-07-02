"use client";
import React from "react";
import SubHeader from "../../components/headers/sub-header";

import Processed from "./(components)/processed";
import MyTabs from "@/app/components/tabs";
import Pending from "./(components)/pending";
import Cancelled from "./(components)/cancelled";

export default function TrackReequest() {
  return (
    <div>
      <SubHeader header="Track Request" allowFilter />
      <div>
        <MyTabs
          headers={["Processed", "Pending", "Cancelled"]}
          components={[
            <Processed key="1" />,
            <Pending key="2" />,
            <Cancelled key="3" />,
          ]}
        />
      </div>
    </div>
  );
}
