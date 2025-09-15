"use client";

import { useMemo, useCallback } from "react";

import { cn } from "@/lib/utils/style-functions";

interface MultiRangeProps {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  className?: string;
}

export default function MultiRange({
  min,
  max,
  step,
  value,
  onChange,
  className,
}: MultiRangeProps) {
  const [minValue, maxValue] = value;

  // Convert to percentage
  const getPercent = useCallback(
    (val: number) => {
      return Math.round(((val - min) / (max - min)) * 100);
    },
    [max, min],
  );

  // Calc Custom Range Style
  const rangeStyle = useMemo(() => {
    const minPercent = getPercent(minValue);
    const maxPercent = getPercent(maxValue);

    return {
      left: `${minPercent}%`,
      width: `${maxPercent - minPercent}%`,
    };
  }, [getPercent, minValue, maxValue]);

  const handleMinChange = (newMin: number) => {
    const adjustedMin = Math.min(newMin, maxValue - step);
    onChange([adjustedMin, maxValue]);
  };

  const handleMaxChange = (newMax: number) => {
    const adjustedMax = Math.max(newMax, minValue + step);
    onChange([minValue, adjustedMax]);
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="relative h-2 w-full">
        {/* Custom Track */}
        <div className="absolute z-0 h-full w-full rounded bg-gray-200" />
        {/* Custom Range */}
        <div
          className="absolute z-10 h-full rounded bg-blue-500"
          style={rangeStyle}
        />
        {/* Left Thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={(event) => {
            handleMinChange(Number(event.target.value));
          }}
          className={cn(
            "pointer-events-none absolute top-1/2 z-20 w-full -translate-y-1/2 appearance-none bg-transparent accent-blue-200 [&::-webkit-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:pointer-events-auto",
            minValue >= maxValue - step * 2 && "z-40",
          )}
        />
        {/* Right Thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={(event) => {
            handleMaxChange(Number(event.target.value));
          }}
          className="pointer-events-none absolute top-1/2 z-30 w-full -translate-y-1/2 appearance-none bg-transparent accent-blue-200 [&::-webkit-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:pointer-events-auto"
        />
      </div>
    </div>
  );
}
