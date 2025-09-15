"use client";

import { cn } from "@/lib/utils/style-functions";
import { Iconify } from "../iconify";

interface ChipProps {
  label: string;
  onDelete?: () => void;
  color?: "blue" | "green" | "purple" | "orange" | "red" | "indigo" | "gray";
  className?: string;
}

export default function Chip({
  label,
  onDelete,
  color = "gray",
  className,
}: ChipProps) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    green: "bg-green-100 text-green-800 border-green-200",
    purple: "bg-purple-100 text-purple-800 border-purple-200",
    orange: "bg-orange-100 text-orange-800 border-orange-200",
    red: "bg-red-100 text-red-800 border-red-200",
    indigo: "bg-indigo-100 text-indigo-800 border-indigo-200",
    gray: "bg-gray-100 text-gray-800 border-gray-200",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium",
        colorClasses[color],
        className,
      )}
    >
      <span>{label}</span>
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-black/10"
        >
          <Iconify icon="iconoir:xmark" className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
