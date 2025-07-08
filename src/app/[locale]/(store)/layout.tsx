import MainLayout from "@/view/layout/main";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
