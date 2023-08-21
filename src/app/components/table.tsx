"use client";
import React, { useState } from "react";
import Modal from "./modal";
import BookingStatus from "./manage/bookingStatus";
import MenuDropdown from "./dropdownMenu";
import { BsFileEarmark } from "react-icons/bs";
import { AiOutlinePicture } from "react-icons/ai";
import RequestDetails from "./manage/details";
import { useRouter } from "next/navigation";
import { TableDropDown } from "./tableDropDown";

type Column = {
  id: string;
  header: string;
  render?: (row: any) => React.ReactNode;
};

type TableType =
  | "view"
  | "edit"
  | "delete"
  | "custom"
  | "download"
  | "completed";

type Row = {
  id: number;
  [key: string]: any;
};

type Props = {
  columns: Column[];
  data: Row[];
  action?: {
    label?: string;
    editLabel?: string;
    viewLabel?: string;
    deleteLabel?: string;
    type: any[];
  };
  noAction?: boolean;
  hideDefaultBody?: boolean;
  type?: string;
  path?: string;
  modalBody?: React.ReactNode;
};

const Table = ({
  columns,
  data,
  action,
  noAction,
  type,
  modalBody,
  hideDefaultBody,
  path,
}: Props) => {
  const [selected, setSelected] = useState<Row>();

  const handleSelect = (row: Row) => {
    // console.log(type)
    if (
      type === "detailsTrack" ||
      type === "companyTrack" ||
      type === "booking"
    )
      openModal();
    if (path) router.push(path);
    setSelected(row);
  };

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const openModal = () => {
    // if (path) router.push(path)
    // else
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleMenuItemClick = () => {
    console.log("Menu item clicked");
  };

  const menuItems = [
    {
      label: (
        <div className="flex">
          <BsFileEarmark className="text-primary" />
          <p className="ml-2">PDF</p>
        </div>
      ),
      onClick: handleMenuItemClick,
    },
    {
      label: (
        <div className="flex">
          <AiOutlinePicture className="text-primary" />
          <p className="ml-2">Picture</p>
        </div>
      ),
      onClick: handleMenuItemClick,
    },
  ];

  return (
    <div className="bg-white rounded-md">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column: Column) => (
              <th
                key={column?.id}
                className="px-4 py-3  text-sm text-primary capitalize text-center font-normal tracking-wider"
              >
                {column.header}
              </th>
            ))}
            <th className="px-4 py-3 text-sm text-primary capitalize text-center font-normal tracking-wider">
              {!noAction && type !== "completed" && "Action"}
            </th>
          </tr>
        </thead>
        <tbody className="">
          {data &&
            Array.isArray(data) &&
            data.map((row: Row) => (
              <tr
                key={row.id}
                className={`${selected === row ? "bg-gray-100" : ""} ${
                  row.id % 2 === 0 ? "bg-gray-100" : ""
                } text-center font-normal`}
              >
                {columns.map((column: Column) => (
                  <td key={column.id}>
                    <div
                      className={`px-4 py-3 whitespace-nowrap text-sm
											
											${column.id === "bookingStatus" && "text-primary cursor-pointer underline"}
											`}
                      onClick={() =>
                        column.id === "bookingStatus" && openModal()
                      }
                    >
                      {column.render ? column.render(row) : row[column.id]}
                    </div>
                  </td>
                ))}
                <td className="whitespace-nowrap text-center text-sm font-medium">
                  {!noAction && (
                    <>
                      <TableDropDown action={action} />
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Modal isOpen={isOpen} onClose={closeModal}>
        {!hideDefaultBody && type && type === "booking" ? (
          <BookingStatus data={selected} />
        ) : type === "detailsTrack" || type === "companyTrack" ? (
          <RequestDetails type={type} />
        ) : null}
        {modalBody}
      </Modal>
    </div>
  );
};

export default Table;
