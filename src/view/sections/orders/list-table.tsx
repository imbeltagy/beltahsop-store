"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import { useFormat } from "@/lib/hooks/format";
import { Order } from "@/lib/types/api/orders";
import { Iconify } from "@/view/components/iconify";
import { Button } from "@/view/components/ui/button";
import { Pagination } from "@/view/components/ui/pagination";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/view/components/ui/table";

import StatusChip from "./status-chip";
import ReOrderButton from "./re-order-button";

interface Props {
  orders: Order[];
  total: number;
}

export default function OrdersListTable({ orders, total }: Props) {
  const { formatDate, formatCurrency } = useFormat();
  const t = useTranslations("Pages.Orders");

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-lg border p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-start">{t("order_id")}</TableHead>
              <TableHead className="text-start">{t("date")}</TableHead>
              <TableHead className="text-start">{t("status")}</TableHead>
              <TableHead className="text-start">{t("total")}</TableHead>
              <TableHead className="text-start">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order: Order) => (
              <TableRow key={order._id}>
                <TableCell
                  className="font-mono text-sm [*[dir='rtl']_&]:text-right"
                  dir="ltr"
                >
                  #{order._id.slice(-8)}
                </TableCell>
                <TableCell className="text-sm">
                  {formatDate(new Date(order.createdAt))}
                </TableCell>
                <TableCell>
                  <StatusChip status={order.status} />
                </TableCell>
                <TableCell className="font-medium">
                  {formatCurrency(order.finalPrice)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link href={`/orders/${order._id}`}>
                      <Button variant="outline" size="sm">
                        <Iconify icon="mdi:eye" className="h-4 w-4" />
                        {t("view")}
                      </Button>
                    </Link>
                    <ReOrderButton orderId={order._id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination totalItems={total} showHelperText />
    </div>
  );
}
