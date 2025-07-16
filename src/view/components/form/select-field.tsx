"use client";

import { useRef, useState, ReactNode, useEffect, useCallback } from "react";

import { cn } from "@/lib/utils/style-functions";

import { Iconify } from "../iconify";

interface props {
  name: string;
  options: { name: string; label: string; icon?: ReactNode }[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}

export default function SelectField({
  name,
  options,
  value = "",
  onChange,
  error,
}: props) {
  const [isOpen, setIsOpen] = useState(false);

  const onSelect = useCallback(
    (selectValue: string) => {
      onChange?.(selectValue);
      setIsOpen(false);
    },
    [onChange],
  );

  const currentOption = options.find((option) => option.name === value);

  const menuRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState(100000);

  useEffect(() => {
    function handleResize() {
      setMaxHeight(
        (innerHeight || 0) -
          Number(menuRef.current?.getBoundingClientRect().top) -
          10,
      );
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [menuRef, isOpen]);

  return (
    <div className="w-full">
      {/* Title */}
      <label
        htmlFor={name}
        role="button"
        aria-controls={`${name}-menu`}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "text-primary flex w-full items-center justify-between gap-2 rounded px-3 py-1.5 text-start font-semibold",
          "border-2 hover:border-gray-900 has-[*:focus]:border-gray-900 dark:hover:border-white dark:has-[*:focus]:border-white",
          error && "border-rose-500 hover:border-rose-800",
        )}
      >
        <span className="block shrink-0">{currentOption?.icon}</span>
        <input
          type="text"
          className="w-2 grow cursor-[inherit] bg-transparent outline-none"
          value={currentOption?.label || ""}
          readOnly
        />

        {/* Arrow */}
        <Iconify icon="iconoir:nav-arrow-down" className="h-auto w-8" />
      </label>
      {/* options */}
      <div
        ref={menuRef}
        className={cn(
          "bg-default absolute top-full z-50 mt-2 w-full overflow-y-auto rounded border border-gray-200 shadow-md",
          !isOpen && "hidden",
        )}
        style={{ maxHeight: `min(${maxHeight}px, 50svh)` }}
      >
        <ul id={`${name}-menu`}>
          {options.map((option) => (
            <li
              className="text-primary hover:bg-gray-10 flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              key={option.name}
              onClick={() => onSelect(option.name)}
            >
              {option.icon}
              {option.label}
            </li>
          ))}
        </ul>
      </div>
      {typeof error === "string" && (
        <p className="ps-1 pt-1 text-xs text-rose-500">{error}</p>
      )}
    </div>
  );
}
