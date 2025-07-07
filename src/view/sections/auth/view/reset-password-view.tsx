"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
// Removed MUI imports
// import { Stack, Typography } from '@mui/material';

import { OTPPurpose } from "@/lib/types/auth";

import AuthOtp from "../auth-otp";
import NewPassword from "../new-password";
import AuthHeading from "../../auth-headding";
import VerifyPassword from "../verify-password";

export default function ResetPasswordView() {
  const t = useTranslations();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    <VerifyPassword onSuccess={() => setCurrentStep(1)} />,
    <AuthOtp
      purpose={OTPPurpose.ResetPassword}
      onSuccess={() => setCurrentStep(2)}
      sendInitialOtp
    />,
    <NewPassword onSuccess={() => {}} />,
  ];

  return (
    <div className="flex flex-col gap-2">
      <AuthHeading title={t("Pages.Auth.reset_password_title")} />

      {steps[currentStep]}
    </div>
  );
}
