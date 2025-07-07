"use client";

import React from "react";
import Link, { LinkProps } from "next/link";

import { cn } from "@/lib/utils/style-functions/cn";
interface ImageLinkProps extends LinkProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function ImageLink({
  href,
  children,
  className = "",
  style,
  ...props
}: ImageLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "block no-underline transition-opacity hover:opacity-80 focus:opacity-90",
        className,
      )}
      style={style}
      {...props}
    >
      {children}
    </Link>
  );
}
