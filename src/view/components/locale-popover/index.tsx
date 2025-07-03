"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Iconify } from "../iconify";
import { Popover } from "react-tiny-popover";
import { List } from "../list";
import { useLocale } from "next-intl";
import { LocaleType } from "@/lib/types/locale";
import { localesSettings } from "@/lib/config/locale";

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
            text: item.name,
            onClick: () =>
              changeLang(Object.keys(localesSettings)[i] as LocaleType),
          }))}
        />
      }
    >
      <button
        className="icon-btn"
        onClick={() => setIsPopoverOpen((prev) => !prev)}
      >
        <Iconify icon={localesSettings[locale as LocaleType].icon} />
      </button>
    </Popover>
  );
}
