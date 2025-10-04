import MainLayout from "@/view/layout/main";
import CartContext from "@/lib/context/cart-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainLayout>{children}</MainLayout>
      <CartContext />
    </>
  );
}
