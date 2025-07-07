"use client";

import { Label } from "flowbite-react";
import { Controller, useFormContext } from "react-hook-form";

import { FileType, FileVariant } from "@/lib/types/upload";

import UploadMultiBox from "../upload/upload-multi-box";

type Props = {
  name: string;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  maxSize?: number; // in bytes
  icon?: string;
  draggable?: boolean;
} & (
  | {
      acceptedTypes?: FileType[]; // e.g., ['image/png', 'application/pdf']
    }
  | { variant?: FileVariant }
);

export default function RHFUploadMulti({
  name,
  label,
  helperText,
  ...props
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          {label && (
            <Label color={error ? "failure" : undefined} className="mb-1 block">
              {label}
            </Label>
          )}

          <UploadMultiBox
            files={field.value || []}
            error={!!error}
            helperText={error?.message || helperText}
            onDrop={(acceptedFiles: (File | string)[]) => {
              const newFiles = [...(field.value || []), ...acceptedFiles];
              field.onChange(newFiles);
            }}
            onReorder={(newFiles: (File | string)[]) => {
              field.onChange(newFiles);
            }}
            onRemove={(index: number) => {
              const newFiles = [...(field.value || [])];
              newFiles.splice(index, 1);
              field.onChange(newFiles);
            }}
            onRemoveAll={() => {
              field.onChange([]);
            }}
            {...props}
          />
        </div>
      )}
    />
  );
}
