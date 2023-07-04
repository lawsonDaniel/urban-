import { useState, useRef, useEffect } from "react";

export const TableDropDown = ({ action }: any) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const dropdownRef:any = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpenDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button onClick={() => setOpenDropDown(!openDropDown)}>
        {!openDropDown ? "Open" : "Close"}
      </button>
      {openDropDown && (
        <ul
          ref={dropdownRef}
          className="flex flex-col gap-2 absolute z-10 shadow-lg bg-white p-2 rounded-md w-[200px] lg:ml-[75px] md:ml-[auto] ml-[auto]"
        >
          {action?.type.map((a: any, i: number) => {
            return (
              <li
                key={i}
                className={`${a === "delete" ? "text-red-500" : "text-green-500"} capitalize`}
                onClick={() => setOpenDropDown(false)}
              >
                {a}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
