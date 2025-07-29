"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { Icons } from "@/lib/config/icons";
import { paths } from "@/lib/config/paths";
import { Iconify } from "@/view/components/iconify";
import { Button } from "@/view/components/ui/button";

interface RequireAuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RequireAuthDialog({
  isOpen,
  onClose,
}: RequireAuthDialogProps) {
  const tAuth = useTranslations("Pages.Auth");
  const tActions = useTranslations("Global.Action");
  const router = useRouter();

  const handleGoToLogin = () => {
    onClose();
    router.push(paths.auth.login);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background mx-4 w-full max-w-md rounded-lg p-6">
        <div className="mb-4 flex items-center gap-3">
          <Iconify icon={Icons.LOCK} className="text-primary h-6 w-6" />
          <h3 className="text-lg font-semibold">
            {tAuth("auth_required_title")}
          </h3>
        </div>

        <p className="text-muted-foreground mb-6">
          {tAuth("auth_required_message")}
        </p>

        <div className="flex gap-3">
          <Button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            {tActions("close")}
          </Button>
          <Button onClick={handleGoToLogin} className="flex-1">
            {tAuth("go_to_login")}
          </Button>
        </div>
      </div>
    </div>
  );
}
