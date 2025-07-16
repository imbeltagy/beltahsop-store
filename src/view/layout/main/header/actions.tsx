"use client";

import { Icons } from "@/lib/config/icons";
import { Iconify } from "@/view/components/iconify";
import { LocalePopover } from "@/view/components/locale-popover";

import CartButton from "./cart-button";
import ProfileButton from "./profile-button";

export default function Actions({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (state: any) => void;
}) {
  return (
    <div className="flex items-center gap-1 text-lg">
      <button
        className="icon-btn p-1.5 md:hidden"
        onClick={() => setIsMenuOpen((prev: boolean) => !prev)}
      >
        <Iconify
          icon={isMenuOpen ? Icons.XMARK : Icons.MENU}
          className="h-auto w-full"
        />
      </button>

      <LocalePopover />

      <CartButton />

      <ProfileButton />
    </div>
  );
}
