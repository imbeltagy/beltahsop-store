"use client";

import { Label, ToggleSwitch } from "flowbite-react";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  name: string;
  label?: string;
}

export default function RHFSwitch({
  name,
  label,
  className = "",
  ...props
}: Props & { className?: string }) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className={`flex items-center gap-2 ${className}`}>
          <ToggleSwitch {...field} checked={field.value} {...props} />
          {label && <Label>{label}</Label>}
        </div>
      )}
    />
  );
}
