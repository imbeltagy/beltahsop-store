import React from "react";

export function UploadBoxWrapper({
  disabled,
  error,
  dragActive,
  className = "",
  style = {},
  children,
  ...props
}: {
  disabled?: boolean;
  error?: boolean;
  dragActive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  [key: string]: any;
}) {
  // Tailwind classes for the wrapper
  let base =
    "relative w-full h-[200px] overflow-hidden rounded border border-dashed flex items-center justify-center transition-opacity duration-200";
  let border = error
    ? "border-red-500 bg-red-50"
    : "border-gray-300 bg-gray-100";
  let cursor = disabled ? "cursor-default" : "cursor-pointer";
  let opacity = dragActive ? "opacity-70" : "";

  return (
    <div
      className={`${base} ${border} ${cursor} ${opacity} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}
