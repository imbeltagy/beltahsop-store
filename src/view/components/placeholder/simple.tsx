import React from "react";

import { Iconify } from "../iconify";

export default function SimplePlaceholder({
  icon,
  text,
  className = "",
  style = {},
  ...props
}: {
  icon: string;
  text: string;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}) {
  return (
    <div
      className={`flex h-full flex-col items-center justify-center ${className}`}
      style={style}
      {...props}
    >
      <Iconify icon={icon} fontSize={64} />
      <p className="mt-2 text-center text-sm text-gray-500">{text}</p>
    </div>
  );
}
