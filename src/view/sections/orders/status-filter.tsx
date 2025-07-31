"use client";

import { useTranslations } from "next-intl";

import { useQueryParams } from "@/lib/hooks/use-query-params";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/view/components/ui/select";

const STATUS_OPTIONS = [
  { value: null as unknown as string, label: "all" },
  { value: "confirmed", label: "status_confirmed" },
  { value: "delivered", label: "status_delivered" },
  { value: "cancelled", label: "status_cancelled" },
];

export default function StatusFilter() {
  const t = useTranslations("Pages.Orders");
  const { values: queries, set: setQuery } = useQueryParams(
    ["page", "status"],
    {
      replace: true,
    },
  );

  const handleStatusChange = (value: string) => {
    setQuery({
      status: value || null,
      page: null, // Reset page when status changes
    });
  };

  return (
    <Select value={queries.status || ""} onValueChange={handleStatusChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={t("status")} />
      </SelectTrigger>
      <SelectContent>
        {STATUS_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.value ? t(option.label) : t("all")}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
