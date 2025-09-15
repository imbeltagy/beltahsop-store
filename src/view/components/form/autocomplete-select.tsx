"use client";

import { useRef, useState, useEffect, useCallback } from "react";

import { cn } from "@/lib/utils/style-functions";

import { Iconify } from "../iconify";

interface Option {
  value: string;
  label: string;
}

interface AutocompleteSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  onSearch?: (searchTerm: string) => void;
  loading?: boolean;
  placeholder?: string;
  clearable?: boolean;
  className?: string;
}

export default function AutocompleteSelect({
  options,
  value,
  onChange,
  onSearch,
  loading = false,
  placeholder = "Select an option",
  clearable = false,
  className,
}: AutocompleteSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState(200);

  const selectedOption = options.find((option) => option.value === value);

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Handle search with debounce
  useEffect(() => {
    if (onSearch && searchTerm) {
      const timeoutId = setTimeout(() => {
        onSearch(searchTerm);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, onSearch]);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = useCallback(
    (selectedValue: string) => {
      onChange(selectedValue);
      setIsOpen(false);
      setSearchTerm("");
      setHighlightedIndex(-1);
      inputRef.current?.blur();
    },
    [onChange],
  );
  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange("");
      setSearchTerm("");
    },
    [onChange],
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          setIsOpen(true);
          inputRef.current?.focus();
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1,
          );
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            handleSelect(filteredOptions[highlightedIndex].value);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setSearchTerm("");
          setHighlightedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    },
    [isOpen, highlightedIndex, filteredOptions, handleSelect],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setHighlightedIndex(-1);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    setSearchTerm("");
  };

  // Update max height when menu opens
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.top;
      setMaxHeight(Math.min(200, spaceBelow - 10));
    }
  }, [isOpen]);

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={isOpen ? searchTerm : selectedOption?.label || ""}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-md border border-gray-300 px-3 py-2 text-sm",
            "focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none",
            "disabled:bg-gray-50 disabled:text-gray-500",
            clearable && value ? "pe-16" : "pe-8",
          )}
          disabled={loading}
        />

        {/* Clear button */}
        {clearable && value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 end-8 flex w-6 items-center justify-center"
            title="Clear selection"
          >
            <Iconify
              icon="iconoir:xmark"
              className="h-4 w-4 text-gray-400 transition-colors hover:text-gray-600"
            />
          </button>
        )}

        {/* Dropdown arrow */}
        <div className="absolute inset-y-0 end-0 flex w-8 items-center justify-center">
          {loading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
          ) : (
            <Iconify
              icon={isOpen ? "iconoir:nav-arrow-up" : "iconoir:nav-arrow-down"}
              className="h-4 w-4 text-gray-400"
            />
          )}
        </div>
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-full z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg"
          style={{ maxHeight: `${maxHeight}px` }}
        >
          <div className="max-h-full overflow-y-auto">
            {filteredOptions.length > 0 ? (
              <ul className="py-1">
                {filteredOptions.map((option, index) => (
                  <li
                    key={option.value}
                    className={cn(
                      "cursor-pointer px-3 py-2 text-sm hover:bg-gray-100",
                      index === highlightedIndex && "bg-gray-100",
                      option.value === value && "bg-blue-50 text-blue-600",
                    )}
                    onClick={() => handleSelect(option.value)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">
                {loading ? "Loading..." : "No options found"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
