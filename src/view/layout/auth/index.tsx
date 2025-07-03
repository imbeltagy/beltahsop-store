import Image from "next/image";
import Logo from "@/view/components/logo";
import { paths } from "@/lib/config/paths";
import { LocalePopover } from "@/view/components/locale-popover";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const renderBgImg = (
    <>
      <div className="absolute bottom-[22%] left-[5%] z-[-1] hidden w-[250px] sm:block">
        <Image
          src="/assets/illustrations/plant-1.svg"
          alt="auth-bg"
          width={500}
          height={500}
          style={{
            display: "block",
            width: "100%",
            height: "auto",
          }}
        />
      </div>
      <div className="absolute right-auto bottom-[22%] left-[5%] z-[-1] w-[250px] sm:right-[5%] sm:bottom-[25%] sm:left-auto">
        <Image
          src="/assets/illustrations/plant-desk.svg"
          alt="auth-bg"
          width={500}
          height={500}
          style={{ display: "block", width: "100%", height: "auto" }}
        />
      </div>
    </>
  );

  return (
    <div
      className="relative isolate grid min-h-full items-center py-4 md:py-12"
      style={{
        position: "relative",
        isolation: "isolate",
      }}
    >
      {/* Background shape */}
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundColor: "#ECEEFF",
          clipPath: "polygon(0 75%, 100% 70%, 100% 100%, 0 100%)",
        }}
      />
      {renderBgImg}
      <div className="container mx-auto">
        <div className="mx-auto w-fit rounded-lg bg-white shadow">
          <div className="p-6">
            <div className="mb-1 flex flex-row items-center justify-between gap-1">
              <Logo
                full
                className="-mb-3 w-fit max-w-[min(100%,200px)]"
                href={paths.home}
              />
              <LocalePopover />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
