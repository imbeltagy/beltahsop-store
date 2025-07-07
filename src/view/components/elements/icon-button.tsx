import React from "react";

import { cn } from "@/lib/utils/style-functions/cn";

import { Iconify } from "../iconify";
import { iconSizeClasses } from "./styles";

export interface IconButtonProps {
  icon: string;
  variant?: "primary" | "contrast" | "soft" | "glass";
  size?: "medium" | "large";
  ariaLabel?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  disabled?: boolean;
  className?: string;
  rounded?: boolean;
}

export default function IconButton({
  icon,
  variant = "primary",
  size = "medium",
  ariaLabel,
  onClick,
  href,
  target,
  disabled = false,
  className = "",
  rounded = false,
}: IconButtonProps) {
  const Component = href ? "a" : onClick ? "button" : "div";

  const combinedClasses = cn(
    baseClasses,
    variantClasses[variant],
    !disabled && variantHoverClasses[variant],
    sizeClasses[size],
    rounded ? "rounded-lg" : "rounded-full",
    "disabled:cursor-not-allowed disabled:opacity-50",
    className,
  );

  return (
    <Component
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      type={onClick ? "button" : undefined}
      href={href}
      target={target}
      aria-label={ariaLabel}
    >
      <Iconify icon={icon} className={iconSizeClasses[size]} />
    </Component>
  );
}

const baseClasses =
  "inline-flex items-center justify-center transition-all duration-300 cursor-pointer";

const variantClasses = {
  primary: "bg-purple-600 text-white",
  contrast: "bg-white text-purple-600 shadow-lg",
  soft: "bg-purple-100 text-purple-600",
  glass: "bg-white/20 backdrop-blur-md text-white",
};

const variantHoverClasses = {
  primary: "hover:bg-primary",
  contrast: "hover:scale-110 hover:shadow-xl",
  soft: "hover:bg-purple-200",
  glass: "hover:scale-110 hover:bg-white/30",
};

const sizeClasses = {
  medium: "p-2 text-base",
  large: "p-3 text-xl",
};
