"use client";

import { useState } from "react";
import { useSnackbar } from "notistack";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";

import { yup } from "@/lib/utils/yup";
import { paths } from "@/lib/config/paths";
import { axiosInstance } from "@/lib/utils/axios";
import { endpoints } from "@/lib/config/endpoints";
import { Button } from "@/view/components/elements";
import Alert from "@/view/components/elements/alert";
import { deleteSessionCookies } from "@/lib/actions/auth";
import RHFTextInput from "@/view/components/rhf-hooks/rhf-textinput";

interface Props {
  onSuccess: () => void;
}

export default function NewPassword({ onSuccess }: Props) {
  const t = useTranslations();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState("");

  const methods = useForm({
    resolver: yupResolver(
      yup.object().shape({
        password: yup
          .string()
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
      await axiosInstance.post(endpoints.auth.resetPassword, {
        password: data.password,
      });
      enqueueSnackbar(t("Pages.Auth.password_reset_success"), {
        variant: "success",
      });
      await deleteSessionCookies();
      router.push(paths.auth.login);
      onSuccess();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  });

  return (
    <div className="flex flex-col gap-12">
      <p className="text-secondary">{t("Pages.Auth.new_password_subtitle")}</p>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-4">
            {error && <Alert variant="error">{error}</Alert>}

            <RHFTextInput
              name="password"
              fullWidth
              type="password"
              label={t("Global.Label.new_password")}
            />

            <RHFTextInput
              name="confirmPassword"
              fullWidth
              type="password"
              label={t("Global.Label.confirm_password")}
            />

            <Button type="submit" disabled={isSubmitting} fullWidth>
              {t("Pages.Auth.reset_password")}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
