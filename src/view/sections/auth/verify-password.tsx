"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";

import { yup } from "@/lib/utils/yup";
import { useAuthStore } from "@/lib/store/auth";
import { endpoints } from "@/lib/config/endpoints";
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
      <p className="text-gray-500">{t("Pages.Auth.reset_password_subtitle")}</p>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-4">
            {error && (
              <div className="rounded border border-red-200 bg-red-100 px-4 py-2 text-red-700">
                {error}
              </div>
            )}

            <RHFTextInput
              name="password"
              fullWidth
              type="password"
              label={t("Global.Label.old_password")}
            />

            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 w-full rounded-lg py-3 text-lg font-semibold text-white transition disabled:opacity-50"
              disabled={isSubmitting}
            >
              {t("Pages.Auth.verify_password")}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
