import CompactLayout from "@/view/layout/compact";
import AuthenticatingLoading from "@/view/sections/auth/authenticating-loading";

export default function Loading() {
  return (
    <CompactLayout>
      <AuthenticatingLoading />
    </CompactLayout>
  );
}
