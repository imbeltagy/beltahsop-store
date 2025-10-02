"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { paths } from "@/lib/config/paths";
import { Button } from "@/view/components/elements";
import { baseUrl } from "@/lib/utils/crud-fetch-api/helpers";

const storeUrl = process.env.NEXT_PUBLIC_STORE_ROOT;

const params = new URLSearchParams({
  newAccountUrl: `${storeUrl}${paths.auth.providerRegister}`,
  loginUrl: `${storeUrl}${paths.auth.providerLogin}`,
  failureUrl: `${storeUrl}${paths.auth.login}?github_error=true`,
});
const authUrl = `${baseUrl}/auth/github?${params.toString()}`;

export default function GithubButton() {
  const t = useTranslations("Pages.Auth");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <Button
      type="button"
      className="w-full gap-3 border border-gray-900 bg-gray-900 hover:border-gray-700 hover:bg-gray-700 active:border-gray-800 active:bg-gray-800"
      loading={loading}
      onClick={() => {
        setLoading(true);
        router.push(authUrl);
      }}
    >
      {githubIcon}

      <span className="max-xs:hidden font-medium">
        {t("sign_in_with_github")}
      </span>
      <span className="xs:hidden font-medium">GitHub</span>
    </Button>
  );
}

const githubIcon = (
  <svg
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
    />
  </svg>
);
