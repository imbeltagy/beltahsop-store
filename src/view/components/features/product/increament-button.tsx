import { useMemo } from "react";
import { TextInput, TextInputProps } from "flowbite-react";

import { Icons } from "@/lib/config/icons";
import { cn } from "@/lib/utils/style-functions/cn";

import { Button } from "../../elements";
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
}

export default function IncreamentButton({
  value,
  onChange,
  step = 1,
  min = 0,
  max = 100,
  slots = {},
  className = "",
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
    }),
    [slots.textInput, value],
  );

  return (
    <div className={cn("flex", className)}>
      <Button {...decreseButton} />
      <TextInput {...textInput} />
      <Button {...incrementButton} />
    </div>
  );
}
