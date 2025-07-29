import { ReactNode } from "react";

import { cn } from "@/lib/utils/style-functions";

interface TooltipProps {
  label: string;
  children: ReactNode;
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
}

export default function Tooltip({
  label,
  children,
  className,
  position = "top",
}: TooltipProps) {
  return (
    <span
      className="group relative inline-flex items-center focus-within:outline-none"
      tabIndex={0}
    >
      {children}
      <span
        className={cn(
          "pointer-events-none absolute z-20 scale-95 rounded bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100",
          position === "top" && "bottom-full left-1/2 mb-2 -translate-x-1/2",
          position === "bottom" && "top-full left-1/2 mt-2 -translate-x-1/2",
          position === "left" && "top-1/2 right-full mr-2 -translate-y-1/2",
          position === "right" && "top-1/2 left-full ml-2 -translate-y-1/2",
          className,
        )}
        role="tooltip"
        aria-hidden="true"
      >
        {label}
      </span>
    </span>
  );
}
