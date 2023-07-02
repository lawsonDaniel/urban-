"use client";
import React, { useState } from "react";
import Modal from "./modal";
import BookingStatus from "./manage/bookingStatus";
import MenuDropdown from "./dropdownMenu";
import { BsFileEarmark } from "react-icons/bs";
import { AiOutlinePicture } from "react-icons/ai";
import RequestDetails from "./manage/details";
import { useRouter } from "next/navigation";

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
    type: TableType[];
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
                key={column.id}
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
                      {action?.type.includes("download") && (
                        <MenuDropdown
                          label="Menu"
                          items={menuItems}
                          customButton={
                            <button
                              className="text-primary  hover:text-primary_dark border border-primary text-xs  rounded-full px-10 py-1"
                              onClick={() => handleSelect(row)}
                            >
                              {action?.label}
                            </button>
                          }
                        />
                      )}
                      {action?.type.includes("view") && (
                        <button
                          className="text-primary  hover:text-primary_dark border border-primary text-xs  rounded-full px-10 py-1"
                          onClick={() => handleSelect(row)}
                        >
                          {action?.viewLabel || "View"}
                        </button>
                      )}

                      {action?.type.includes("edit") && (
                        <button
                          className="text-primary_blue ml-2  hover:text-primary_dark border border-primary_blue text-xs  rounded-full px-10 py-1"
                          onClick={() => handleSelect(row)}
                        >
                          {action?.editLabel || "Edit"}
                        </button>
                      )}

                      {action?.type.includes("delete") && (
                        <button
                          className="text-primary_red ml-2  hover:text-primary_dark border border-primary_red text-xs  rounded-full px-10 py-1"
                          onClick={() => handleSelect(row)}
                        >
                          {action?.deleteLabel || "Delete"}
                        </button>
                      )}
                      {action?.type.includes("completed") && (
                        <p className="text-primary">Completed</p>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <p className="mt-3 text-sm text-primary underline flex text-center justify-center hover:cursor-pointer">
        View all
      </p>
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
