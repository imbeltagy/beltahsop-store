"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";

import { yup } from "@/lib/utils/yup";
import { paths } from "@/lib/config/paths";
import { useAuthStore } from "@/lib/store/auth";
import { EMAIL_REGEX } from "@/lib/config/global";
import { Button } from "@/view/components/elements";
import Alert from "@/view/components/elements/alert";
import { useQueryParams } from "@/lib/hooks/use-query-params";
import RHFTextInput from "@/view/components/rhf-hooks/rhf-textinput";

import GithubButton from "../github-button";
import AuthHeading from "../../auth-headding";

export default function LoginView() {
  const t = useTranslations();
  const { login } = useAuthStore();
  const {
    values: { github_error: githubError },
  } = useQueryParams(["github_error"]);

  const [error, setError] = useState(
    githubError === "true" ? t("Pages.Auth.github_error") : "",
  );

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
      email: "client@gmail.com",
      password: "Client#1",
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
      <AuthHeading
        title={t("Pages.Auth.welcome_title")}
        subtitle={t("Pages.Auth.welcome_subtitle")}
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
              name="password"
              fullWidth
              type="password"
              label={t("Global.Label.password")}
            />

            <Button
              type="submit"
              className="mt-1"
              loading={isSubmitting}
              fullWidth
            >
              {t("Global.Action.login")}
            </Button>

            <div className="my-2 flex items-center">
              <div className="h-px flex-grow bg-gray-200" />
            </div>

            <GithubButton />

            <div className="mt-2 flex flex-col gap-1">
              <p className="text-center text-sm">
                {t("Pages.Auth.no_account")}{" "}
                <Link href={paths.auth.register}>
                  {t("Global.Action.register")}
                </Link>
              </p>
              <p className="text-center text-sm">
                <Link href={paths.auth.forgotPassword}>
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
