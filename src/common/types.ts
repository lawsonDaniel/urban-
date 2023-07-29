import { FormikConfig, FormikProps, FormikValues } from "formik";
import { ChangeEventHandler, FocusEventHandler } from "react";

export enum USER_TYPE {
  PARK_OWNER = "parkOwner",
  PARK_MANAGER = "parkManager",
  DISPATCH_OFFICER = "dispatchOfficer",
}

export enum AccountType {
  INDIVIDUAL = "IND",
  COPORATE = "COPORATE",
  PARKMANAGER = "PARKMANAGER",
}

export enum AccountCategory {
  PARK = "PARK",
  PASSENGER = "PASSENGER",
  PROVIDER = "PROVIDER",
  FLEET = "FLEET",
  DISPATCH = "DISPATCH",
}

export enum CarCategory {
  SEDAN = "SEDAN",
  BUS = "BUS",
  OTHERS = "OTHERS",
  VAN = "VAN",
}

export enum LuggageCategory {
  NORMAL = "NORMAL",
  EXTRA = "EXTRA",
}

export enum LogsCategory {
  NEW_TRIP = "NEW_TRIP",
  NEW_TRIP_BOOKING = "NEW_TRIP_BOOKING",
  NEW_TRIP_COMPLETION = "NEW_TRIP_COMPLETION",
  NEW_PASSENGER_REG = "NEW_PASSENGER_REG",
  NEW_FLEET_REG = "NEW_FLEET_REG",
  NEW_PROVIDER_REG = "NEW_PROVIDER_REG",
  NEW_DRIVER_REG = "NEW_DRIVER_REG",
  NEW_PARKMANAGER_REG = "NEW_PARKMANAGER_REG",
  NEW_PARKOWNER_REG = "NEW_PARKOWNER_REG",
  NEW_PARK = "NEW_PARK",
}

export enum TripStats {
  CANCELLED = "CANCELLED",
  SCHEDULED = "SCHEDULED",
  SUCCESSFUL = "SUCCESSFUL",
  COMPLETED = "COMPLETED",
}

export enum AccountNotification {
  NEW_TRIP = "NEW_TRIP",
  NEW_TRIP_BOOKING = "NEW_TRIP_BOOKING",
  TRIP_MODIFICATION = "TRIP_MODIFICATION",
  NEW_DISPATCH_OFFICER = "NEW_DISPATCH_OFFICER",
  NEW_PARK_MANAGER = "NEW_PARK_MANAGER",
}

export enum IncomingVehicleRequest {
  PROCESSED = "PROCESSED",
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
}

export type InputProps = {
  id: string;
  name: string;
  label?: string;
  type: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  containerStyle?: string;
  inputStyle?: string;
  icon?: React.ReactNode;
  error?: string | boolean | undefined;
  placeholder?: string;
};

export type RadioOption = {
  label: string;
  value: string;
};

export type RadioSelectProps = {
  name: string;
  options: RadioOption[];
  formik: any;
};
export type DropDownSelectProps = {
  className?: string;
  label?: string;
  containerStyle?: string;
  options: RadioOption[] | any;
  onSelect?: (e: string) => void;
  setSelectedOption?: (value: RadioOption) => void;
  placeholder: string;
  error?: any;
};

export interface RadioProps {
  name: string;
  options: { label: string; value: string }[];
  className?: string;
  customContainerStyle?: string;
  customActiveStyle?: string;
  customInputWrapperStyle?: string;
  data: string;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
}

export interface ParkUserData {
  accountCategory: AccountCategory;
  accountStats: string;
  accountType: AccountType;
  companyAddress: string;
  companyName: string;
  companyRc: string;
  country_: string;
  deviceInfo_: string | null;
  earnings: number;
  email_: string;
  firstName: string;
  isAccountVerified: false;
  isEmailVerified_: false;
  lastName: string;
  lastSeen_: Date;
  online_: false;
  phone_: string;
  regDate_: Date;
  totalTrip: number;
  userType?: string;
}

export interface ParkManagerData {
  accountCategory: AccountCategory;
  accountStats: string;
  accountType: AccountType;
  country_: string;
  deviceInfo_: null | undefined;
  earnings: number;
  email_: string;
  firstName: string;
  isAccountVerified: boolean;
  isEmailVerified_: boolean;
  lastName: string;
  lastSeen_: Date;
  online_: boolean;
  parkToManage: string;
  parkManagerIdentity: string;
  phone_: string;
  regDate_: Date;
  totalTrip: number;
  userType?: string;
}

export type addParkData = {
  address: string;
  createdAt: string;
  dispatchOfficers?: undefined | null;
  earnings: number;
  isDeleted: boolean;
  managerId: string;
  manager_id: string;
  ownerEmail: string;
  ownerId: string;
  parkApproval: boolean;
  parkCity: string;
  parkNameSearch: string;
  parkRegion: string;
  parkState: string;
  phone: string;
  searchParamByID: string[];
  searchParamByName: string[];
  parkName: string;
  parkId: string;
  totalTrip: number;
  successfulTrip: number;
  scheduledTrip: number;
  cancelledTrip: number;
  regDate_: Date;
};

export type TripData = {
  assignToDriverId: string;
  assignToProviderAgencyID: string;
  assignToProviderAgencyName: string;
  bookedSeats: number;
  coupon: string;
  createdBy: string;
  dateCreated: Date;
  departureCity: string;
  departureDayInt: number;
  departureFullDate: string;
  departureHour: string;
  departureMin: string;
  departureMonth: string;
  departurePark: string;
  departureParkId: string;
  departureTimePeriod: string;
  departureYear: number;
  destinationCity: string;
  fare: number;
  isAssign: boolean;
  isAssignTo: string;
  isPublic: boolean;
  luggageType: string;
  numberOfSeats: number;
  parkOwnerId: string;
  status: string;
  time: Date;
  tripCode: string;
  tripStatus: string;
  vehicleType: string;
};
