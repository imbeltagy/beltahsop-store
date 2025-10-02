import { redirect } from "next/navigation";

import { fetchUserByToken } from "@/lib/actions/auth";
import { githubAuthFailure } from "@/lib/config/paths";

import ProviderLogin from "./component";

interface Props {
  searchParams: Promise<Record<"token", string | undefined>>;
}

export default async function Page({ searchParams }: Props) {
  const { token } = await searchParams;

  const session = await fetchUserByToken(token);

  if ("error" in session) {
    redirect(githubAuthFailure);
  }

  return <ProviderLogin session={session} />;
}
