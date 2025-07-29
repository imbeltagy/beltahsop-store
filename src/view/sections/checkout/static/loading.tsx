"use client";

import { Skeleton } from "@/view/components/ui/skeleton";

export default function CheckoutLoading() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-lg border p-4"
            >
              <Skeleton className="h-20 w-20" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-8 w-24" />
            </div>
          ))}
        </div>
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}
