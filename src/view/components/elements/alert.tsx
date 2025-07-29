import { ReactNode } from "react";

import { cn } from "@/lib/utils/style-functions";

import { Iconify } from "../iconify";

interface AlertProps {
  children: ReactNode;
  variant?: "success" | "error" | "warning" | "info";
  className?: string;
  title?: string;
}

export default function Alert({
  children,
  variant = "info",
  className = "",
  title,
}: AlertProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border px-3 py-2 text-base",
        variantClasses[variant],
        className,
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <Iconify
          icon={variantIcons[variant]}
          className="mt-0.5 h-5 w-5 flex-shrink-0"
        />
        <div className="text-sm">
          {title && <p className="mb-1 font-medium">{title}</p>}
          <p>{children}</p>
        </div>
      </div>
    </div>
  );
}

const variantClasses = {
  success: "bg-green-100 text-green-800 border-green-800",
  error: "bg-red-100 text-red-800 border-red-800",
  warning: "bg-yellow-50 text-yellow-600 border-yellow-200",
  info: "bg-blue-50 text-blue-800 border-blue-300",
};

const variantIcons = {
  success: "mdi:check-circle",
  error: "mdi:alert-circle",
  warning: "mdi:information-outline",
  info: "mdi:information-outline",
};
