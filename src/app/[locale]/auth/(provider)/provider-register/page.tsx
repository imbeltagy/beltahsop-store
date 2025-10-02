import { redirect } from "next/navigation";

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

    return <GithubRegisterView session={profile} />;
  } catch (ignore) {
    redirect(githubAuthFailure);
  }
}
