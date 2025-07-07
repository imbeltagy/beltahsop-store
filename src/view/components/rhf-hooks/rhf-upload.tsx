"use client";

import { Label } from "flowbite-react";
import { Controller, useFormContext } from "react-hook-form";

import { FileType, FileVariant } from "@/lib/types/upload";

import UploadBox from "../upload/upload-box";

type Props = {
  name: string;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  maxSize?: number; // in bytes
  icon?: string;
} & (
  | {
      acceptedTypes?: FileType[]; // e.g., ['image/png', 'application/pdf']
    }
  | { variant?: FileVariant }
);

export default function RHFUpload({
  name,
  label,
  helperText,
  ...props
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div>
          {label && (
            <Label color={error ? "failure" : undefined} className="mb-1 block">
              {label}
            </Label>
          )}

          <UploadBox
            file={value}
            error={!!error}
            helperText={error?.message || helperText}
            onDrop={(acceptedFiles) => {
              onChange(acceptedFiles[0]);
            }}
            {...props}
          />
        </div>
      )}
    />
  );
}
