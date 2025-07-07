"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { paths } from "@/lib/config/paths";
import { OTPPurpose } from "@/lib/types/auth";

import AuthOtp from "../auth-otp";
import NewPassword from "../new-password";
import AuthHeading from "../../auth-headding";
import ForgotPasswordEmail from "../forgot-password-email";

export default function ForgotPasswordView() {
  const t = useTranslations();
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState<string>("");

  const steps = [
    <ForgotPasswordEmail
      onSuccess={(email) => {
        setEmail(email);
        setCurrentStep(1);
      }}
    />,
    <AuthOtp
      purpose={OTPPurpose.ResetPassword}
      onSuccess={() => setCurrentStep(2)}
      email={email}
    />,
    <NewPassword onSuccess={() => {}} />,
  ];

  return (
    <div className="flex flex-col gap-2">
      <AuthHeading title={t("Pages.Auth.forgot_password_title")} />

      {steps[currentStep]}

      <div className="mt-2 flex flex-col gap-1">
        <p className="text-center text-sm">
          {t("Pages.Auth.login_instead")}{" "}
          <Link href={paths.auth.login}>{t("Global.Action.login")}</Link>
        </p>
      </div>
    </div>
  );
}
