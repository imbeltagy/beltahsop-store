import MainLayout from "@/view/layout/main";

export default function Layout({
  children,
  cart,
}: {
  children: React.ReactNode;
  cart: React.ReactNode;
}) {
  return (
    <MainLayout>
      {cart}
      {children}
    </MainLayout>
  );
}
