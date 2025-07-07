"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";

import { yup } from "@/lib/utils/yup";
import { useAuthStore } from "@/lib/store/auth";
import { endpoints } from "@/lib/config/endpoints";
import { Button } from "@/view/components/elements";
import Alert from "@/view/components/elements/alert";
import { axiosInstance, ResponseError } from "@/lib/utils/axios";
import RHFTextInput from "@/view/components/rhf-hooks/rhf-textinput";

interface Props {
  onSuccess: () => void;
}

export default function VerifyPassword({ onSuccess }: Props) {
  const t = useTranslations();
  const { user } = useAuthStore();
  const [error, setError] = useState("");

  const methods = useForm({
    resolver: yupResolver(
      yup.object().shape({
        password: yup
          .string()
          .required(t("Global.Validation.password_required")),
      }),
    ),
    defaultValues: {
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setError("");

      if (!user) {
        throw new Error(t("Global.Error.user_not_found"));
      }

      await axiosInstance.post(endpoints.auth.login, {
        email: user.email,
        password: data.password,
      });

      onSuccess();
    } catch (error) {
      if (error instanceof ResponseError && error.status === 401) {
        setError(t("Pages.Auth.incorrect_password"));
        return;
      }
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  });

  return (
    <div className="flex flex-col gap-12">
      <p className="text-secondary">
        {t("Pages.Auth.reset_password_subtitle")}
      </p>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-4">
            {error && <Alert variant="error">{error}</Alert>}

            <RHFTextInput
              name="password"
              fullWidth
              type="password"
              label={t("Global.Label.old_password")}
            />

            <Button type="submit" disabled={isSubmitting} fullWidth>
              {t("Pages.Auth.verify_password")}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
