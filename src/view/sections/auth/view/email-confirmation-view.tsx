"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { OTPPurpose } from "@/lib/types/auth";
import { pathAfterLogin } from "@/lib/config/paths";

import AuthOtp from "../auth-otp";
import AuthHeading from "../../auth-headding";

export default function EmailConfirmationView() {
  const t = useTranslations("Pages.Auth");
  const [isSuccess, setIsSuccess] = useState(false);

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-2">
        <AuthHeading
          title={t("email_confirmation_success_title")}
          subtitle={t("email_confirmation_success_subtitle")}
        />

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
      <AuthHeading
        title={t("email_confirmation_title")}
        subtitle={t("email_confirmation_subtitle")}
      />

      <AuthOtp
        purpose={OTPPurpose.EmailConfirmation}
        onSuccess={() => setIsSuccess(true)}
      />
    </div>
  );
}
