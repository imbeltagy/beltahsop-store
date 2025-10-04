import AuthContext from "@/lib/context/auth-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <AuthContext />
    </>
  );
}
