import { redirect } from "next/navigation";

import { pathAfterLogin } from "@/lib/config/paths";
import { restoreSessionCookies } from "@/lib/actions/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, refreshToken } = await restoreSessionCookies();

  if (user && refreshToken) {
    redirect(pathAfterLogin);
  }

  return children;
}
