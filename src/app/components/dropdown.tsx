"use client";
import { DropDownSelectProps, RadioOption } from "@/common/types";
import { Fragment, useState } from "react";
import { BiChevronDown } from "react-icons/bi";

function Dropdown({
  options,
  onSelect,
  placeholder,
  className,
  label,
  containerStyle = "mt-8",
  setSelectedOption: setOption,
}: DropDownSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<RadioOption>();

  function handleOptionClick(option: RadioOption) {
    setOption?.(option);
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) onSelect(option.value);
  }

  return (
    <div className={`${containerStyle} w-full relative inline-block text-left`}>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700 mb-1 "
      >
        {label}
      </label>
      <div>
        <button
          type="button"
          className={`${className} border-arsh border inline-flex justify-between rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary `}
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption ? selectedOption.label : placeholder}

          <BiChevronDown size={24} />
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute left-0 mt-2 w-full h-[200px] overflow-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option: any) => (
              <button
                key={option.value}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                onClick={() => handleOptionClick(option)}
                role="menuitem"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
