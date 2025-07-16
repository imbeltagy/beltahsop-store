import { cn } from "@/lib/utils/style-functions";

import { Iconify } from "../iconify";

export default function Rating({
  stars,
  className,
}: {
  stars: number;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto flex w-fit gap-1", className)}>
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          className={cn("w-5 text-orange-500", {
            "text-gray-400": stars < item,
          })}
          key={item}
        >
          <Iconify icon="material-symbols:kid-star" width="100%" />
        </div>
      ))}
    </div>
  );
}
