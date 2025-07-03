"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
// Removed MUI imports
// import { Stack, Alert, Typography } from '@mui/material';

import { OTPPurpose } from "@/lib/types/auth";
import { pathAfterLogin } from "@/lib/config/paths";
// import RouterLink from '@/view/components/router-link';

import AuthOtp from "../auth-otp";

export default function EmailConfirmationView() {
  const t = useTranslations("Pages.Auth");
  const [isSuccess, setIsSuccess] = useState(false);

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">
          {t("email_confirmation_success_title")}
        </h1>
        <p className="mb-5 text-base text-gray-500">
          {t("email_confirmation_success_subtitle")}
        </p>

        <div className="rounded border border-green-200 bg-green-100 px-4 py-2 text-center text-green-700">
          {t.rich("email_confirmed", {
            link: (chunks) => (
              <a
                href={pathAfterLogin}
                className="text-primary-600 mx-auto block w-fit p-1 hover:underline"
              >
                {chunks}
              </a>
            ),
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">{t("email_confirmation_title")}</h1>
      <p className="mb-5 text-base text-gray-500">
        {t("email_confirmation_subtitle")}
      </p>

      <AuthOtp
        purpose={OTPPurpose.EmailConfirmation}
        onSuccess={() => setIsSuccess(true)}
      />
    </div>
  );
}
