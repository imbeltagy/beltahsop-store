import Image from "next/image";
import { useTranslations } from "next-intl";

import { Button, Container } from "@/view/components/elements";

export default function Hero() {
  return (
    <section className="bg-[#dacece]">
      <Container className="relative grid-cols-12 items-end gap-4 overflow-hidden md:grid">
        <Text />

        {/* Image */}
        <div className="md:pt-sectionV-md bottom-0 left-0 col-span-5 w-full max-md:absolute max-md:h-full">
          <Image
            className="mx-auto"
            src="/assets/images/home/hero.webp"
            alt="shoe cover picture"
            width={500}
            height={500}
          />

          {/* overlay */}
          <div className="absolute top-0 h-full w-full bg-[#dacece] opacity-80 md:hidden"></div>
        </div>
      </Container>
    </section>
  );
}

function Text() {
  const t = useTranslations("Pages.Home.Hero");

  return (
    <div className="py-sectionV-md relative z-10 col-span-7 grid gap-4 max-md:justify-center">
      <h1 className="text-dark font-special-en ar:font-special-ar text-3xl max-md:text-center max-md:text-balance md:text-4xl lg:text-5xl">
        {t("headline")}
      </h1>
      <p className="max-md:text-center max-md:text-balance md:text-lg lg:text-xl">
        {t("subline")}
      </p>

      {/* Call For Action */}
      <div className="flex flex-wrap items-center gap-2 max-md:justify-center">
        <Button href="#" size="large">
          {t("cta")}
        </Button>
        <p className="text-primary text-sm">
          {t("SubText.line1")}
          <br /> {t("SubText.line2")}
        </p>
      </div>
    </div>
  );
}
