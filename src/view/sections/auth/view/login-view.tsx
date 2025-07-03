"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";

import { yup } from "@/lib/utils/yup";
import { paths } from "@/lib/config/paths";
import { useAuthStore } from "@/lib/store/auth";
import { EMAIL_REGEX } from "@/lib/config/global";
import Link from "next/link";
import RHFTextInput from "@/view/components/rhf-hooks/rhf-textinput";

export default function LoginView() {
  const t = useTranslations();
  const { login } = useAuthStore();

  const [error, setError] = useState("");

  const methods = useForm({
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .required(t("Global.Validation.email_required"))
          .matches(EMAIL_REGEX, t("Global.Validation.email_invalid")),
        password: yup
          .string()
          .required(t("Global.Validation.password_required")),
      }),
    ),
    defaultValues: {
      email: "employee@beltashop.com",
      password: "Employee#1",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setError("");
      await login(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  });

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">{t("Pages.Auth.welcome_title")}</h1>
      <p className="mb-5 text-base text-gray-500">
        {t("Pages.Auth.welcome_subtitle")}
      </p>

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            {error && (
              <div className="rounded border border-red-200 bg-red-100 px-4 py-2 text-red-700">
                {error}
              </div>
            )}

            <RHFTextInput
              name="email"
              fullWidth
              label={t("Global.Label.email")}
            />
            <RHFTextInput
              name="password"
              fullWidth
              type="password"
              label={t("Global.Label.password")}
            />

            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 mt-2 w-full rounded-lg py-3 text-lg font-semibold text-white transition disabled:opacity-50"
              disabled={isSubmitting}
            >
              {t("Global.Action.login")}
            </button>

            <div className="mt-2 flex flex-col gap-1">
              <p className="text-center text-sm">
                {t("Pages.Auth.no_account")}{" "}
                <Link
                  href={paths.auth.register}
                  className="text-primary-600 hover:underline"
                >
                  {t("Global.Action.register")}
                </Link>
              </p>
              <p className="text-center text-sm">
                <Link
                  href={paths.auth.forgotPassword}
                  className="text-primary-600 hover:underline"
                >
                  {t("Pages.Auth.forgot_password")}
                </Link>
              </p>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
