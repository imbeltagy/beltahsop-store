import { ReactNode } from "react";

import { cn } from "@/lib/utils/style-functions";

interface AlertProps {
  children: ReactNode;
  variant?: "success" | "error" | "warning" | "info";
  className?: string;
  size?: "medium" | "large";
}

export default function Alert({
  children,
  variant = "info",
  className = "",
  size = "medium",
}: AlertProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      role="alert"
    >
      {children}
    </div>
  );
}

const variantClasses = {
  success: "bg-green-100 text-green-800 border-green-800",
  error: "bg-red-100 text-red-800 border-red-800",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-800",
  info: "bg-blue-100 text-blue-800 border-blue-800",
};

const sizeClasses = {
  medium: "text-base px-3 py-2",
  large: "text-lg px-4 py-3",
};
