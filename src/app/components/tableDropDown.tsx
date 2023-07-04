import { useState } from "react";

export const TableDropDown = ({ action }: any) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  return (
    <>
     <button onClick={() => setOpenDropDown(!openDropDown)}>
          {!openDropDown ? "open" : "close"}
        </button>
      {openDropDown && <ul className="flex flex-col gap-2 p-absolute shadow-lg bg-white p-2 rounded-md absolute w-[200px] lg:ml-[75px] md:ml-[auto] ml-[auto]">
        {
          action?.type.map((a: any, i: number) => {
            return <li key={i} className={`${a == "delete"||"archive" ? 'text-red-500' : "text-green-500"} capitalize`}>{a}</li>;
          })}
      </ul>}
    </>
  );
};
