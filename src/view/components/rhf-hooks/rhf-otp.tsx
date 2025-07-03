"use client";

import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextInput, Label } from "flowbite-react";

interface Props {
  name: string;
  label?: string;
}

export default function RHFOTP({
  name,
  label,
  helperText,
  ...props
}: Props & { helperText?: string }) {
  const { control } = useFormContext();
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleKeyDown =
    (index: number, fieldValue?: string, onChange?: (value: string) => void) =>
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        if (fieldValue) {
          // If field has value, clear it
          onChange?.("");
        } else if (index > 0) {
          // If field is empty, go to previous field and clear it
          const prevInput = inputRefs[index - 1].current;
          prevInput?.focus();
          prevInput?.select();
          onChange?.("");
        }
      }
    };

  const handleChange =
    (index: number, onChange: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (value.length === 1 && index < 3) {
        const nextInput = inputRefs[index + 1].current;
        nextInput?.focus();
        nextInput?.select();
      }
      onChange(value);
    };

  return (
    <div className="flex flex-col gap-2">
      {label && <Label>{label}</Label>}
      <div dir="ltr">
        <div className="flex flex-row justify-center gap-2">
          {[0, 1, 2, 3].map((index) => (
            <Controller
              key={index}
              control={control}
              name={`${name}.${index}`}
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  {...props}
                  ref={inputRefs[index]}
                  color={error ? "failure" : undefined}
                  maxLength={1}
                  className="w-14 text-center text-lg"
                  style={{ caretColor: "transparent" }}
                  onChange={handleChange(index, field.onChange)}
                  onKeyDown={handleKeyDown(index, field.value, field.onChange)}
                />
              )}
            />
          ))}
        </div>
      </div>
      {helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
    </div>
  );
}
