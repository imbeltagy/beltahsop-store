"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";

import { yup } from "@/lib/utils/yup";
import { Button } from "@/view/components/elements";
import { postData } from "@/lib/utils/crud-fetch-api";
import { saveSessionCookies } from "@/lib/actions/auth";
import { GithubSession, LoginResponse } from "@/lib/types/auth";
import RHFTextInput from "@/view/components/rhf-hooks/rhf-textinput";
import { paths, pathAfterLogin, githubAuthFailure } from "@/lib/config/paths";

import AuthHeading from "../../auth-headding";

interface Props {
  session: GithubSession;
}

export default function GithubRegisterView({ session }: Props) {
  const t = useTranslations();
  const router = useRouter();

  const methods = useForm({
    resolver: yupResolver(
      yup.object().shape({
        fullName: yup
          .string()
          .required(t("Global.Validation.fullName_required")),
      }),
    ),
    defaultValues: {
      fullName: session.fullName,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await postData<
        LoginResponse,
        { fullName: string; providerId: string }
      >("/auth/register-github", {
        fullName: data.fullName,
        providerId: session.providerId,
      });

      if ("error" in res) throw new Error(res.error);

      await saveSessionCookies(res.data);

      router.push(pathAfterLogin);
    } catch (ignore) {
      router.push(githubAuthFailure);
    }
  });

  return (
    <div className="flex flex-col gap-2">
      <AuthHeading
        title={t("Pages.Auth.github_register_title")}
        subtitle={t("Pages.Auth.github_register_subtitle")}
      />

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <RHFTextInput
              name="fullName"
              fullWidth
              label={t("Global.Label.fullName")}
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
