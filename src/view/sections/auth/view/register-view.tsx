"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";

import { yup } from "@/lib/utils/yup";
import { paths } from "@/lib/config/paths";
import { useAuthStore } from "@/lib/store/auth";
import { EMAIL_REGEX } from "@/lib/config/global";
import { Button } from "@/view/components/elements";
import Alert from "@/view/components/elements/alert";
import RHFTextInput from "@/view/components/rhf-hooks/rhf-textinput";

import AuthHeading from "../../auth-headding";

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
      <AuthHeading
        title={t("Pages.Auth.register_title")}
        subtitle={t("Pages.Auth.register_subtitle")}
      />

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            {error && <Alert variant="error">{error}</Alert>}

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

            <Button
              type="submit"
              className="mt-1"
              disabled={isSubmitting}
              fullWidth
            >
              {t("Global.Action.register")}
            </Button>

            <p className="text-center text-sm">
              {t("Pages.Auth.have_account")}{" "}
              <Link href={paths.auth.login}>{t("Global.Action.login")}</Link>
            </p>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
