import React from "react";
import Button from "../button";

export default function RequestDetails({ type }: { type: string }) {
  return (
    <div className="grid grid-cols-1 gap-10">
      <div className="text-sm italic">
        {type !== "companyTrack" ? (
          <>
            <p>
              Departure Park from
              <span className="font-bold ml-2">Kaduna Oluku Park</span>
            </p>
            <p>
              Destination City<span className="font-bold ml-2">Lagos</span>
            </p>
          </>
        ) : (
          <p>
            Company Name<span className="font-bold ml-2">Adetayo PLCk</span>
          </p>
        )}
      </div>
      <div className="">
        <p className="text-sm">Driver&apos;s Name</p>
        <p className="font-bold text-xl text-primary">Tade Ogunsowo</p>
      </div>
      <div className="">
        <p className="text-xs text-danger">Call Driver</p>
        <Button
          className="rounded-full text-white hover:text-white mt-6"
          style="danger"
          // onClick={() => router.push('/manage-trips/set-trip')}
          type="button"
        >
          08034678348
        </Button>
      </div>
    </div>
  );
}
