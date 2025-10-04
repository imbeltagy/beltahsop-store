import { redirect } from "next/navigation";

import AuthLayout from "@/view/layout/auth";
import { GithubSession } from "@/lib/types/auth";
import { githubAuthFailure } from "@/lib/config/paths";
import GithubRegisterView from "@/view/sections/auth/view/github-register-view";

interface Props {
  searchParams: Promise<Record<"profile", string | undefined>>;
}

export default async function ProviderRegisterPage({ searchParams }: Props) {
  try {
    const { profile: profileString } = await searchParams;
    if (!profileString) redirect(githubAuthFailure);

    const profile = JSON.parse(profileString) as GithubSession;

    return (
      <AuthLayout>
        <GithubRegisterView session={profile} />
      </AuthLayout>
    );
  } catch (ignore) {
    redirect(githubAuthFailure);
  }
}
