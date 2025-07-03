import React from "react";
import BrokenImage from "./broken-image";
import ImageLink from "./image-link";
import { cn } from "@/lib/utils/style-functions/cn";

interface Props {
  src: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function CustomImage({
  src,
  width = 50,
  height = 50,
  borderRadius = 5,
  className = "",
  style,
  ...props
}: Props) {
  const containerStyle = {
    width,
    height,
    borderRadius,
    ...style,
  };
  return (
    <ImageLink
      href={src}
      className={cn("inline-block", className)}
      style={containerStyle}
      {...props}
    >
      <BrokenImage
        className="h-full w-full"
        style={{ borderRadius: "inherit" }}
      />
    </ImageLink>
  );
}
