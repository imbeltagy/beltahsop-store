import Link from "next/link";
import { useTranslations } from "next-intl";

import { paths } from "@/lib/config/paths";
import { cn } from "@/lib/utils/style-functions";

import { navLinks } from "../config-navigation";

export default function Nav({ isMenuOpen }: { isMenuOpen: boolean }) {
  const t = useTranslations("Navigation");

  return (
    <nav
      className={cn(
        "bg-background border-divider top-full left-0 z-20 grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 max-md:absolute max-md:grid max-md:w-full max-md:overflow-hidden max-md:border-y max-md:text-center",
        isMenuOpen && "max-md:grid-rows-[1fr]",
      )}
    >
      <ul className="items-center gap-2 max-md:min-h-0 md:flex lg:gap-6">
        {/* Links */}
        {navLinks.map((item) => (
          <li
            className="font-light capitalize transition-colors max-md:pb-2 max-md:first:pt-4"
            key={item.href}
          >
            <Link
              className={cn(
                "not-focus:not-hover:text-foreground! relative font-medium no-underline! outline-0",
                // underline styles
                "before:absolute before:top-full before:right-0 before:w-0 before:rounded-full before:bg-current before:transition-[width] before:duration-300 md:before:h-[.1rem]",
                // hover styles
                "hover:before:right-auto hover:before:left-0 hover:before:w-full",
              )}
              href={item.href}
            >
              {t(item.name)}
            </Link>
          </li>
        ))}

        <li className="py-4">
          <a
            href={paths.auth.login}
            className="text-primary ring-primary hover:bg-primary active:bg-primary-dark focus:bg-primary-light focus:ring-primary-light hover:ring-primary active:ring-primary-dark rounded px-8 py-1 text-sm font-semibold tracking-widest no-underline! ring-2 outline-0 hover:text-white! focus:text-white! md:hidden"
            role="button"
          >
            {t("login")}
          </a>
        </li>
      </ul>
    </nav>
  );
}
