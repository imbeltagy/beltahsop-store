"use client";

import Logo from "@/view/components/logo";
import { paths } from "@/lib/config/paths";
import { useBoolean } from "@/lib/hooks/use-boolean";

import Nav from "./nav";
import Actions from "./actions";
import { HEADER_HEIGHT } from "../config";

export default function Header() {
  const menuOpen = useBoolean(false);

  return (
    <header
      className="bg-background fixed inset-x-0 top-0 z-50 shadow-lg"
      style={{ height: `${HEADER_HEIGHT}px` }}
    >
      <div className="relative mx-auto flex h-full w-full items-center justify-between gap-4 p-4 lg:container">
        <Logo full className="max-h-full [&>*]:max-h-10" href={paths.home} />
        <Nav isMenuOpen={menuOpen.value} />
        <Actions
          isMenuOpen={menuOpen.value}
          setIsMenuOpen={menuOpen.setValue}
        />
      </div>
    </header>
  );
}
