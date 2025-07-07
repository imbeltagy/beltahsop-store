import React from "react";

import { cn } from "@/lib/utils/style-functions/cn";

import { Iconify } from "../iconify";
import { iconSizeClasses } from "./styles";

export interface ChipProps {
  children: React.ReactNode;
  color?: "primary" | "default" | "white";
  size?: "small" | "medium" | "large";
  icon?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Chip({
  children,
  color = "default",
  size = "medium",
  icon,
  className = "",
  onClick,
  disabled = false,
}: ChipProps) {
  const classes = cn(
    baseClasses,
    sizeClasses[size],
    colorClasses[color],
    disabled && "opacity-50 cursor-not-allowed",
    onClick && "cursor-pointer",
    className,
  );

  const Component = onClick ? "button" : "div";

  return (
    <Component
      className={classes}
      onClick={onClick}
      disabled={disabled}
      type={onClick ? "button" : undefined}
    >
      {icon && <Iconify icon={icon} className={iconSizeClasses[size]} />}
      {children}
    </Component>
  );
}

const baseClasses =
  "inline-flex items-center gap-2 transition-all duration-200";

const sizeClasses = {
  small: "rounded-full px-3 py-1 text-sm font-medium",
  medium: "rounded-full px-4 py-2 text-sm font-medium",
  large: "rounded-full px-4 py-2 font-medium",
};

const colorClasses = {
  primary: "bg-purple-100 text-purple-600 hover:bg-purple-200",
  default: "border border-gray-200 bg-white text-gray-600 hover:bg-purple-50",
  white:
    "border border-white/20 bg-white/10 text-white/90 backdrop-blur-sm hover:bg-white/20",
};
