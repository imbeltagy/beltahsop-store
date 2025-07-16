import React from "react";

import { Icons } from "@/lib/config/icons";
import { cn } from "@/lib/utils/style-functions";
import { Iconify } from "@/view/components/iconify";

interface BrokenImageProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
}

export default function BrokenImage({
  className = "",
  style,
  ...props
}: BrokenImageProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-full bg-gray-100 text-gray-400",
        className,
      )}
      style={style}
      {...props}
    >
      <Iconify icon={Icons.BROKEN_IMAGE} />
    </div>
  );
}
