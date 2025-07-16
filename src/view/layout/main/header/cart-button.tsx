import { Icons } from "@/lib/config/icons";
import { Badge } from "@/view/components/ui/badge";
import { Iconify } from "@/view/components/iconify";
import { Button } from "@/view/components/ui/button";
import { useActiveCartStore } from "@/lib/store/active-cart";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/view/components/ui/popover";

import MiniCart from "./mini-cart";

export default function CartButton() {
  const quantity = useActiveCartStore((state) => state.products.length || 0);

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="relative cursor-pointer"
          aria-label="open cart"
        >
          {quantity > 0 ? (
            <Badge
              variant="destructive"
              className="absolute end-0 top-0 grid aspect-square translate-x-1/4 -translate-y-1/4 place-content-center rounded-full p-1 text-xs rtl:-translate-x-1/4"
            >
              {quantity}
            </Badge>
          ) : null}
          <Iconify icon={Icons.CART} className="h-auto w-full" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="mx-2 p-0">
        <MiniCart />
      </PopoverContent>
    </Popover>
  );
}
