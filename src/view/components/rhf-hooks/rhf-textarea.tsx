import { Textarea } from "flowbite-react";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  name: string;
  label?: string;
  helperText?: string;
  rows?: number;
  [key: string]: any;
}

export default function RHFTextarea({
  name,
  label,
  helperText,
  rows = 4,
  ...props
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-1">
          {label && <label className="mb-1 text-sm font-medium">{label}</label>}
          <Textarea
            {...field}
            {...props}
            color={error ? "failure" : undefined}
            rows={rows}
          />
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
