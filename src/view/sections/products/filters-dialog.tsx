"use client";

import { Iconify } from "@/view/components/iconify";
import { Button } from "@/view/components/ui/button";
import { useBoolean } from "@/lib/hooks/use-boolean";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/view/components/ui/dialog";

import ProductsFilters from "./filters";

export default function ProductsFiltersDialog() {
  const isOpen = useBoolean();

  return (
    <Dialog open={isOpen.value} onOpenChange={isOpen.onToggle}>
      <DialogTrigger asChild>
        <Button
          className="fixed end-6 bottom-6 z-30 h-14 w-14 rounded-full bg-blue-600 p-0 shadow-lg hover:bg-blue-700"
          size="lg"
        >
          <Iconify icon="iconoir:filter" className="h-6 w-6 text-white" />
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0 sm:max-w-[640px]" showCloseButton={false}>
        <div className="max-h-[80svh] overflow-y-auto px-4 pb-4">
          <ProductsFilters
            noElevation
            action={
              <DialogClose asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Iconify icon="iconoir:xmark" className="h-5 w-5" />
                </Button>
              </DialogClose>
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
