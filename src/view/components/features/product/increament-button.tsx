import { useMemo } from "react";
import { TextInput, TextInputProps } from "flowbite-react";

import { Icons } from "@/lib/config/icons";
import { cn } from "@/lib/utils/style-functions";

import { Button } from "../../elements";
import { Iconify } from "../../iconify";
import { ButtonProps } from "../../elements/button";

interface Props {
  value: number;
  onChange: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
  slots?: {
    decreseButton?: ButtonProps;
    textInput?: TextInputProps;
    incrementButton?: ButtonProps;
  };
  className?: string;
  loading?: boolean;
}

export default function IncreamentButton({
  value,
  onChange,
  step = 1,
  min = 0,
  max = 100,
  slots = {},
  className = "",
  loading = false,
}: Props) {
  const decreseButton = useMemo(
    () => ({
      ...slots.decreseButton,
      className: cn("rounded-e-none py-3", slots.decreseButton?.className),
      startIcon: slots.decreseButton?.startIcon || Icons.MINUS,
      variant: slots.decreseButton?.variant || "contained",
      onClick: () => onChange(Math.max(min, value - step)),
    }),
    [slots.decreseButton, onChange, min, value, step],
  );

  const incrementButton = useMemo(
    () => ({
      ...slots.incrementButton,
      className: cn("rounded-s-none", slots.incrementButton?.className),
      startIcon: slots.incrementButton?.startIcon || Icons.PLUS,
      variant: slots.incrementButton?.variant || "contained",
      onClick: () => onChange(Math.min(max, value + step)),
    }),
    [slots.incrementButton, onChange, max, value, step],
  );

  const textInput = useMemo(
    () => ({
      ...slots.textInput,
      className: cn(
        "w-14 [&_input]:h-full [&_input]:rounded-none [&_input]:py-0 [&_input]:text-center",
        slots.textInput?.className,
      ),
      value: value.toString(),
      onChange: () => {},
    }),
    [slots.textInput, value],
  );

  return (
    <div className={cn("relative flex", className)}>
      <Button {...decreseButton} />
      <TextInput {...textInput} />
      <Button {...incrementButton} />

      {/* Loading overlay */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10 rounded-md bg-transparent",
          loading &&
            "bg-primary pointer-events-auto transition-colors duration-200",
        )}
      />
      {loading && (
        <Iconify
          icon="mdi:loading"
          className={cn(
            "h-5 w-5",
            "absolute top-1/2 left-1/2 z-20 h-6 w-6 -translate-x-1/2 -translate-y-1/2 animate-spin text-white",
          )}
        />
      )}
    </div>
  );
}
