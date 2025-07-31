import Header from "./header";
import Footer from "./footer";
import { HEADER_HEIGHT } from "./config";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col">
      <Header />
      <div style={{ height: `${HEADER_HEIGHT}px` }} />

      <div className="grow">{children}</div>

      <Footer />
    </main>
  );
}
