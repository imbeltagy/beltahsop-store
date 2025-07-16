import Link from "next/link";
import React, { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils/style-functions";

import { Iconify } from "../iconify";
import { iconSizeClasses } from "./styles";

export type ButtonProps = {
  variant?: "contained";
  color?: "primary";
  size?: "medium" | "large";
  rounded?: boolean;
  startIcon?: string;
  endIcon?: string;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
} & (
  | {
      href?: string;
      target?: string;
      download?: boolean;
      className?: string;
      children: React.ReactNode;
    }
  | ButtonHTMLAttributes<HTMLButtonElement>
);

export default function Button({
  children,
  startIcon,
  endIcon,
  variant = "contained",
  color = "primary",
  size = "medium",
  rounded = true,
  className = "",
  disabled = false,
  loading = false,
  fullWidth = false,
  ...props
}: ButtonProps) {
  const combinedClasses = cn(
    baseClasses,
    variantClasses[variant][color],
    !disabled && !loading && variantHoverClasses[variant][color],
    sizeClasses[size],
    rounded ? "rounded-lg" : "rounded-full",
    disabled && "cursor-not-allowed opacity-50",
    className,
  );

  const content = (
    <>
      {startIcon && (
        <Iconify icon={startIcon} className={iconSizeClasses[size]} />
      )}
      {children}
      {endIcon && <Iconify icon={endIcon} className={iconSizeClasses[size]} />}
    </>
  );

  if ("href" in props) {
    const { href, target, download } = props;
    return (
      <Link
        className={cn(
          "flex items-center justify-center gap-2",
          combinedClasses,
          fullWidth && "w-full",
        )}
        href={href as string}
        download={download}
        target={target}
        aria-disabled={disabled}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={cn(
        "relative",
        loading && "pointer-events-none",
        combinedClasses,
        fullWidth && "w-full",
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Iconify
          icon="mdi:loading"
          className={cn(
            iconSizeClasses[size],
            "absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 animate-spin",
          )}
        />
      ) : null}
      <span
        className={cn(
          "flex items-center justify-center gap-2",
          loading && "opacity-0",
        )}
      >
        {content}
      </span>
    </button>
  );
}

const baseClasses =
  "transition-all duration-300 cursor-pointer w-fit no-underline!";

const variantClasses = {
  contained: {
    primary: "bg-primary text-white!",
  },
};

const variantHoverClasses = {
  contained: {
    primary: "hover:bg-primary-darker active:bg-primary-dark",
  },
};

const sizeClasses = {
  medium: "px-4 py-2",
  large: "px-8 py-4 font-semibold",
};
