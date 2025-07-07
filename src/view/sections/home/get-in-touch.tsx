import { useTranslations } from "next-intl";
import Link from "next/link";

export default function GetInTouch() {
  const t = useTranslations("Pages.Home.GetInTouch");

  return (
    <section
      className="bg-cover bg-center lg:bg-[center_30%]"
      style={{
        backgroundImage: `linear-gradient(#0007, #0008), url('assets/visitStore.webp')`,
      }}
    >
      <div className="main-container px-4 py-section-sm text-center md:py-section-md">
        <h2 className="mx-auto my-6 font-special text-3xl text-white md:text-5xl md:leading-[1.3] lg:my-10 lg:text-7xl lg:leading-[1.2]">
          {t("headline")}
        </h2>
        <Link href="/shop" className="btn-outlined font-brand lg:text-xl">
          {t("action")}
        </Link>
      </div>
    </section>
  );
}
