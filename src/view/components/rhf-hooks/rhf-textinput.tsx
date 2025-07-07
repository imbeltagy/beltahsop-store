// This file will be renamed to rhf-textinput.tsx and rewritten to use Flowbite components. See next step for rhf-textarea.tsx.

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Button, TextInput, TextInputProps } from "flowbite-react";

import { Icons } from "@/lib/config/icons";
import { cn } from "@/lib/utils/style-functions/cn";

import { Iconify } from "../iconify";

interface Props extends TextInputProps {
  name: string;
  label?: string;
  helperText?: string;
  type?: string;
  fullWidth?: boolean;
}

export default function RHFTextInput({
  name,
  label,
  helperText,
  type: inputType,
  fullWidth,
  ...props
}: Props) {
  const { control } = useFormContext();
  const [type, setType] = useState(inputType);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className={cn("flex flex-col gap-1", fullWidth && "w-full")}>
          {label && <label className="mb-1 text-sm font-medium">{label}</label>}
          <div className="relative">
            <TextInput
              {...field}
              {...props}
              color={error ? "failure" : undefined}
              type={type}
            />
            {inputType === "password" && !!field.value && (
              <Button
                type="button"
                size="xs"
                color="alternative"
                className="absolute top-1/2 right-2 -translate-y-1/2 p-1"
                onClick={() =>
                  setType(type === "password" ? "text" : "password")
                }
              >
                <Iconify
                  icon={type === "password" ? Icons.EYE : Icons.EYE_OFF}
                  className="h-5 w-5"
                />
              </Button>
            )}
          </div>
          {(error?.message || helperText) && (
            <p
              className={`mt-1 text-xs ${error ? "text-red-600" : "text-gray-500"}`}
            >
              {error?.message || helperText}
            </p>
          )}
        </div>
      )}
    />
  );
}
