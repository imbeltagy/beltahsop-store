"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Error({ error }: { error: Error }) {
  const t = useTranslations("Pages.Error");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        {/* Error Illustration */}
        <div className="mb-8">
          <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-16 w-16 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="mb-4 text-3xl font-bold text-gray-900">{t("title")}</h1>

        <p className="mb-6 text-gray-600">{error.message || t("message")}</p>

        {/* Error Details (for development) */}
        {process.env.NODE_ENV === "development" && (
          <details className="mb-6">
            <summary className="cursor-pointer text-start text-sm text-gray-500 hover:text-gray-700">
              {t("error_details")}
            </summary>
            <pre className="mt-2 overflow-auto rounded bg-gray-100 p-3 text-left text-xs text-gray-700">
              {error.stack}
            </pre>
          </details>
        )}

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
            onClick={() => window.location.reload()}
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {t("try_again")}
          </button>
        </div>
      </div>
    </div>
  );
}
