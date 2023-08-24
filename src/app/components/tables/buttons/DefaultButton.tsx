import Button from "@mui/material/Button";
// import Spinner from "../Spinner";
import { ClipLoader } from "react-spinners";
import "../button.scss";
type PropT = {
  title: string;
  handleSubmit?: Function;
  isDisabled?: boolean;
  isLoading: boolean;
  width?: string;
  heigth?: string;
  backgroundColor?: string;
  color?: string;
  type?: any;
};
export default function DefaultButton({
  title,
  handleSubmit,
  isDisabled,
  isLoading,
  width,
  heigth,
  backgroundColor,
  color,
  type,
}: PropT) {
  return (
    <Button
      variant="contained"
      className=" default-button flex items-center justify-center rounded-[0.20rem]"
      style={{
        backgroundColor: backgroundColor ?? "#036E03",
        textTransform: "capitalize",
        fontWeight: "100",
        color: color ?? "#fff",
        height: heigth ?? "3rem",
        width: width ?? "100%",
      }}
      type={type ? type : "submit"}
      disabled={isDisabled}
      onClick={() => handleSubmit && handleSubmit()}
    >
      {isLoading ? <ClipLoader  /> : title}
    </Button>
  );
}
