"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { LoginResponse } from "@/lib/types/auth";
import { pathAfterLogin } from "@/lib/config/paths";
import { saveSessionCookies, restoreSessionCookies } from "@/lib/actions/auth";
import AuthenticatingLoading from "@/view/sections/auth/authenticating-loading";

export default function ProviderLogin({ session }: { session: LoginResponse }) {
  const router = useRouter();

  useEffect(() => {
    async function saveNewSession() {
      const oldSession = await restoreSessionCookies();

      if (!oldSession.refreshToken || !oldSession.user)
        await saveSessionCookies(session);

      router.replace(pathAfterLogin);
    }

    saveNewSession();
  }, [router, session]);

  return <AuthenticatingLoading />;
}
