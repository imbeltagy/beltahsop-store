"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("Pages.NotFound");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-blue-100">
            <svg
              className="h-16 w-16 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </div>

        {/* 404 Number */}
        <div className="mb-6">
          <h1 className="mb-4 text-8xl font-bold text-gray-300">404</h1>
        </div>

        {/* Error Message */}
        <h2 className="mb-4 text-3xl font-bold text-gray-900">{t("title")}</h2>

        <p className="mb-8 text-gray-600">{t("message")}</p>

        {/* Action Buttons */}
        <div className="space-y-3 space-x-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white no-underline transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            {t("go_home")}
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            {t("go_back")}
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="mb-3 text-sm text-gray-500">{t("help_text")}</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/store"
              className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
            >
              {t("browse_store")}
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              href="/contact"
              className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
            >
              {t("contact_support")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
