import React from "react";
import Button from "../../button";

export default function CTA({
  text,
  type,
  onClick,
}: {
  text: string;
  type: string;
  onClick: () => void;
}) {
  const style =
    type === "green"
      ? "w-full text-primary bg-primary bg-opacity-20 hover:bg-primary hover:text-white"
      : type === "blue"
      ? "w-full bg-primary_blue text-primary_blue bg-opacity-20 hover:bg-primary_blue hover:text-white"
      : type === "red"
      ? "w-full bg-primary_red text-primary_red bg-opacity-20 hover:bg-primary_red hover:text-white"
      : "";
  return (
    <Button type="button" className={style} onClick={() => onClick()}>
      {text}
    </Button>
  );
}
