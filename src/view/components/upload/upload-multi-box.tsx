"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useDropzone } from "react-dropzone";

import { Icons } from "@/lib/config/icons";
import { fSize } from "@/lib/utils/format";
import { cn } from "@/lib/utils/style-functions";
import { MAX_FILE_SIZE } from "@/lib/config/upload";
import { FileType, FileVariant } from "@/lib/types/upload";

import { Iconify } from "../iconify";
import { UploadBoxWrapper } from "./styles";
import SimplePlaceholder from "../placeholder/simple";
import { getVariantFileTypes, getVariantUploadIcon } from "./utils";

export type UploadMultiBoxProps = {
  files: (File | string)[];
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  maxSize?: number; // in bytes
  onDrop: (acceptedFiles: File[]) => void;
  onRemove: (index: number) => void;
  onRemoveAll: () => void;
  onReorder?: (newFiles: (File | string)[]) => void;
  icon?: string;
  draggable?: boolean;
  className?: string;
} & (
  | {
      acceptedTypes?: FileType[]; // e.g., ['image/png', 'application/pdf']
    }
  | { variant?: FileVariant }
);

export default function UploadMultiBox({
  files,
  error,
  helperText,
  disabled,
  maxSize = MAX_FILE_SIZE,
  onDrop,
  onRemove,
  onRemoveAll,
  onReorder,
  icon,
  draggable = false,
  className,
  ...props
}: UploadMultiBoxProps) {
  const t = useTranslations();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const acceptedTypes =
    "acceptedTypes" in props
      ? props.acceptedTypes
      : "variant" in props && props.variant
        ? getVariantFileTypes(props.variant)
        : undefined;

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      multiple: true,
      disabled,
      maxSize,
      accept: acceptedTypes
        ? acceptedTypes
            .map((type) => type.mime)
            .reduce(
              (acc, type) => {
                acc[type] = [];
                return acc;
              },
              {} as Record<string, string[]>,
            )
        : undefined,
      onDrop,
    });

  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (!draggable) return;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!draggable) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    if (!draggable || draggedIndex === null) return;
    e.preventDefault();

    if (draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    const newFiles = [...files];
    const [draggedFile] = newFiles.splice(draggedIndex, 1);
    newFiles.splice(dropIndex, 0, draggedFile);

    onReorder?.(newFiles);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const errorMessage = useMemo(() => {
    if (fileRejections.length === 0) return null;

    const rejection = fileRejections[0];

    switch (rejection.errors[0]?.code) {
      case "file-too-large":
        return t("Global.Helper.upload_file_size_error", {
          current: fSize(rejection.file.size),
          max: fSize(maxSize || 0),
        });
      case "file-invalid-type":
        const acceptedExtensions = acceptedTypes
          ? acceptedTypes.map((type) => type.extension)
          : [];
        return t("Global.Helper.upload_file_type_error", {
          accepted:
            acceptedExtensions.length > 0
              ? acceptedExtensions.join(", ")
              : "any",
        });
      default:
        return null;
    }
  }, [acceptedTypes, fileRejections, maxSize, t]);

  const hasError = error || fileRejections.length > 0;

  const renderHelperText = useMemo(() => {
    if (errorMessage) return errorMessage;
    if (helperText) return helperText;
    if (acceptedTypes && acceptedTypes.length > 0) {
      const acceptedExtensions = acceptedTypes.map((type) => type.extension);
      return t("Global.Helper.upload_accepted_types", {
        types: acceptedExtensions.join(", "),
      });
    }
    return undefined;
  }, [errorMessage, helperText, acceptedTypes, t]);

  return (
    <div className={cn("relative w-full", className)}>
      <UploadBoxWrapper
        disabled={disabled}
        error={hasError}
        dragActive={isDragActive}
        {...getRootProps()}
        className="min-h-full"
      >
        <input {...getInputProps()} />

        <SimplePlaceholder
          icon={
            icon ??
            getVariantUploadIcon(
              "variant" in props && props.variant ? props.variant : "all",
            )
          }
          text={
            isDragActive
              ? t("Global.Helper.upload_drop_here_files")
              : t("Global.Helper.upload_drag_drop_files")
          }
        />
      </UploadBoxWrapper>

      {!!files.length && (
        <div className="mt-2 flex flex-row flex-wrap gap-2">
          {files.map((file, index) => (
            <Preview
              key={index}
              file={file}
              index={index}
              onRemove={() => onRemove(index)}
              draggable={draggable}
              isDragging={draggedIndex === index}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
            />
          ))}
        </div>
      )}

      {!!files.length && (
        <button
          type="button"
          onClick={onRemoveAll}
          className="mt-1 ml-auto flex items-center gap-2 rounded border border-red-500 px-3 py-1 text-red-600 transition hover:bg-red-50"
        >
          <Iconify icon={Icons.TRASH} />
          {t("Global.Action.clear_all")}
        </button>
      )}

      {renderHelperText && (
        <div
          className={`mt-1 text-xs ${hasError ? "text-red-600" : "text-gray-500"}`}
        >
          {renderHelperText}
        </div>
      )}
    </div>
  );
}

function Preview({
  file,
  index,
  onRemove,
  draggable,
  isDragging,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: {
  file: File | string;
  index: number;
  onRemove: () => void;
  draggable?: boolean;
  isDragging?: boolean;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
}) {
  const isString = typeof file === "string";
  const preview = isString ? file : URL.createObjectURL(file);

  return (
    <div
      draggable={draggable}
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
      onDragEnd={onDragEnd}
      className={`relative h-[100px] w-[100px] overflow-hidden rounded border ${
        isDragging ? "scale-95 opacity-50" : "scale-100 opacity-100"
      } transition-all duration-200 ${draggable ? "cursor-grab" : "cursor-default"} group`}
      style={{ borderColor: isDragging ? "#888" : "#e5e7eb" }}
    >
      <Image
        src={preview}
        alt="preview"
        className="pointer-events-none object-cover"
        fill
      />
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-xs text-white transition hover:bg-black/80"
      >
        <Iconify icon={Icons.XMARK} />
      </button>
      {draggable && (
        <div className="absolute top-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-xs text-white">
          ⋮⋮
        </div>
      )}
    </div>
  );
}
