import { useState, useRef, useEffect } from "react";
import { BiDotsVerticalRounded } from "react-icons/all";

export const TableDropDown = ({ action }: any) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
      <div style={{ position: "relative" }}>
        <button onClick={() => setOpenDropDown(!openDropDown)}>
          <BiDotsVerticalRounded />
        </button>
        {openDropDown && (
            <ul
                ref={dropdownRef}
                className="flex flex-col gap-2 absolute z-10 shadow-lg bg-white p-2 rounded-md w-[200px] top-0 transform translate-y-8"
            >
              {action?.type.map((a: any, i: number) => {
                return (
                    <li
                        key={i}
                        className={`${a === "delete" ? "text-red-500" : "text-green-500"} capitalize text-md`}
                        onClick={() => setOpenDropDown(false)}
                    >
                      {a}
                    </li>
                );
              })}
            </ul>
        )}
      </div>
  );
};
