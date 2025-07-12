"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

import Logo from "@/view/components/logo";

export default function Loading() {
  const t = useTranslations("Pages.Loading");
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* Logo with Animation */}
        <div className="mb-8 animate-pulse">
          <Logo full scale={1.2} />
        </div>

        {/* Loading Text */}
        <div className="mb-4">
          <h2 className="mb-2 text-xl font-semibold text-gray-700">
            {t("title")}
            {dots}
          </h2>
          <p className="text-sm text-gray-500">{t("subtitle")}</p>
        </div>

        {/* Animated Loading Bar */}
        <div className="mx-auto h-2 w-64 overflow-hidden rounded-full bg-gray-200">
          <div className="animate-loading-bar h-full rounded-full bg-blue-600"></div>
        </div>

        {/* Spinning Dots */}
        <div className="mt-6 flex justify-center space-x-2">
          <div className="h-3 w-3 animate-bounce rounded-full bg-blue-600"></div>
          <div
            className="h-3 w-3 animate-bounce rounded-full bg-blue-600"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="h-3 w-3 animate-bounce rounded-full bg-blue-600"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
