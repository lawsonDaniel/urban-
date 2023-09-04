import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type: "button" | "submit" | "reset" | undefined;
  style?: "outline" | "solid" | "danger";
};

const Button = ({
  children,
  onClick,
  disabled = false,
  className = "",
  type,
  style = "solid",
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`px-4 h-[54px] ${
        style === "solid"
          ? "bg-primary hover:bg-green-600"
          : style === "outline"
          ? "bg-white border border-primary border-2 text-primary"
          : style === "danger" && "bg-danger"
      }  font-semibold rounded-[10px] ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
