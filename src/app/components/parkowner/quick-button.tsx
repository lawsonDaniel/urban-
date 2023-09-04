import React from "react";
import Link from "next/link";

export default function QuickAction({
  title,
  icon,
  path,
  iconClassName,
}: {
  title: string;
  iconClassName: string;
  path: string;
  icon: any;
}) {
  return (
    <Link
      href={path}
      className="h-[143px] shadow flex flex-col items-center justify-center"
    >
      <div className={` text-white rounded-full p-3 mb-2 ${iconClassName}`}>
        {icon}
      </div>
      {title}
    </Link>
  );
}
