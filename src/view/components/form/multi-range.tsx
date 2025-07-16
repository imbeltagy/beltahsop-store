"use client";

import { useMemo, useCallback } from "react";

import { useFormat } from "@/lib/hooks/format";
import { cn } from "@/lib/utils/style-functions";

interface props {
  name: string;
  sign?: string;
  min: number;
  max: number;
  step: number;
  currency?: boolean;
  value?: { min: number; max: number };
  onChange?: (value: { min: number; max: number }) => void;
  error?: string;
}

export default function MultiRangeSlider({
  name,
  sign,
  min,
  max,
  step,
  currency,
  value,
  onChange,
  error,
}: props) {
  const { formatCurrency } = useFormat();

  const fieldValue = value || { min: min, max: max };

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => {
      return Math.round(((value - min) / (max - min)) * 100);
    },
    [max, min],
  );

  // Calc Custom Range Style
  const rangeStyle = useMemo(() => {
    const minPercent = getPercent(fieldValue.min);
    const maxPercent = getPercent(fieldValue.max);

    return {
      insetInlineStart: `${minPercent}%`,
      width: `${maxPercent - minPercent}%`,
    };
  }, [getPercent, fieldValue.min, fieldValue.max]);

  const handleMinChange = (newMin: number) => {
    const adjustedMin = Math.min(newMin, max - step);
    onChange?.({ ...fieldValue, min: adjustedMin });
  };

  const handleMaxChange = (newMax: number) => {
    const adjustedMax = Math.max(newMax, min + step);
    onChange?.({ ...fieldValue, max: adjustedMax });
  };

  return (
    <div className="w-full">
      <div className="relative h-2 w-full">
        {/* Custom Track */}
        <div className="absolute z-0 h-full w-full rounded bg-slate-200" />
        {/* Custom Range */}
        <div
          className="absolute z-10 h-full rounded bg-emerald-500"
          style={rangeStyle}
        />
        {/* Left Thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={fieldValue.min}
          onChange={(event) => {
            handleMinChange(Number(event.target.value));
          }}
          className={cn(
            "pointer-events-none absolute top-1/2 z-20 w-full -translate-y-1/2 appearance-none bg-transparent accent-emerald-200 [&::-webkit-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:pointer-events-auto",
            fieldValue.min >= max - step * 2 && "z-40",
          )}
        />
        {/* right thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={fieldValue.max}
          onChange={(event) => {
            handleMaxChange(Number(event.target.value));
          }}
          className={`pointer-events-none absolute top-1/2 z-30 w-full -translate-y-1/2 appearance-none bg-transparent accent-emerald-200 [&::-webkit-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:pointer-events-auto`}
        />
      </div>
      {/* values */}
      <div className="text-primary mt-2 flex w-full items-center justify-between gap-2 text-sm">
        <div suppressHydrationWarning>
          {currency ? formatCurrency(fieldValue.min) : fieldValue.min}
          {sign}
        </div>
        <div suppressHydrationWarning>
          {currency ? formatCurrency(fieldValue.max) : fieldValue.max}
          {sign}
        </div>
      </div>
      {typeof error === "string" && (
        <p className="ps-1 pt-1 text-xs text-rose-500">{error}</p>
      )}
    </div>
  );
}
