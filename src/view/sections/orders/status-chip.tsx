import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils/style-functions";

export default function StatusChip({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const t = useTranslations("Pages.Orders");

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return t("status_confirmed");
      case "delivered":
        return t("status_delivered");
      case "cancelled":
        return t("status_cancelled");
      default:
        return status;
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
        {
          "bg-green-100 text-green-800": status === "confirmed",
          "bg-blue-100 text-blue-800": status === "delivered",
          "bg-red-100 text-red-800": status === "cancelled",
        },
        className,
      )}
    >
      {getStatusText(status)}
    </span>
  );
}
