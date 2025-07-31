"use client";

import { useTranslations } from "next-intl";

import { Iconify } from "@/view/components/iconify";
import { DEFAULT_LIMIT } from "@/lib/config/global";
import { Button } from "@/view/components/ui/button";
import { useQueryParams } from "@/lib/hooks/use-query-params";

interface PaginationProps {
  totalItems: number;
  className?: string;
  showHelperText?: boolean;
}

export function Pagination({
  totalItems,
  className = "",
  showHelperText = false,
}: PaginationProps) {
  const t = useTranslations("Global.Helper");
  const { values: queries, set: setQuery } = useQueryParams(["page", "limit"], {
    replace: true,
  });

  const currentPage = Number(queries.page || "1");
  const limit = Number(queries.limit || DEFAULT_LIMIT);
  const totalPages = Math.ceil(totalItems / limit);

  const handlePageChange = (page: number) => {
    setQuery({ page: page.toString() });
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const getHelperText = () => {
    if (!showHelperText || totalItems === 0) return null;

    const start = (currentPage - 1) * limit + 1;
    const end = Math.min(currentPage * limit, totalItems);

    return t("showing_range", { start, end, total: totalItems });
  };

  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {showHelperText && (
        <div className="text-muted-foreground text-sm">{getHelperText()}</div>
      )}

      <div className="flex items-center justify-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <Iconify icon="mdi:chevron-left" className="h-4 w-4 rtl:rotate-180" />
        </Button>

        {getVisiblePages().map((page, index) => (
          <Button
            key={index}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => typeof page === "number" && handlePageChange(page)}
            disabled={page === "..."}
            className={page === "..." ? "cursor-default" : ""}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <Iconify
            icon="mdi:chevron-right"
            className="h-4 w-4 rtl:rotate-180"
          />
        </Button>
      </div>
    </div>
  );
}
