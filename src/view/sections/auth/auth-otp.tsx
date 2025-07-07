"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";

import { yup } from "@/lib/utils/yup";
import { OTPPurpose } from "@/lib/types/auth";
import { axiosInstance } from "@/lib/utils/axios";
import { endpoints } from "@/lib/config/endpoints";
import { Button } from "@/view/components/elements";
import Alert from "@/view/components/elements/alert";
import { updateAccessToken } from "@/lib/actions/auth";
import RHFOTP from "@/view/components/rhf-hooks/rhf-otp";

interface Props {
  purpose: OTPPurpose;
  onSuccess: () => void;
  sendInitialOtp?: boolean;
  email?: string;
}

interface FormValues {
  otp: string[];
}

const schema = yup.object().shape({
  otp: yup.array().of(yup.string().required()).length(4).required(),
});

export default function AuthOtp({
  purpose,
  onSuccess,
  sendInitialOtp = false,
  email,
}: Props) {
  const t = useTranslations();
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(true);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (sendInitialOtp) {
        handleResendOTP();
      }
    }, 1500);
    return () => clearTimeout(timeOut);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      otp: ["", "", "", ""],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setError("");

      // Use guest OTP verification endpoint if email is provided
      const endpoint = email
        ? endpoints.auth.verifyGuestOtp
        : endpoints.auth.verifyOtp;
      const payload = email
        ? { purpose, otp: data.otp.join(""), email }
        : { purpose, otp: data.otp.join("") };

      const res = await axiosInstance.post(endpoint, payload);

      if ("resetPasswordToken" in res.data) {
        await updateAccessToken(res.data.resetPasswordToken);
      }

      onSuccess();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  });

  const handleResendOTP = async () => {
    try {
      setError("");

      // Use guest OTP resend endpoint if email is provided
      const endpoint = email
        ? endpoints.auth.sendGuestOtp
        : endpoints.auth.sendOtp;
      const payload = email ? { email } : { purpose };

      await axiosInstance.post(endpoint, payload);

      setCountdown(60);
      setCanResend(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <p className="text-secondary">{t("Pages.Auth.otp_sent")}</p>

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-6">
            {error && <Alert variant="error">{error}</Alert>}

            <p className="text-secondary text-base">
              {t("Pages.Auth.otp_sent")}
            </p>

            <RHFOTP name="otp" label={t("Global.Label.otp")} />

            <button
              type="button"
              onClick={handleResendOTP}
              disabled={!canResend}
              style={{ all: "unset" }}
              className="!text-primary !ms-auto !block not-disabled:!cursor-pointer not-disabled:hover:!underline disabled:!text-gray-500"
            >
              {canResend
                ? t("Global.Action.resend_otp")
                : t("Global.Action.resend_otp_countdown", {
                    seconds: countdown,
                  })}
            </button>

            <Button type="submit" disabled={isSubmitting} fullWidth>
              {t("Global.Action.verify")}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
