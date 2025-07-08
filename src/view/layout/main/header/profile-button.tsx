"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Popover } from "react-tiny-popover";

import { paths } from "@/lib/config/paths";
import { useAuthStore } from "@/lib/store/auth";
import { List } from "@/view/components/elements";
import { Iconify } from "@/view/components/iconify";

export default function ProfileButton() {
  const t = useTranslations();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  if (!isAuthenticated)
    return (
      <a
        href={paths.auth.login}
        className="text-primary ring-primary hover:bg-primary active:bg-primary-dark focus:bg-primary-light focus:ring-primary-light hover:ring-primary active:ring-primary-dark rounded px-2 py-1 text-sm font-semibold tracking-widest no-underline! ring-2 outline-0 hover:text-white! focus:text-white! max-md:hidden"
        role="button"
      >
        {t("Navigation.login")}
      </a>
    );

  const innerButton =
    user && "avatar" in user && typeof user.avatar === "string" ? (
      <Image
        className="rounded-full ring-2 ring-slate-400"
        src={user.avatar}
        alt="avatar"
        width={50}
        height={50}
      />
    ) : (
      <Iconify icon="iconamoon:profile-fill" />
    );

  const list = [
    {
      text: t("Navigation.profile"),
      link: paths.profile,
    },
    {
      text: t("Navigation.logout"),
      className: "text-rose-500 font-semibold tracking-wider hover:bg-rose-100",
      onClick: () => {
        logout();
      },
    },
  ];

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={["bottom", "left", "right"]} // preferred positions by priority
      onClickOutside={() => setIsPopoverOpen(false)}
      padding={15}
      containerClassName="z-50"
      content={
        <div className="px-2">
          <List items={list} />
        </div>
      }
    >
      <button
        onClick={() => setIsPopoverOpen((prev) => !prev)}
        className="icon-btn p-1.5"
      >
        {innerButton}
      </button>
    </Popover>
  );
}
