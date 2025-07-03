"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
// Removed MUI imports
// import { Link, Stack, Typography } from '@mui/material';

import { paths } from "@/lib/config/paths";
import { OTPPurpose } from "@/lib/types/auth";

import AuthOtp from "../auth-otp";
import NewPassword from "../new-password";
import ForgotPasswordEmail from "../forgot-password-email";
import Link from "next/link";

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
      <h1 className="text-3xl font-bold">
        {t("Pages.Auth.forgot_password_title")}
      </h1>

      {steps[currentStep]}

      <div className="mt-2 flex flex-col gap-1">
        <p className="text-center text-sm">
          {t("Pages.Auth.login_instead")}{" "}
          <Link
            href={paths.auth.login}
            className="text-primary-600 hover:underline"
          >
            {t("Global.Action.login")}
          </Link>
        </p>
      </div>
    </div>
  );
}
