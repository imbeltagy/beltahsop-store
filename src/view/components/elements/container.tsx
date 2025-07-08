import { cn } from "@/lib/utils/style-functions/cn";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "px-sectionH-sm container mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
