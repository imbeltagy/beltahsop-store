"use client";

import { useLocale } from "next-intl";
import { Popover } from "react-tiny-popover";
import { useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

import { LocaleType } from "@/lib/types/locale";
import { localesSettings } from "@/lib/config/locale";

import { List } from "../elements";
import { Iconify } from "../iconify";

export function LocalePopover() {
  const locale = useLocale();

  const pathname = usePathname();
  const router = useRouter();

  const changeLang = useCallback(
    (code: LocaleType) => {
      if (code !== locale) {
        router.push(pathname.replace(`/${locale}`, `/${code}`));
      }
    },
    [locale, pathname, router],
  );

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={["bottom", "left", "right"]} // preferred positions by priority
      onClickOutside={() => setIsPopoverOpen(false)}
      padding={15}
      containerClassName="z-50"
      content={
        <List
          items={Object.values(localesSettings).map((item: any, i) => ({
            icon: <Iconify icon={item.icon} />,
            text: item.label,
            onClick: () =>
              changeLang(Object.keys(localesSettings)[i] as LocaleType),
          }))}
        />
      }
    >
      <button
        className="icon-btn h-9 w-9 p-2"
        onClick={() => setIsPopoverOpen((prev) => !prev)}
      >
        <Iconify
          icon={localesSettings[locale as LocaleType].icon}
          className="h-full w-full"
        />
      </button>
    </Popover>
  );
}
