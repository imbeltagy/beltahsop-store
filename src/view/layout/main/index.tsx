import Header from "./header";
import { HEADER_HEIGHT } from "./config";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Header />
      <div style={{ height: `${HEADER_HEIGHT}px` }} />

      {children}
    </main>
  );
}
