import React from "react";
import { useTranslations } from "next-intl";

import { Iconify } from "@/view/components/iconify";
import Container from "@/view/components/elements/container";

export default function AuthenticatingLoading() {
  const t = useTranslations("Pages.Loading");

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <Container className="flex flex-col items-center justify-center space-y-6 py-12">
        {/* Spinner */}
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Iconify
              icon="mdi:shield-check"
              className="h-8 w-8 animate-pulse text-blue-600"
            />
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-2 text-center">
          <h1 className="animate-pulse text-2xl font-semibold text-gray-900">
            {t("authenticating")}
          </h1>
          <p className="max-w-md text-gray-600">
            {t("authenticating_subtitle")}
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex space-x-2">
          <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600"></div>
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-blue-600"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-blue-600"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </Container>
    </div>
  );
}
