"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import Link from "next/link";

import { yup } from "@/lib/utils/yup";
import { paths } from "@/lib/config/paths";
import { useAuthStore } from "@/lib/store/auth";
import { EMAIL_REGEX } from "@/lib/config/global";
import RHFTextInput from "@/view/components/rhf-hooks/rhf-textinput";

export default function RegisterView() {
  const t = useTranslations();
  const router = useRouter();
  const { register: registerUser } = useAuthStore();

  const [error, setError] = useState("");

  const methods = useForm({
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .required(t("Global.Validation.email_required"))
          .matches(EMAIL_REGEX, t("Global.Validation.email_invalid")),
        fullName: yup
          .string()
          .required(t("Global.Validation.fullName_required")),
        password: yup
          .string()
          .min(8, t("Global.Validation.password_length", { length: 8 }))
          .minLowercase(1, t("Global.Validation.password_lowercase"))
          .minUppercase(1, t("Global.Validation.password_uppercase"))
          .minNumbers(1, t("Global.Validation.password_number"))
          .minSymbols(1, t("Global.Validation.password_special"))
          .required(t("Global.Validation.password_required")),
        confirmPassword: yup
          .string()
          .required(t("Global.Validation.confirm_password_required"))
          .oneOf(
            [yup.ref("password")],
            t("Global.Validation.passwords_must_match"),
          ),
      }),
    ),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setError("");
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
        role: "admin",
      });
      router.push(paths.auth.login);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  });

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">{t("Pages.Auth.register_title")}</h1>
      <p className="mb-5 text-base text-gray-500">
        {t("Pages.Auth.register_subtitle")}
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
              name="fullName"
              fullWidth
              label={t("Global.Label.fullName")}
            />
            <RHFTextInput
              name="password"
              fullWidth
              type="password"
              label={t("Global.Label.password")}
            />
            <RHFTextInput
              name="confirmPassword"
              fullWidth
              type="password"
              label={t("Global.Label.confirm_password")}
            />

            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 w-full rounded-lg py-3 text-lg font-semibold text-white transition disabled:opacity-50"
              disabled={isSubmitting}
            >
              {t("Global.Action.register")}
            </button>

            <p className="text-center text-sm">
              {t("Pages.Auth.have_account")}{" "}
              <Link
                href={paths.auth.login}
                className="text-primary-600 hover:underline"
              >
                {t("Global.Action.login")}
              </Link>
            </p>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
